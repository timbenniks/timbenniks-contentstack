<script setup lang="ts">
defineProps({
  alt: {
    type: String,
    default: "",
  },
  image: {
    type: Object,
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
    default: "auto",
  },
  caption: {
    type: String,
  },
  cslp: {
    type: Object,
  },
});
</script>

<template>
  <Media
    v-if="image"
    :src="image[0].public_id"
    :width="width"
    :height="height"
    :alt="alt"
    :fit="fit"
    :loading="loading"
    :provider="provider"
    :sizes="sizes"
    :caption="caption"
    v-bind="cslp && cslp.image"
  />
</template>
