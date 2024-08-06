<script lang="ts" setup>
defineProps({
  alt: {
    type: String,
    default: "",
  },
  src: {
    type: String,
  },
  fit: {
    type: String,
    default: "",
  },
  height: {
    type: Number,
    default: "",
  },
  width: {
    type: Number,
    default: "",
  },
  provider: {
    type: String,
    default: "cloudinaryNative",
  },
  sizes: {
    type: String,
    default: "sm:100vw",
  },
  fetchpriority: {
    type: String,
    default: "normal",
  },
  loading: {
    type: String,
    default: "lazy",
  },
});
</script>

<template>
  <nuxt-img
    :alt="alt"
    :src="src"
    :fit="fit"
    :height="height"
    :loading="loading"
    :provider="provider"
    :sizes="sizes"
    :width="width"
  />
</template>
