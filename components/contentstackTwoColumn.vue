<script setup lang="ts">
import { getComponentForName, mapComponentsToKV } from "~/helpers";

const props = defineProps(["two_column_connection"]);

const componentsA = computed(() => {
  return mapComponentsToKV(props.two_column_connection[0].side_a);
});

const componentsB = computed(() => {
  return mapComponentsToKV(props.two_column_connection[0].side_b);
});
</script>

<template>
  <twoColumns>
    <template #sidea>
      <component
        v-for="component in componentsA"
        :is="getComponentForName(component?.name)"
        :key="(component?.props._metadata.uid as string)"
        v-bind="component.props"
        :name="component?.name"
      />
    </template>
    <template #sideb>
      <component
        v-for="component in componentsB"
        :is="getComponentForName(component?.name)"
        :key="(component?.props._metadata.uid as string)"
        v-bind="component.props"
        :name="component?.name"
      />
    </template>
  </twoColumns>
</template>
