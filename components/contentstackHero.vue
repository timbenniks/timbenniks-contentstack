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
        :src="
          image[0]?.secure_url.replace(`v${image?.version}`, 'f_auto,q_auto')
        "
        :width="image[0]?.width"
        :height="image[0]?.height"
      />
    </template>

    <template #ctas></template>
  </Hero>
</template>
