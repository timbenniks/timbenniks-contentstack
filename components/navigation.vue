<script setup lang="ts">
const navigation = await useGetNavigation();
const { $preview } = useNuxtApp();
</script>

<template>
  <globalHeader :navigation="navigation" searchurl="/search">
    <div
      class="sticky top-0 p-2 bg-[#256ad1] uppercase text-sm"
      v-if="$preview"
    >
      ⚡️ Preview mode: on
    </div>
  </globalHeader>
</template>
