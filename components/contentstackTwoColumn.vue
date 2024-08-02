<script setup lang="ts">
import { getComponentForName } from "./componentMapper";

const props = defineProps(["two_column_connection"]);

const componentsA = props.two_column_connection[0].side_a.map((obj: any) => {
  // @ts-ignore
  const [[name, props]] = Object.entries(obj);
  return { name, props };
});

const componentsB = props.two_column_connection[0].side_b.map((obj: any) => {
  // @ts-ignore
  const [[name, props]] = Object.entries(obj);
  return { name, props };
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
