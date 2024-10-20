<script lang="ts" setup>
interface Props {
  alt: string;
  src: string;
  fit?: string
  height: number
  width: number
  provider?: string
  sizes?: string
  fetchpriority?: string
  loading?: "lazy" | "eager" | undefined,
}

withDefaults(defineProps<Props>(), {
  alt: "",
  provider: "cloudinaryNative",
  sizes: "sm:100vw",
  fetchpriority: "normal",
  loading: "lazy"
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
