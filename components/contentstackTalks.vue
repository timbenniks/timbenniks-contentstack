<script setup lang="ts">
import type { Talk } from "~/contentstack/generated";

const props = defineProps(["title", "query", "design", "cslp", "subQueryData"]);

const { data: talks } = await useGetListItems({
  contentTypeUid: "talk",
  limit: Number(props.query.limit),
  subQueryData: props.subQueryData,
});
</script>

<template>
  <talksList
    :talks="(talks as Talk[])"
    :title="title"
    :small="design.small"
    :cslp="cslp"
  />
</template>
