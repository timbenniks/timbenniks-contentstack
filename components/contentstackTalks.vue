<script setup lang="ts">
import type { Talk } from "~/contentstack/generated";

const props = defineProps(["title", "query", "design", "cslp"]);

const { data: talks, refresh } = await useGetListItems({
  contentTypeUid: "talk",
  limit: Number(props.query.limit),
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
