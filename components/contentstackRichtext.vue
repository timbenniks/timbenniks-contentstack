<script setup lang="ts">
defineProps(["body"]);
</script>
<template>
  <richtext>
    <div v-html="body" />
  </richtext>
</template>
