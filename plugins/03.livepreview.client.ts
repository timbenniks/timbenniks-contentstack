import type { Stack } from "@contentstack/delivery-sdk/dist/types/src/lib/stack";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import type { IStackSdk } from "@contentstack/live-preview-utils/dist/src/utils/types";

export default defineNuxtPlugin((nuxtApp) => {
  const { $preview, $stack } = nuxtApp

  if ($preview) {
    ContentstackLivePreview.init({
      // ssr: false,
      // @ts-ignore
      stackSdk: $stack.config as IStackSdk,
      // enable: true,
      // stackDetails: {
      //   apiKey: "blt8699317c576dde05",
      // },
      // clientUrlParams: {
      //   protocol: "https",
      //   host: "eu-app.contentstack.com",
      //   port: 443,
      // },
    });

    console.log("⚡️ ContentstackLivePreview event: initialized")
  }

  return {
    provide: {
      ContentstackLivePreview,
    },
  };
})

