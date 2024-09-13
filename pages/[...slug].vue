<script setup lang="ts">
const route = useRoute();
const path = route.path;

const { data: page, refresh } = await useGetPage({
  contentTypeUid: "page",
  url: path,
});

const cacheBust = ref(Date.now());

useSeoMeta({
  googleSiteVerification: "hif_cn9hF2RVSnTq5HwjSkKrXqJT9Q6BR_FaBBmr-20",
  titleTemplate: "%s - Tim Benniks",
  description: page.value?.seo?.description,
  title: page.value?.title,
  ogImage: page.value?.seo?.image.secure_url,
});

onMounted(() => {
  const { $ContentstackLivePreview } = useNuxtApp();

  $ContentstackLivePreview.onEntryChange(() => {
    console.log("⚡️ onEntryChange: page");
    refresh().then(() => {
      cacheBust.value = Date.now();

      console.log(page.value);
    });
  });
});
</script>
<template>
  <ComponentList v-if="page" :page="page" :key="cacheBust" />
</template>
