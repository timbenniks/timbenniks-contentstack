<script setup lang="ts">
const props = defineProps([
  "videos",
  "small",
  "title",
  "description",
  "extrasUrl",
  "firstFeatured",
  "cslp",
]);

const smallOrBigClass = computed(() => {
  return props.small
    ? "grid grid-cols-1 md:grid-cols-1 gap-6"
    : "grid grid-cols-1 md:grid-cols-3 gap-6";
});
</script>

<template>
  <div class="px-4 md:px-8 mb-8">
    <ul v-if="firstFeatured">
      <VideoCard
        :video="videos[0]"
        :featured="true"
        :key="videos[0] && videos[0].id"
        class="mb-4"
      />
    </ul>

    <header
      class="mb-2 flex md:space-x-4 space-x-0 md:items-end flex-col md:flex-row items-start"
    >
      <h2 v-if="title" class="title inline-block" v-bind="cslp?.title">
        {{ title }}
      </h2>
      <p
        class="uppercase text-sm mt-2"
        v-if="extrasUrl"
        v-bind="cslp?.extra_s_url"
      >
        <nuxt-link :to="extrasUrl">See all →</nuxt-link>
      </p>
    </header>
    <div
      class="mb-12 max-w-screen-lg prose prose-invert"
      v-if="description"
      v-bind="cslp?.description"
    >
      {{ description }}
    </div>

    <ul :class="smallOrBigClass" class="mt-4">
      <VideoCard
        v-if="firstFeatured"
        v-for="video in videos.slice(1)"
        :key="video.videoid"
        class="mb-4"
        :featured="false"
        :video="video"
        :small="small"
        :cslp="video.cslp"
      />

      <VideoCard
        v-else
        v-for="video in videos"
        :key="video.id"
        class="mb-4"
        :featured="false"
        :video="video"
        :small="small"
        :cslp="video.cslp"
      />
    </ul>
  </div>
</template>
