<script setup lang="ts">
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
  caption?: string
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
  <div class="px-4 md:px-8 mb-8">
    <figure>
      <Image
        :alt="alt"
        :src="src"
        :fit="fit"
        :height="height"
        :loading="loading"
        :provider="provider"
        :fetchpriority="fetchpriority"
        :sizes="sizes"
        :width="width"
      />
      <figcaption v-if="caption" class="mt-2">
        {{ caption }}
      </figcaption>
    </figure>
  </div>
</template>
