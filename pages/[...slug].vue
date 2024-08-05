<script setup lang="ts">
const route = useRoute();
const path = route.path;

const page = await useGetPage({
  contentTypeUid: "page",
  url: path,
});
</script>
<template>
  <ComponentList v-if="page" :page="page" />
</template>
