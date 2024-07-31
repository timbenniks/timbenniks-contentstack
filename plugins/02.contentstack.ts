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
      appHost
    } = nuxtApp.$config.public;

    const stack = contentstack.stack({
      apiKey,
      deliveryToken,
      environment,
      region: region === "eu" ? Region.EU : Region.US,
      //host: appHost,
      live_preview: {
        enable: $preview ? true : false,
        preview_token: previewToken,
        host: previewHost,
      }
    });

    console.log(stack.config)

    return {
      provide: {
        stack,
      },
    };
  },
});