<script setup lang="ts">
import type { Article } from "~/contentstack/generated";

const props = defineProps(["title", "query", "design", "cslp", "subQueryData"]);

const { data: articles } = await useGetListItems({
  contentTypeUid: "article",
  limit: Number(props.query.limit),
  subQueryData: props.subQueryData,
});
</script>

<template>
  <ArticlesList
    :articles="(articles as Article[])"
    :small="design.small"
    :firstFeatured="design.first_featured"
    :title="title"
    :cslp="cslp"
  />
</template>
