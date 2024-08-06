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

const mappedVideos = videos?.map((video: any) => {
  return {
    ...video,
    videoId: video.videoid,
  };
});
</script>

<template>
  <videosList
    :videos="(mappedVideos as Video[])"
    :title="title"
    :description="description"
    :extrasUrl="extra_s_url"
    :small="design.small"
    :firstFeatured="design.firstFeatured"
  />
</template>
