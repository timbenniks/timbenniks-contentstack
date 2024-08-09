<script setup lang="ts">
const route = useRoute();
const path = route.path;

const page = await useGetPage({
  contentTypeUid: "page",
  url: path,
});

const { $stack } = useNuxtApp();

$stack.livePreviewQuery({
  contentTypeUid: "page",
  entryUid: "blt41315565c6fbd337",
  live_preview: "init",
});

useSeoMeta({
  googleSiteVerification: "hif_cn9hF2RVSnTq5HwjSkKrXqJT9Q6BR_FaBBmr-20",
  titleTemplate: "%s - Tim Benniks",
  description: page?.seo?.description,
  title: page?.title,
  ogImage: page?.seo?.image.secure_url,
});
</script>
<template>
  <ComponentList v-if="page" :page="page" />
</template>
