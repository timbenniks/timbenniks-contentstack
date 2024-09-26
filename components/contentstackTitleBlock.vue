<script setup lang="ts">
defineProps(["tag", "title", "simple", "nospace", "small", "cslp"]);
</script>
<template>
  <titleBlock
    :tag="tag"
    :title="title"
    :simple="simple"
    :nospace="nospace"
    :small="small"
    :cslp="cslp"
  />
</template>
