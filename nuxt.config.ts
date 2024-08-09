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
  //       'style-src': [
  //         "'self'",
  //         "'report-sample'",
  //         "'unsafe-inline'",
  //         "*.csnonprod.com",
  //         "*.contentstack.com",
  //         "*.salesforceliveagent.com",
  //         "https://*.salesforce-sites.com",
  //         "https://rawgithub.com",
  //         "https://*.bootstrapcdn.com",
  //         "https://cdnjs.cloudflare.com",
  //         "https://fonts.googleapis.com",
  //         "https://service.force.com",
  //         "https://liveagentcontentstack.secure.force.com",
  //         "https://fast.appcues.com",
  //         "https://frames-commandbar-prod.commandbar.com",
  //         "https://cdn.commandbar.com"
  //       ],
  //       'connect-src': [
  //         "'self'",
  //         "*.csnonprod.com",
  //         "*.contentstack.com",
  //         "*.salesforce-sites.com",
  //         "https://cdn-personalization.contentstack.com",
  //         "https://cdn.contentstack.io",
  //         "https://api.appcues.net",
  //         "wss://api.appcues.net",
  //         "https://liveagentcontentstack.secure.force.com",
  //         "https://api-iam.intercom.io",
  //         "wss://nexus-websocket-a.intercom.io",
  //         "wss://ws-mt1.pusher.com",
  //         "https://widget.usersnap.com",
  //         "https://api.commandbar.com",
  //         "https://t.commandbar.com",
  //         "https://s3.us-west-2.amazonaws.com",
  //         "https://*.browser-intake-datadoghq.eu",
  //         "wss://ws-eu.pusher.com" // Add this line
  //       ],
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