<script setup lang="ts">
const navigation = await useGetNavigation();
</script>

<template>
  <globalHeader :navigation="navigation" searchurl="/search" />
</template>
