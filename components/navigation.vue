<script setup lang="ts">
const navigation = await useGetNavigation();
const { $preview } = useNuxtApp();

const { region, previewSdk, environment } = useNuxtApp().$config.public;
</script>

<template>
  <globalHeader :navigation="navigation" searchurl="/search">
    <div class="sticky top-0 p-1 bg-[#256ad1]" v-if="$preview">
      <span class="uppercase text-sm pr-2">⚡️ Preview mode: on</span>
      <span class="text-xs text-slate-300"
        >Preview sdk v{{ previewSdk }}. Region: {{ region }}. Environment:
        {{ environment }}</span
      >
    </div>
  </globalHeader>
</template>
