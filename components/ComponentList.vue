<script setup lang="ts">
import { getComponentForName, mapComponentsToKV } from "~/helpers";
import { VB_EmptyBlockParentClass } from "@contentstack/live-preview-utils";

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
    v-bind="page.cslp.components"
    :class="page?.components.length === 0 ? VB_EmptyBlockParentClass : ''"
  >
    <component
      v-for="(component, index) in components"
      :is="getComponentForName(component?.name)"
      :key="(component?.props?._metadata.uid as string)"
      v-bind="component.props"
      :name="component?.name"
      :data-cslp="page.cslp[`components__${index}`]['data-cslp']"
    />
  </section>
</template>
