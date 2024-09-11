import type { Stack } from "@contentstack/delivery-sdk/dist/types/src/lib/stack";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

export default defineNuxtPlugin((nuxtApp) => {
  const { $preview, $stack } = nuxtApp

  if ($preview) {
    ContentstackLivePreview.init({
      ssr: false,
      // @ts-ignore
      stackSdk: $stack as Stack,
      enable: true
    });

    console.log("⚡️ ContentstackLivePreview event: initialized")
  }

  return {
    provide: {
      ContentstackLivePreview,
    },
  };
})

