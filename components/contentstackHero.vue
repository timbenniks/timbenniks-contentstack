<script setup lang="ts">
const props = defineProps({
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
  cslp: {
    type: Object,
  },
});

const overlayOpacityClass = computed(() => {
  const darkenImage = props.design?.darken_image;
  const validValues = Array.from({ length: 21 }, (_, i) => (i * 5).toString());
  return validValues.includes(darkenImage)
    ? `bg-opacity-${darkenImage}`
    : "bg-opacity-0";
});
</script>
<template>
  <Hero
    :title="title"
    :titletag="titletag"
    :description="sub_title"
    :subtitletag="subtitletag"
    :right="design?.right || false"
    :smallertitle="design?.smaller_title || false"
    :cslp="cslp"
  >
    <template #image>
      <div class="relative aspect-[1280/550] w-full h-full">
        <template v-if="image && image[0]">
          <NuxtImg
            fetchpriority="high"
            fit="thumbnail"
            :alt="title"
            loading="eager"
            provider="cloudinaryNative"
            sizes="sm:100vw"
            :src="image[0].public_id"
            :width="1280"
            :height="550"
          />
          <div
            v-if="design?.darken_image > 0"
            class="bg-black absolute w-full h-full top-0 left-0"
            :class="overlayOpacityClass"
          ></div>
        </template>
        <template v-else>
          <div
            class="aspect-[1280/550] w-full h-full bg-[#0e1029] flex items-center justify-around"
          >
            <tim class="w-44 opacity-50" />
          </div>
        </template>
      </div>
    </template>

    <template #ctas>
      <div
        v-bind="cslp && cslp.ctas"
        class="mt-4 flex space-x-4"
        :class="[
          design?.right ? 'justify-start lg:justify-end' : 'justify-start',
          ctas?.length === 0 ? 'visual-builder__empty-block-parent' : '',
        ]"
      >
        <cta
          v-for="({ cta }, index) in ctas"
          :key="cta.url.href"
          :url="cta.url.href"
          :text="cta.url.title"
          :target="cta.target"
          v-bind="cslp && cslp[`ctas__${index}`]"
        />
      </div>
    </template>
  </Hero>
</template>
