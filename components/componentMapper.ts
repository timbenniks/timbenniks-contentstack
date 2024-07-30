import type { Component } from 'vue'
import NoComponent from "./NoComponent.vue";
import hero from "./contentstackHero.vue";

type Mapping = {
  [name: string]: Component
}

export const mapping: Mapping = {
  hero,
};

export function getComponentForName(name: string) {
  return mapping[name] ?? NoComponent
}