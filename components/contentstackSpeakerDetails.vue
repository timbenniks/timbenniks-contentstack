<script setup lang="ts">
defineProps(["details", "title", "cslp"]);
</script>
<template>
  <SpeakerDetails :deets="details" :title="title" :cslp="cslp" />
</template>
