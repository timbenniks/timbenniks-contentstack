<script setup lang="ts">
defineProps(["body", "editabletag"]);
</script>
<template>
  <richtext>
    <div v-html="body" v-bind="editabletag?.body" />
  </richtext>
</template>
