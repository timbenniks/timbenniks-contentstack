<script setup lang="ts">
const { path } = useRoute();

const { data: page } = await useGetPage({
  contentTypeUid: "page",
  url: path,
});

useSeoMeta({
  googleSiteVerification: "hif_cn9hF2RVSnTq5HwjSkKrXqJT9Q6BR_FaBBmr-20",
  titleTemplate: "%s - Tim Benniks",
  description: page.value?.seo?.description,
  title: page.value?.title,
  ogImage: page.value?.seo?.image.secure_url,
});
</script>
<template>
  <ComponentList v-if="page" :page="page" />
</template>
