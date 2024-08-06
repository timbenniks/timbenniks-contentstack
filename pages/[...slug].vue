<script setup lang="ts">
const route = useRoute();
const path = route.path;

const page = await useGetPage({
  contentTypeUid: "page",
  url: path,
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
