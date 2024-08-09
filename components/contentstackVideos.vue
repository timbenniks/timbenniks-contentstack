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

function cleanAndTruncate(text: string, cutoff: number) {
  // Remove all occurrences of \r and \n
  let cleanedText = text.replace(/[\r\n]/g, " ");

  // Remove extra spaces
  cleanedText = cleanedText.replace(/\s+/g, " ").trim();

  // Truncate to 100 characters
  if (cleanedText.length > cutoff) {
    cleanedText = cleanedText.substring(0, cutoff) + "…";
  }

  return cleanedText;
}

const mappedVideos = videos?.map((video: any) => {
  return {
    ...video,
    description: cleanAndTruncate(video.description, 100),
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
