export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  build: {
    transpile: ['tslib', '@contentstack/delivery-sdk'],
  },

  extends: [
    'github:timbenniks/timbenniks-components'
  ],

  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "nuxt-jsonld",
    //"nuxt-security"
  ],

  devServer: {
    https: {
      key: './localhost-key.pem',
      cert: './localhost.pem',
    },
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

  // security: {
  //   headers: {
  //     contentSecurityPolicy: {
  //       'img-src': ["'self'", "data:", "https://res.cloudinary.com"],
  //       'frame-ancestors': ["'self'", "https://eu-app.contentstack.com/"],
  //     },
  //   },
  // },

  features: {
    noScripts: false,
    inlineStyles: true
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
      managementToken: process.env.CONTENTSTACK_MANAGEMENT_TOKEN
    },
  },
})