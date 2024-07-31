import type { Component } from 'vue'
import NoComponent from "./NoComponent.vue";
import hero from "./contentstackHero.vue";
import richtext from "./contentstackRichtext.vue";

type Mapping = {
  [name: string]: Component
}

export const mapping: Mapping = {
  hero,
  richtext
};

export function getComponentForName(name: string) {
  return mapping[name] ?? NoComponent
}