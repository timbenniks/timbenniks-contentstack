import type { Stack } from "@contentstack/delivery-sdk/dist/types/src/lib/stack";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import type { IStackSdk } from "@contentstack/live-preview-utils/dist/src/utils/types";

export default defineNuxtPlugin((nuxtApp) => {
  const { $preview, $stack } = nuxtApp

  if ($preview) {
    ContentstackLivePreview.init({
      ssr: false,
      enable: true,
      stackSdk: ($stack as Stack).config as IStackSdk,
      stackDetails: {
        apiKey: "blt8699317c576dde05",
        environment: "development",
        branch: "main"
      },
      clientUrlParams: {
        host: "eu-app.contentstack.com",
      },
      editButton: {
        enable: true,
        exclude: ["outsideLivePreviewPortal"],
        includeByQueryParameter: true,
        position: "top-left"
      }
    });

    console.log("⚡️ ContentstackLivePreview event: initialized")
  }

  return {
    provide: {
      ContentstackLivePreview,
    },
  };
})

