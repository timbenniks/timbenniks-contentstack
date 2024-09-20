<script setup lang="ts">
import { getComponentForName, mapComponentsToKV } from "~/helpers";

const props = defineProps({
  page: {
    type: Object,
    required: true,
  },
});

const components = computed(() => {
  return mapComponentsToKV(props.page?.components);
});
</script>

<template>
  <section class="mb-12" v-if="page && page?.components">
    <component
      v-for="component in components"
      :is="getComponentForName(component?.name)"
      :key="(component?.props._metadata.uid as string)"
      v-bind="component.props"
      :name="component?.name"
    />
  </section>
</template>
