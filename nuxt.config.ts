// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  extends: [
    'github:timbenniks/timbenniks-components'
  ],

  modules: ["@nuxt/image", "@nuxtjs/tailwindcss", "@nuxt/fonts"],

  runtimeConfig: {
    public: {
      apiKey: process.env.CONTENTSTACK_API_KEY,
      deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN,
      environment: process.env.CONTENTSTACK_ENVIRONMENT,
      region: process.env.CONTENTSTACK_REGION || "us",
      previewToken: process.env.CONTENTSTACK_PREVIEW_TOKEN,
      previewHost: process.env.CONTENTSTACK_PREVIEW_HOST || 'rest-preview.contentstack.com',
      apiHost: process.env.CONTENTSTACK_API_HOST || 'api.contentstack.io',
      appHost: process.env.CONTENTSTACK_APP_HOST || 'app.contentstack.com',
      branch: process.env.CONTENTSTACK_BRANCH || 'main',
      livePreview: process.env.CONTENTSTACK_LIVE_PREVIEW,
      managementToken: process.env.CONTENTSTACK_MANAGEMENT_TOKEN
    },
  },
})