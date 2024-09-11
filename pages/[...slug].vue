<script setup lang="ts">
const route = useRoute();
const path = route.path;

const i = ref(0);

const {
  data: page,
  status,
  refresh,
} = await useGetPage({
  contentTypeUid: "page",
  url: path,
  cacheBust: i.value,
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
    console.log("⚡️ ContentstackLivePreview event: onEntryChange");
    // @ts-ignore
    console.log(page.value);
    refresh();
    i.value = i.value++;
  });
});
</script>
<template>
  <ComponentList v-if="page" :page="page" :key="i" />
</template>
