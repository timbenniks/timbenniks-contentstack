<script setup lang="ts">
import type { Talk } from "~/contentstack/generated";

const props = defineProps(["title", "query", "design", "cslp", "subQueryData"]);

const { data } = await useGetListItems({
  contentTypeUid: "talk",
  limit: Number(props.query.limit),
  subQueryData: props.subQueryData,
});
</script>

<template>
  <talksList
    :talks="subQueryData ? subQueryData : data"
    :title="title"
    :small="design.small"
    :cslp="cslp"
  />
</template>
