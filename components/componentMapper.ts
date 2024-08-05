import type { Component } from 'vue'
import NoComponent from "./NoComponent.vue";
import hero from "./contentstackHero.vue";
import richtext from "./contentstackRichtext.vue";
import videos from "./contentstackVideos.vue";
import talks from "./contentstackTalks.vue"
import articles from "./contentstackArticles.vue"
import two_columns from "./contentstackTwoColumn.vue"
import image from "./contentstackMedia.vue"
import title_block from "./contentstackTitleBlock.vue"

type Mapping = {
  [name: string]: Component
}

export const mapping: Mapping = {
  hero,
  richtext,
  videos,
  talks,
  articles,
  two_columns,
  image,
  title_block
};

export function getComponentForName(name: string) {
  return mapping[name] ?? NoComponent
}