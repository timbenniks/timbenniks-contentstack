<script setup lang="ts">
const props = defineProps([
  "videos",
  "small",
  "title",
  "description",
  "extrasUrl",
  "firstFeatured",
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
      <h2 v-if="title" class="title inline-block">
        {{ title }}
      </h2>
      <p class="uppercase text-sm mt-2" v-if="extrasUrl">
        <nuxt-link :to="extrasUrl">See all →</nuxt-link>
      </p>
    </header>
    <div class="mb-12 max-w-screen-lg prose prose-invert" v-if="description">
      {{ description }}
    </div>

    <ul :class="smallOrBigClass" class="mt-4">
      <VideoCard
        v-if="firstFeatured"
        v-for="video in videos.slice(1)"
        :key="video.videoId"
        class="mb-4"
        :featured="false"
        :video="video"
        :small="small"
      />

      <VideoCard
        v-else
        v-for="video in videos"
        :key="video.id"
        class="mb-4"
        :featured="false"
        :video="video"
        :small="small"
      />
    </ul>
  </div>
</template>
