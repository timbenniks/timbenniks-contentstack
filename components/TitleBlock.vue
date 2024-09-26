<script setup lang="ts">
defineProps(["tag", "title", "simple", "nospace", "small", "cslp"]);
</script>
<template>
  <div :class="!nospace ? 'px-4 md:px-8 mb-4' : ''">
    <component
      :is="tag"
      :class="
        !simple
          ? `title ${!small ? 'page-title' : ''} inline-block`
          : 'font-black text-3xl mb-4'
      "
      v-bind="cslp && cslp.title"
      >{{ title }}</component
    >
  </div>
</template>
