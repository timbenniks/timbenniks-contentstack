<script setup lang="ts">
const props = defineProps(["title", "query", "design"]);

const articles = await useGetListItems({
  contentTypeUid: "article",
  limit: Number(props.query.limit),
});
</script>

<template>
  <ArticlesList
    :articles="articles"
    :small="design.small"
    :firstFeatured="design.first_featured"
    :title="title"
  />
</template>
