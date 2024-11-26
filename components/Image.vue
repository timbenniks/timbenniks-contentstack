<script lang="ts" setup>
interface Props {
  alt?: string;
  src: string;
  fit?: string;
  format?: string;
  height: number | string;
  width: number | string;
  provider?: string;
  sizes?: string;
  quality?: number;
  fetchpriority?: string;
  loading?: "lazy" | "eager" | undefined;
  modifiers?: {
    assetuid: string;
    auto: string;
    url: string;
  };
}

withDefaults(defineProps<Props>(), {
  alt: "",
  provider: "cloudinaryNative",
  sizes: "sm:100vw",
  fetchpriority: "normal",
  loading: "lazy",
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
    :modifiers="modifiers && modifiers"
    :quality="quality && quality"
    :format="format && format"
  />
</template>
