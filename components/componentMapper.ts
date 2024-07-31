import type { Component } from 'vue'
import NoComponent from "./NoComponent.vue";
import hero from "./contentstackHero.vue";
import richtext from "./contentstackRichtext.vue";
import videos from "./contentstackVideos.vue";
import talks from "./contentstackTalks.vue"

type Mapping = {
  [name: string]: Component
}

export const mapping: Mapping = {
  hero,
  richtext,
  videos,
  talks
};

export function getComponentForName(name: string) {
  return mapping[name] ?? NoComponent
}