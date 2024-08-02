<script setup lang="ts">
import type { Video } from "~/contentstack/generated";

const props = defineProps([
  "title",
  "description",
  "extra_s_url",
  "query",
  "design",
]);

const videos = await useGetListItems({
  contentTypeUid: "video",
  limit: Number(props.query.limit),
  tag: props.query.tag,
});
</script>

<template>
  <videosList
    :videos="(videos as Video[])"
    :title="title"
    :description="description"
    :extrasUrl="extra_s_url"
    :small="design.small"
    :firstFeatured="design.firstFeatured"
  />
</template>
