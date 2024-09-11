<script setup lang="ts">
import type { Talk } from "~/contentstack/generated";

const props = defineProps(["title", "query", "design"]);

const { data: talks, refresh } = await useGetListItems({
  contentTypeUid: "talk",
  limit: Number(props.query.limit),
});

const cacheBust = ref(Date.now());

// onMounted(() => {
//   const { $ContentstackLivePreview } = useNuxtApp();

//   $ContentstackLivePreview.onEntryChange(() => {
//     console.log("⚡️ onEntryChange: useGetListItems");
//     refresh().then(() => {
//       cacheBust.value = Date.now();
//     });
//   });
// });
</script>

<template>
  <talksList
    :talks="(talks as Talk[])"
    :title="title"
    :small="design.small"
    :key="cacheBust"
  />
</template>
