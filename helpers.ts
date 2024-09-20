import type { Component } from 'vue'
import NoComponent from "./components/NoComponent.vue";
import hero from "./components/contentstackHero.vue";
import richtext from "./components/contentstackRichtext.vue";
import videos from "./components/contentstackVideos.vue";
import talks from "./components/contentstackTalks.vue"
import articles from "./components/contentstackArticles.vue"
import two_columns from "./components/contentstackTwoColumn.vue"
import image from "./components/contentstackMedia.vue"
import title_block from "./components/contentstackTitleBlock.vue"

type Mapping = {
  [name: string]: Component
}

export const mapping: Mapping = {
  hero,
  richtext,
  videos,
  talks,
  articles,
  two_columns,
  image,
  title_block
};

export function getComponentForName(name: string) {
  return mapping[name] ?? NoComponent
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

export function mapComponentsToKV(components: any) {
  return components.map((obj: any) => {
    // @ts-ignore
    const [[name, props]] = Object.entries(obj);
    return { name, props };
  });
}