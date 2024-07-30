<script setup lang="ts">
const page = await useGetPage({
  contentTypeUid: "page",
  url: "home",
});
</script>
<template>
  <p>preview: {{ $preview ? true : false }}</p>
  <ComponentList v-if="page" :page="page" />
</template>
