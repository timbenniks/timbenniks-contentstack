import type { Stack } from "@contentstack/delivery-sdk/dist/types/src/lib/stack";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

export default defineNuxtPlugin((nuxtApp) => {
  const { $preview, $stack } = nuxtApp

  if ($preview) {
    ContentstackLivePreview.init({
      ssr: true,
      editButton: {
        enable: true,
        position: 'bottom-left',
        includeByQueryParameter: false,
      },
      cleanCslpOnProduction: false,
      clientUrlParams: {
        host: "eu-app.contentstack.com",
      },
      // stackSdk: $stack as Stack,
      stackDetails: {
        apiKey: ($stack as Stack).config.apiKey,
        environment: "development"
      },
    });

    ContentstackLivePreview.onEntryChange(() => {
      console.log("onEntryChange")
      //refreshNuxtData();
    })

    ContentstackLivePreview.onLiveEdit(() => {
      console.log("onLiveEdit")
    })
  }
})

