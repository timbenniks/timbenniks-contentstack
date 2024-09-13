<script setup lang="ts">
import type { Talk } from "~/contentstack/generated";

const props = defineProps(["title", "query", "design", "editabletag"]);

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
    :editabletag="editabletag"
  />
</template>
