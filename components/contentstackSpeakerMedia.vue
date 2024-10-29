<script setup lang="ts">
const props = defineProps(["media", "title", "description", "cslp"]);

const medias = computed(() => {
  return props.media.map((image: any) => {
    return {
      url: image.image.cloudinary_image[0].secure_url,
      src: image.image.cloudinary_image[0].public_id,
      alt: image.image.cloudinary_image[0].context?.custom?.alt || "",
    };
  });
});
</script>
<template>
  <SpeakerMedia :media="medias" :title="title" :description="description" />
</template>
