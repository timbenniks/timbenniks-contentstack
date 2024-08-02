<script setup lang="ts">
defineProps({
  design: {
    type: Object,
  },
  titletag: {
    type: String,
    default: "h1",
  },
  subtitletag: {
    type: String,
    default: "h2",
  },
  title: {
    type: String,
  },
  sub_title: {
    type: String,
  },
  image: {
    type: Object,
  },
  ctas: {
    type: Array,
  },
});
</script>
<template>
  <Hero
    :title="title"
    :titletag="titletag"
    :description="sub_title"
    :subtitletag="subtitletag"
    :right="design?.right || false"
    :smallertitle="design?.smallertitle || false"
  >
    <template #image>
      <NuxtImg
        v-if="image && image[0]"
        fetchpriority="high"
        fit="thumbnail"
        :alt="title"
        loading="eager"
        provider="cloudinaryNative"
        sizes="sm:100vw"
        :src="image[0].public_id"
        :width="image[0]?.width"
        :height="image[0]?.height"
      />
    </template>

    <template #ctas>
      <!-- <cta
        v-for="{ cta } in ctas"
        :key="cta.url.href"
        :url="cta.url.href"
        :text="cta.url.title"
        :target="cta.target"
      /> -->
      <cta
        v-for="{ cta } in ctas"
        :key="cta.url.href"
        url="#"
        :text="cta.url.title"
        :target="cta.target"
      />
    </template>
  </Hero>
</template>
