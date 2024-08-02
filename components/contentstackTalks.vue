<script setup lang="ts">
import type { Talk } from "~/contentstack/generated";

const props = defineProps(["title", "query", "design"]);

const talks = await useGetListItems({
  contentTypeUid: "talk",
  limit: Number(props.query.limit),
});
</script>

<template>
  <talksList :talks="(talks as Talk[])" :title="title" :small="design.small" />
</template>
