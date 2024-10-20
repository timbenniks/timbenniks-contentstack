<script setup lang="ts">
interface Props {
  image: any;
  alt: string;
  fit?: string;
  height: number;
  width: number;
  provider?: string;
  sizes?: string;
  fetchpriority?: string;
  loading?: "lazy" | "eager" | undefined;
  caption?: string;
  cslp?: any;
}

const props = withDefaults(defineProps<Props>(), {
  alt: "",
  provider: "cloudinaryNative",
  sizes: "sm:100vw",
  fetchpriority: "normal",
  loading: "lazy",
});

const imgUrl = computed(() => {
  if (props.image) {
    return props.image[0].public_id as string;
  }
});
</script>

<template>
  <Media
    v-if="imgUrl"
    :src="imgUrl"
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
