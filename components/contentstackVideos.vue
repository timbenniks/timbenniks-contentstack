<script setup lang="ts">
import type { Video } from "~/contentstack/generated";

const props = defineProps([
  "title",
  "description",
  "extra_s_url",
  "query",
  "design",
  "cslp",
]);

const { data: videos } = await useGetListItems({
  contentTypeUid: "video",
  limit: Number(props.query.limit),
  tag: props.query.tag,
});

function cleanAndTruncate(text: string, cutoff: number) {
  let cleanedText = text.replace(/[\r\n]/g, " ");
  cleanedText = cleanedText.replace(/\s+/g, " ").trim();

  if (cleanedText.length > cutoff) {
    cleanedText = cleanedText.substring(0, cutoff) + "…";
  }

  return cleanedText;
}

const mappedVideos = computed(() => {
  return videos.value?.map((video: any) => {
    return {
      ...video,
      description: cleanAndTruncate(video.description, 100),
      videoId: video.videoid,
    };
  });
});
</script>

<template>
  <videosList
    :videos="(mappedVideos as Video[])"
    :title="title"
    :description="description"
    :extrasUrl="extra_s_url"
    :small="design.small"
    :firstFeatured="design.firstfeatured"
    :cslp="cslp"
  />
</template>
