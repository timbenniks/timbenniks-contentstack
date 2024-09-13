<script setup lang="ts">
import type { Article } from "~/contentstack/generated";

const props = defineProps(["title", "query", "design", "editabletag"]);

const { data: articles } = await useGetListItems({
  contentTypeUid: "article",
  limit: Number(props.query.limit),
});
</script>

<template>
  <ArticlesList
    :articles="(articles as Article[])"
    :small="design.small"
    :firstFeatured="design.first_featured"
    :title="title"
    :editabletag="editabletag"
  />
</template>
