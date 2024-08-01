// https://nuxt.com/docs/api/configuration/nuxt-config
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

  modules: ["@nuxt/image", "@nuxtjs/tailwindcss", "@nuxt/fonts"],

  runtimeConfig: {
    public: {
      apiKey: process.env.CONTENTSTACK_API_KEY,
      deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN,
      previewToken: process.env.CONTENTSTACK_PREVIEW_TOKEN,
      managementToken: process.env.CONTENTSTACK_MANAGEMENT_TOKEN
    },
  },
})
