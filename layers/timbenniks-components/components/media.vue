<script setup lang="ts">
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
    default: "auto",
  },
  caption: {
    type: String,
  },
});
</script>

<template>
  <div class="px-4 md:px-8 mb-8">
    <figure>
      <Image
        :alt="alt"
        :src="src"
        :fit="fit"
        :height="height"
        :loading="loading"
        :provider="provider"
        :sizes="sizes"
        :width="width"
      />
      <figcaption v-if="caption" class="mt-2">
        {{ caption }}
      </figcaption>
    </figure>
  </div>
</template>
