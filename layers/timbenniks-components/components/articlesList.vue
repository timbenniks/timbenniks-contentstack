<script setup lang="ts">
const props = defineProps(["articles", "small", "firstFeatured", "title"]);

const smallOrBigClass = computed(() => {
  return props.small
    ? "grid grid-cols-1 md:grid-cols-1 gap-6"
    : "grid grid-cols-1 md:grid-cols-3 gap-6";
});
</script>

<template>
  <div class="px-4 md:px-8 mb-8">
    <h3 v-if="title" class="title inline-block mb-4">
      {{ title }}
    </h3>

    <ul v-if="firstFeatured">
      <article-card
        :article="articles[0]"
        :key="articles[0]._path"
        :small="small"
        :featured="true"
      />
    </ul>

    <ul :class="smallOrBigClass">
      <article-card
        v-if="firstFeatured"
        v-for="article in articles.slice(1)"
        :article="article"
        :key="article._path"
        :small="small"
        :featured="false"
      />
      <article-card
        v-else
        v-for="article in articles"
        :article="article"
        :key="article.id"
        :small="small"
        :featured="false"
      />
    </ul>
  </div>
</template>
