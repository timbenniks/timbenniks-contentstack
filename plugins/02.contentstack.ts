import contentstack, { Region } from "@contentstack/delivery-sdk"

export default defineNuxtPlugin({
  name: "contentstack",
  async setup(nuxtApp) {
    const { $preview } = nuxtApp

    const {
      apiKey,
      deliveryToken,
      environment,
      region,
      previewToken,
      previewHost,
    } = nuxtApp.$config.public;

    const stack = contentstack.stack({
      apiKey,
      deliveryToken,
      environment,
      region: region === "eu" ? Region.EU : Region.US,
      live_preview: {
        enable: $preview ? true : false,
        preview_token: previewToken,
        host: previewHost,
      }
    });

    return {
      provide: {
        stack,
      },
    };
  },
});