<script setup lang="ts">
defineProps(["body", "editableTag"]);
</script>
<template>
  <richtext>
    <div v-html="body" v-bind="editableTag?.body" />
  </richtext>
</template>
