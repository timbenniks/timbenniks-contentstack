<script setup lang="ts">
import type { Video } from "~/contentstack/generated";

const props = defineProps([
  "title",
  "description",
  "extra_s_url",
  "query",
  "design",
  "cslp",
  "subQueryData",
]);

function cleanAndTruncate(text: string, cutoff: number) {
  let cleanedText = text.replace(/[\r\n]/g, " ");
  cleanedText = cleanedText.replace(/\s+/g, " ").trim();

  if (cleanedText.length > cutoff) {
    cleanedText = cleanedText.substring(0, cutoff) + "…";
  }

  return cleanedText;
}

const { data } = await useGetListItems({
  contentTypeUid: "video",
  limit: Number(props.query.limit),
  subQueryData: props.subQueryData,
});
</script>

<template>
  <videosList
    :videos="subQueryData ? subQueryData : data"
    :title="title"
    :description="cleanAndTruncate(description, 100)"
    :extrasUrl="extra_s_url"
    :small="design.small"
    :firstFeatured="design.firstfeatured"
    :cslp="cslp"
  />
</template>
