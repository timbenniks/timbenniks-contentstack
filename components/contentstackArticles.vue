<script setup lang="ts">
import type { Article } from "~/contentstack/generated";

const props = defineProps(["title", "query", "design"]);

const { data: articles, refresh } = await useGetListItems({
  contentTypeUid: "article",
  limit: Number(props.query.limit),
});

const cacheBust = ref(Date.now());

// onMounted(() => {
//   const { $ContentstackLivePreview } = useNuxtApp();

//   $ContentstackLivePreview.onEntryChange(() => {
//     console.log("⚡️ onEntryChange: useGetListItems");
//     refresh().then(() => {
//       cacheBust.value = Date.now();
//     });
//   });
// });
</script>

<template>
  <ArticlesList
    :articles="(articles as Article[])"
    :small="design.small"
    :firstFeatured="design.first_featured"
    :title="title"
    :key="cacheBust"
  />
</template>
