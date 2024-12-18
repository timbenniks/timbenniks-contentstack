import type { Component } from 'vue'

import NoComponent from "./components/NoComponent.vue";
import hero from "./components/contentstackHero.vue";
import richtext from "./components/contentstackRichtext.vue";
import videos from "./components/contentstackVideos.vue";
import talks from "./components/contentstackTalks.vue"
import articles from "./components/contentstackArticles.vue"
import two_columns from "./components/contentstackTwoColumn.vue"
import image from "./components/contentstackMedia.vue"
import title_block from "./components/contentstackTitleBlock.vue"
import faq_connector from "./components/contentstackFaq.vue"
import timeline_connector from "./components/contentstackTimeline.vue"
import speaker_details from "./components/contentstackSpeakerDetails.vue"
import speaker_media from "./components/contentstackSpeakerMedia.vue"

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
  title_block,
  faq_connector,
  timeline_connector,
  speaker_details,
  speaker_media
};

export function getComponentForName(name: string) {
  return mapping[name] ?? NoComponent
}

interface ComponentEntry {
  [key: string]: {
    [key: string]: any;
  };
}

export function mapComponentsToKV(components: ComponentEntry[]) {
  return components.map((obj: any) => {
    const entries = Object.entries(obj);
    const componentNameAndProps = entries && entries[0]

    let name = ""
    let props = null

    if (componentNameAndProps && componentNameAndProps[0]) {
      name = componentNameAndProps[0]
    }

    if (componentNameAndProps && componentNameAndProps[1]) {
      props = componentNameAndProps[1]
    }

    return { name, props };
  });
}

export { replaceCslp } from './modules/contentstack/utils';
