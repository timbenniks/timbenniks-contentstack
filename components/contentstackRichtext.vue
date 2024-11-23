<script setup lang="ts">
defineProps(["body", "cslp"]);
</script>
<template>
  <richtext>
    <div
      v-html="body"
      v-bind="cslp?.body"
      :class="{ 'p-4 border-2 border-violet-400': !body }"
    />
  </richtext>
</template>
