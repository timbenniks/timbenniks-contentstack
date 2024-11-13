<script setup lang="ts">
const navigation = await useGetNavigation();
const { livePreviewEnabled } = useNuxtApp().$contentstack as {
  livePreviewEnabled: boolean;
};
</script>

<template>
  <globalHeader :navigation="navigation" searchurl="/search">
    <div class="sticky top-0 p-1 bg-[#256ad1]" v-if="livePreviewEnabled">
      <span class="uppercase text-sm pr-2">⚡️ Preview mode: on</span>
    </div>
  </globalHeader>
</template>
