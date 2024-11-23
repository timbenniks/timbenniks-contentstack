import { Region, type StackConfig } from '@contentstack/delivery-sdk'
import type { EntryNode, Metadata, Next, Node, RenderOption } from '@contentstack/utils'
import type { EmbeddedItem } from '@contentstack/utils/dist/types/Models/embedded-object'

export type DeliverySdkOptions = StackConfig

export type LivePreviewSdkOptions = {
  ssr?: boolean
  editableTags?: boolean
  runScriptsOnUpdate?: boolean
  cleanCslpOnProduction?: boolean
  enable?: boolean
  mode?: "builder" | "preview"
  debug?: boolean
  clientUrlParams?: {
    host?: string
  }
  editButton?: {
    enable: boolean
    exclude?: ('insideLivePreviewPortal' | 'outsideLivePreviewPortal')[]
    includeByQueryParameter?: boolean
    position?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center'
  }
}

export type PersonalizeSdkOptions = {
  enable: boolean
  projectUid?: string
  host?: string
}

export type Urls = {
  app?: string
  preview?: string
  personalize?: string
}

export type IStackSdk = {
  live_preview: {
    [key: string]: any;
  };
  [key: string]: any;
  environment: string;
}

export function getURLsforRegion(region: Region = Region.US) {
  let urls: Urls = {}

  switch (region) {
    case Region.US:
      urls = {
        app: 'app.contentstack.com',
        preview: 'rest-preview.contentstack.com',
        personalize: 'personalize-edge.contentstack.com',
      }

      break

    case Region.EU:
      urls = {
        app: 'eu-app.contentstack.com',
        preview: 'eu-rest-preview.contentstack.com',
        personalize: 'eu-personalize-edge.contentstack.com',
      }

      break
  }

  return urls
}

export function replaceCslp(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => replaceCslp(item));
  }

  const newObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (key === "$") {
        newObj["cslp"] = replaceCslp(obj[key] as any);
      } else {
        newObj[key] = replaceCslp(obj[key] as any);
      }
    }
  }
  return newObj;
}

function createInlineCloudinaryArticleImage(node: Node): string {
  return `<img 
            src="${node.attrs.secure_url.replace(`v${node.attrs.version}`, `w_900,c_fill,q_auto,f_auto`)}"
            alt="${node.attrs.alt}"
            loading="lazy"
            width="800"
            height="450"
            sizes="100vw"
            class="aspect-video"
            fetchpriority="auto"
          />`
}

function createInlineArticleImage(asset: EmbeddedItem | EntryNode, metadata: Metadata): string {
  const linkBase = asset.url || metadata.attributes.src || metadata.attributes['asset-link'];
  const link = `${linkBase}?width=800&height=450&format=pjpg&auto=avif&quality=90&disable=upscale&fit=bounds`

  return `<img 
            src="${link}"
            alt="${metadata.attributes['asset-alt']}"
            loading="lazy"
            width="800"
            height="450"
            sizes="100vw"
            class="fancy-image-alt aspect-video"
            fetchpriority="auto" />`
}

function replaceBackticksWithCodeTags(htmlString: string) {
  return htmlString.replace(/`([^`]+)`/g, '<code>$1</code>');
}

// @ts-ignore
function replaceBackticksInObject(obj: any) {
  if (Array.isArray(obj)) {
    // @ts-ignore
    return obj.map(item => replaceBackticksInObject(item));
  } else if (typeof obj === 'object' && obj !== null) {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      // @ts-ignore
      newObj[key] = replaceBackticksInObject(value);
    }
    return newObj;
  } else if (typeof obj === 'string') {
    return replaceBackticksWithCodeTags(obj);
  } else {
    return obj;
  }
}

function convertToSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export const renderOption: RenderOption = {
  p: (node: Node, next: Next) => {
    // @ts-ignore
    if (node?.children[0]?.text === '') {
      return '';
    }

    const treadedChildren = replaceBackticksInObject(node.children)
    return `<p>${next(treadedChildren)}</p>`
  },

  a: (node: Node, next: Next) => {
    return `<a href="${node?.attrs.url}" rel="noopener nofollow">${next(node.children)}</a>`
  },

  h2: (node: Node, next: Next) => {
    const title = next(node.children)
    return `<h2 id="${convertToSlug(title)}">${title}</h2>`
  },

  cloudinary: (node: Node) => {
    return createInlineCloudinaryArticleImage(node)
  },

  display: (asset: EmbeddedItem | EntryNode, metadata: Metadata) => {
    return createInlineArticleImage(asset, metadata)
  },

  ['social-embeds']: (node: Node, next: Next) => {
    const splitOnEmbed = node.attrs.src.split('embed/')[1];
    const videoid = splitOnEmbed.split('?si=')[0];
    return `<lite-youtube i="${videoid}"></lite-youtube>`
  },

  code: (node: Node, next: Next) => {
    const html = next(node.children)
    return `<pre><code>${html}</code></pre>`
  }
}