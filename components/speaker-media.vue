<script setup lang="ts">
defineProps(["description", "media"]);
</script>
<template>
  <div class="p-4 md:p-8 mb-8">
    <h3 class="title page-title inline-block mb-4">Speaker media</h3>
    <p v-if="description">{{ description }}</p>

    <figure class="media-grid my-12">
      <div class="media-1">
        <a :href="media[0].url" target="_blank" :title="media[0].alt">
          <Image
            class="fancy-image"
            :src="media[0].src"
            :alt="media[0].alt"
            fit="thumbnail"
            :height="2103"
            loading="lazy"
            provider="cloudinaryNative"
            sizes="sm:50vw"
            :width="1410"
          />
        </a>
      </div>
      <div class="media-2">
        <a :href="media[1].url" target="_blank" :title="media[1].alt">
          <Image
            class="fancy-image"
            :alt="media[1].alt"
            :src="media[1].src"
            :height="3080"
            fit="thumbnail"
            loading="lazy"
            provider="cloudinaryNative"
            sizes="sm:50vw"
            :width="5472"
          />
        </a>
      </div>
      <div class="media-3">
        <a :href="media[2].url" target="_blank" :title="media[2].alt">
          <Image
            class="fancy-image"
            :alt="media[2].alt"
            :src="media[2].src"
            :height="2880"
            fit="thumbnail"
            loading="lazy"
            provider="cloudinaryNative"
            sizes="sm:50vw"
            :width="5120"
          />
        </a>
      </div>
    </figure>
  </div>
</template>
