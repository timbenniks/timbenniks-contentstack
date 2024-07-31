import type { Stack } from "@contentstack/delivery-sdk/dist/types/src/lib/stack";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

export default defineNuxtPlugin((nuxtApp) => {
  const { $preview, $stack } = nuxtApp

  if ($preview) {
    ContentstackLivePreview.init({
      stackDetails: {
        apiKey: ($stack as Stack).config.apiKey,
      },
    });
  }
})