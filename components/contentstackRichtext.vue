<script setup lang="ts">
defineProps(["body", "cslp"]);
</script>
<template>
  <richtext>
    <div v-html="body" v-bind="cslp?.body" />
  </richtext>
</template>
