<script setup lang="ts">
const props = defineProps({
  smallertitle: {
    type: Boolean,
  },
  titletag: {
    type: String,
    default: "h1",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  subtitletag: {
    type: String,
    default: "h2",
  },
  right: {
    type: Boolean,
    default: false,
  },
  cslp: {
    type: Object,
  },
});

const heroclass = computed(() => {
  return props.smallertitle ? "text-3xl md:text-5xl" : "text-3xl md:text-7xl";
});

const alignmentClass = computed(() => {
  return props.right ? "right-16 lg:text-right	" : "left-16";
});
</script>
<template>
  <div class="md:relative mb-12 z-40 hero">
    <slot name="image" v-if="$slots.image" />

    <article
      v-if="title || description"
      class="md:absolute top-2/4 md:-translate-y-2/4 mt-4 md:mt-0 px-4 md:px-0"
      :class="alignmentClass"
    >
      <component
        :is="titletag"
        v-if="title"
        class="title inline-block"
        :class="heroclass"
        v-bind="cslp?.title"
      >
        {{ title }}
      </component>
      <component
        :is="subtitletag"
        v-if="description"
        class="bg-black py-1 px-2 text-lg md:text-2xl font-black"
        v-bind="cslp?.sub_title"
      >
        {{ description }}
      </component>

      <slot name="ctas" v-if="$slots.ctas" />
    </article>
  </div>
</template>
