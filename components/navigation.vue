<script setup lang="ts">
const navigation = await useGetNavigation();
const { $preview } = useNuxtApp();
</script>

<template>
  <globalHeader :navigation="navigation" searchurl="/search">
    <div class="sticky top-0 p-1 bg-[#256ad1]" v-if="$preview">
      <span class="uppercase text-sm pr-2">⚡️ Preview mode: on</span>
      <span class="text-xs text-slate-300"
        >Preview sdk v1.4.4. Region: EU. Environment: development</span
      >
    </div>
  </globalHeader>
</template>
