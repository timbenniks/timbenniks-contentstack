<script setup lang="ts">
const props = defineProps(["reference"]);

const timelineItems = computed(() => {
  return props.reference[0].jobs.map((job: any) => {
    return {
      url: job.job.url,
      daterange: job.job.date_range,
      company: job.job.company,
      title: job.job.title,
      text: job.job.description,
      cslp: job.job.cslp,
    };
  });
});
</script>
<template>
  <timeline :timelineItems="timelineItems" />
</template>
