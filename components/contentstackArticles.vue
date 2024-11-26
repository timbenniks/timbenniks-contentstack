<script setup lang="ts">
import type { Article } from "~/contentstack/generated";
const props = defineProps(["title", "query", "design", "cslp", "subQueryData"]);

type Options = {
  contentTypeUid: "article" | "video" | "talk";
  limit?: number;
  tag?: string;
  subQueryData?: Article[];
};

const options: Options = {
  contentTypeUid: "article",
};

if (props.query.limit) {
  options.limit = Number(props.query.limit);
}

if (props.query.tag) {
  options.limit = props.query.tag;
}

if (props.query.subQueryData) {
  options.subQueryData = props.query.subQueryData;
}

const { data } = await useGetListItems(options);
</script>

<template>
  <ArticlesList
    :articles="subQueryData ? subQueryData : data"
    :small="design.small"
    :firstFeatured="design.first_featured"
    :title="title"
    :cslp="cslp"
  />
</template>
