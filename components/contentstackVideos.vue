<script setup lang="ts">
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
    :videos="videos"
    :title="title"
    :description="description"
    :extrasUrl="extra_s_url"
    :small="design.small"
    :firstFeatured="design.firstFeatured"
  />
</template>
