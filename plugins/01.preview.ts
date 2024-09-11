export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute();
  const preview = route.query.preview && route.query.preview === 'true';

  if (preview) {
    nuxtApp.hook('page:finish', () => {
      refreshNuxtData();
    });

    console.log("⚡️ Nuxt event: preview initialized")
  }

  return { provide: { preview } };
});