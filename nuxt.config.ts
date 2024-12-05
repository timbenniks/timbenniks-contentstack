import { Region } from '@contentstack/delivery-sdk'

export default defineNuxtConfig({
  compatibilityDate: '2024-10-29',
  devtools: { enabled: false },

  future: {
    compatibilityVersion: 4,
  },

  nitro: {
    //preset: process.env.NO_SCRIPTS === "true" ? 'static' : 'node-server',
    preset: 'node-server'
  },

  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "nuxt-jsonld",
    './modules/contentstack/module',
  ],

  features: {
    noScripts: process.env.NO_SCRIPTS === "true" ? true : false,
    inlineStyles: true,
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

  'contentstack': {
    debug: false,
    deliverySdkOptions: {
      apiKey: process.env.CONTENTSTACK_API_KEY as string,
      deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN as string,
      region: process.env.CONTENTSTACK_REGION === 'EU' ? Region.EU : Region.US,
      environment: process.env.CONTENTSTACK_ENVIRONMENT as string,
      live_preview: {
        preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN,
        enable: process.env.CONTENTSTACK_PREVIEW === "true",
      },
    },
    livePreviewSdkOptions: {
      editableTags: process.env.CONTENTSTACK_PREVIEW === "true",
      mode: "builder",
      editButton: {
        enable: process.env.CONTENTSTACK_PREVIEW === "true",
      },
    },
    personalizeSdkOptions: {
      enable: true,
      projectUid: process.env.CONTENTSTACK_PERSONALIZE_PROJECT_ID as string,
    },
  },

  image: {
    providers: {
      contentstack: {
        name: "contentstack",
        provider: "~/modules/contentstack/providers/contentstack",
        options: {
          baseURL: `https://eu-images.contentstack.com/v3/assets/`,
          apiKey: process.env.CONTENTSTACK_API_KEY as string
        }
      },
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
})