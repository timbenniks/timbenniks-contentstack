<script setup lang="ts">
const props = defineProps(["title", "query", "design"]);

const talks = await useGetListItems({
  contentTypeUid: "talk",
  limit: Number(props.query.limit),
});
</script>

<template>
  <talksList :talks="talks" :title="title" :small="design.small" />
</template>
