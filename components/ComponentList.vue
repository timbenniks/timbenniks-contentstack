<script setup lang="ts">
import { getComponentForName } from "./componentMapper";

const props = defineProps({
  page: {
    type: Object,
    required: true,
  },
});

type ComponentProps =
  | string
  | number
  | boolean
  | null
  | JsonArray
  | ComponentPropsNewObject;

interface ComponentPropsNewObject {
  [key: string]: ComponentProps;
}

interface JsonArray extends Array<ComponentProps> {}

function replaceEditableTag(obj: ComponentProps): ComponentProps {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => replaceEditableTag(item));
  }

  const newObj: ComponentPropsNewObject = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (key === "$") {
        newObj["editable-tag"] = replaceEditableTag(obj[key] as any);
      } else {
        newObj[key] = replaceEditableTag(obj[key] as any);
      }
    }
  }
  return newObj;
}

const components = props.page?.components.map((obj: any) => {
  // @ts-ignore
  const [[name, props]] = Object.entries(obj);

  //return { name, props: replaceEditableTag(props) };
  return { name, props: props };
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
