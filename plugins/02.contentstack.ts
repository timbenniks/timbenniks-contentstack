//import contentstack, { Region } from "@contentstack/delivery-sdk"
import Contentstack from "contentstack"

export default defineNuxtPlugin({
  name: "contentstack",
  async setup(nuxtApp) {
    const { $preview } = nuxtApp

    Contentstack.Utils.addEditableTags();

    const {
      apiKey,
      deliveryToken,
      previewToken,
      managementToken
    } = nuxtApp.$config.public;


    const stack = Contentstack.Stack({
      api_key: apiKey,
      delivery_token: deliveryToken,
      environment: "development",
      region: Contentstack.Region.EU,
      live_preview: {
        enable: $preview ? true : false,
        preview_token: previewToken,
        management_token: managementToken,
        host: "eu-rest-preview.contentstack.com",
      }
    });

    // const stack = contentstack.stack({
    //   apiKey,
    //   host: "eu-app.contentstack.com",
    //   endpoint: "eu-api.contentstack.com",
    //   deliveryToken,
    //   environment: "development",
    //   region: Region.EU,
    //   locale: "en-us",
    //   live_preview: {
    //     enable: true,
    //     preview_token: previewToken,
    //     host: "eu-rest-preview.contentstack.com",
    //   }
    // });

    return {
      provide: {
        stack,
      },
    };
  },
});