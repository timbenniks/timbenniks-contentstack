import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import { Region } from '@contentstack/delivery-sdk'

const currentDir = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(fs.readFileSync(join(currentDir, 'package.json'), 'utf-8'))

export default defineNuxtConfig({
  compatibilityDate: '2024-10-29',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  nitro: {
    preset: process.env.NO_SCRIPTS === "true" ? 'static' : 'node-server'
  },

  build: {
    transpile: process.env.NODE_ENV === 'production' ? ['tslib', '@contentstack/delivery-sdk'] : [],
  },

  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "nuxt-jsonld",
    './modules/contentstack',
  ],

  features: {
    noScripts: process.env.NO_SCRIPTS === "true" ? true : false,
    inlineStyles: true
  },

  fonts: {
    defaults: {
      weights: [400, 700, 900],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: {
        'sans-serif': ['Trebuchet MS']
      }
    },
  },

  image: {
    providers: {
      cloudinaryFetch: {
        name: 'cloudinaryFetch',
        provider: 'cloudinary',
        options: {
          baseURL: "https://res.cloudinary.com/dwfcofnrd/image/fetch/"
        }
      },
      cloudinaryNative: {
        name: 'cloudinaryNative',
        provider: 'cloudinary',
        options: {
          baseURL: "https://res.cloudinary.com/dwfcofnrd/image/upload/"
        }
      }
    }
  },

  runtimeConfig: {
    public: {
      environment: process.env.CONTENTSTACK_ENVIRONMENT,
      preview: process.env.CONTENTSTACK_PREVIEW === "true",
      region: process.env.CONTENTSTACK_REGION,
      deliverySdk: pkg.dependencies['@contentstack/delivery-sdk'],
      previewSdk: pkg.dependencies['@contentstack/live-preview-utils']
    },
  },

  contentstack: {
    debug: false,
    deliverySdkOptions: {
      apiKey: process.env.CONTENTSTACK_API_KEY,
      deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN,
      region: process.env.CONTENTSTACK_REGION === 'EU' ? Region.EU : Region.US,
      environment: process.env.CONTENTSTACK_ENVIRONMENT,
      live_preview: {
        preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN,
        enable: process.env.CONTENTSTACK_PREVIEW === "true",
      },
    },
    livePreviewSdkOptions: {
      editableTags: true,
      mode: "builder",
      editButton: {
        enable: true,
      },
    },
    personalizeSdkOptions: {
      enable: false,
      projectUid: '',
    },
  },
})