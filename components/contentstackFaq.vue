<script setup lang="ts">
const props = defineProps(["reference"]);

const faqs = computed(() => {
  return props.reference[0].qas.map((qa: any) => {
    return {
      question: qa.qa.question,
      answer: qa.qa.answer,
      cslp: qa.qa.cslp,
    };
  });
});
</script>
<template>
  <faq :faqs="faqs" :big="true" :title="reference[0].title" />
</template>
