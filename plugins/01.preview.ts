export default defineNuxtPlugin((nuxtApp) => {
  const {
    previewMode
  } = nuxtApp.$config.public;

  if (previewMode) {
    nuxtApp.hook('page:finish', () => {
      refreshNuxtData();
    });

    console.log("⚡️ Nuxt event: preview initialized")
  }

  return { provide: { preview: previewMode } };
});