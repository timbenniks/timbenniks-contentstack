import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

const currentDir = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(fs.readFileSync(join(currentDir, 'package.json'), 'utf-8'))

export default defineNuxtConfig({
  compatibilityDate: '2024-10-29',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  nitro: {
    preset: 'node-server'
  },

  build: {
    transpile: process.env.NODE_ENV === 'production' ? ['tslib', '@contentstack/delivery-sdk'] : [],
  },

  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "nuxt-jsonld",
  ],

  features: {
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
      apiKey: process.env.CONTENTSTACK_API_KEY,
      deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN,
      previewToken: process.env.CONTENTSTACK_PREVIEW_TOKEN,
      managementToken: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
      environment: process.env.CONTENTSTACK_ENVIRONMENT,
      preview: process.env.CONTENTSTACK_PREVIEW === "true",
      region: process.env.CONTENTSTACK_REGION,
      deliverySdk: pkg.dependencies['@contentstack/delivery-sdk'],
      previewSdk: pkg.dependencies['@contentstack/live-preview-utils']
    },
  },
})