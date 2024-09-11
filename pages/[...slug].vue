<script setup lang="ts">
const route = useRoute();
const path = route.path;

const cacheBust = ref(Date.now());

const { data: page, refresh } = await useGetPage({
  contentTypeUid: "page",
  url: path,
  cacheBust: cacheBust.value,
});

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
    console.log("⚡️ onEntryChange");
    cacheBust.value = Date.now();
    refresh();

    console.log(page.value);
  });
});
</script>
<template>
  <pre class="text-xs p-2">cache buster: {{ cacheBust }}</pre>
  <ComponentList v-if="page" :page="page" :key="cacheBust" />
</template>
