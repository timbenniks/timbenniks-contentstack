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
  <section
    class="mb-12"
    v-if="page && page?.components"
    v-bind="page.cslp && page.cslp.components"
    :class="components.length === 0 ? 'visual-builder__empty-block-parent' : ''"
  >
    <component
      v-for="(component, index) in components"
      :is="getComponentForName(component?.name)"
      :key="(component?.props?._metadata.uid as string)"
      v-bind="component.props"
      :name="component?.name"
      :data-cslp="page.cslp && page.cslp[`components__${index}`]['data-cslp']"
    />
  </section>
</template>
