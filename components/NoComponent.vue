<script setup lang="ts">
defineProps(["name"]);
</script>

<template>
  <div
    class="bg-red-200 text-red-800 p-4 mb-4 border-4 border-red-400 max-w-3xl overflow-auto"
  >
    <p class="mb-4">
      No Component Vue file or wrong name in CMS for
      <strong>{{ name }}</strong>
    </p>
    <pre>{{ $attrs }}</pre>
  </div>
</template>
