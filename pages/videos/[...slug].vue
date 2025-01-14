<script setup lang="ts">
import contentstack, { QueryOperation } from "@contentstack/delivery-sdk";
import { format } from "date-fns";
import type { Video } from "~/contentstack/generated";
import { replaceCslp } from "~/modules/contentstack/utils";

useHead({
  script: [
    {
      type: "module",
      defer: true,
      src: "/youtube.js",
      tagPosition: "bodyClose",
    },
  ],
});

const route = useRoute();
const slug = route.params.slug && route.params.slug[0];

const { data: video } = await useGetEntryByVideoId<Video>({
  videoId: slug as string,
  replaceHtmlCslp: true,
});

const { data: relatedVideos } = await useAsyncData(
  `related-videos-${slug}`,
  async () => {
    if (!video.value || !video.value.tags) return [];

    const { stack } = useNuxtApp().$contentstack as { stack: any };

    const query = stack
      .contentType("video")
      .entry()
      .except([
        "publish_details",
        "updated_at",
        "updated_by",
        "_in_progress",
        "ACL",
        "_version",
        "created_at",
        "created_by",
        "tags",
      ])
      .query()
      .where("uid", QueryOperation.NOT_EQUALS, video.value.uid)
      .containedIn("tags", video.value.tags)
      .limit(3);

    const { entries } = await query.find();

    entries.map((entry: Video) => {
      contentstack.Utils.addEditableTags(entry as any, "video", true);
    });

    const mappedEntries = replaceCslp(entries);

    const result = mappedEntries.map((video: Video) => {
      return {
        video,
        small: false,
        featured: false,
      };
    });

    return result;
  }
);

const listItemElements = [
  {
    "@type": "ListItem",
    position: 1,
    name: "home",
    item: "https://timbenniks.dev/",
  },
  {
    "@type": "ListItem",
    position: 2,
    name: "videos",
    item: `https://timbenniks.dev/videos`,
  },
  {
    "@type": "ListItem",
    position: 3,
    name: slug && slug.replaceAll("-", " "),
    item: `https://timbenniks.dev/videos/${slug}`,
  },
];

useJsonld({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://timbenniks.dev/#breadcrumb",
      itemListElement: listItemElements as any,
    },
  ],
});

useJsonld({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "VideoObject",
      name: video.value?.title ?? "",
      description: video.value?.description ?? "",
      thumbnailUrl: video.value?.image ?? "",
      uploadDate: video.value?.date ?? "",
      contentUrl: `https://timbenniks.dev/videos/${slug}`,
      embedUrl: `https://timbenniks.dev/videos/${slug}`,
      keywords: video.value?.tags?.join(", ") ?? "",
      author: {
        "@type": "Person",
        "@id": "https://timbenniks.dev/about#Person",
        name: "Tim Benniks",
        url: "https://timbenniks.dev/",
        image: {
          "@type": "ImageObject",
          "@id":
            "https://res.cloudinary.com/dwfcofnrd/image/upload/q_auto,f_auto,w_96,h_96,c_thumb/Tim/tim_aug_2023.png",
          url: "https://res.cloudinary.com/dwfcofnrd/image/upload/q_auto,f_auto,w_96,h_96,c_thumb/Tim/tim_aug_2023.png",
          width: "96",
          height: "96",
        },
      },
      publisher: {
        "@type": "Organization",
        name: "Tim Benniks",
        logo: {
          "@type": "ImageObject",
          url: "https://res.cloudinary.com/dwfcofnrd/image/upload/q_auto,f_auto,w_96,h_96,c_thumb/Tim/tim_aug_2023.png",
          width: "96",
          height: "96",
        },
      },
    },
  ],
});

useSeoMeta({
  googleSiteVerification: "hif_cn9hF2RVSnTq5HwjSkKrXqJT9Q6BR_FaBBmr-20",
  titleTemplate: "%s - Tim Benniks",
  description: video.value?.description,
  title: video.value?.title,
  ogImage: video.value?.image,
  keywords: video.value?.tags?.join(", "),
});
</script>

<template>
  <div class="p-8 md:p-0 md:pb-12">
    <Head>
      <Meta name="keywords" :content="video?.tags.join(', ')" />
    </Head>

    <div class="max-w-screen-lg mx-auto">
      <header class="mb-4">
        <p class="mb-12">
          <nuxt-link
            to="/videos"
            class="flex items-center space-x-4 uppercase !no-underline"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M15.8332 10.0003H4.1665M4.1665 10.0003L9.99984 15.8337M4.1665 10.0003L9.99984 4.16699"
                stroke="CurrentColor"
                stroke-width="1.67"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            All videos
          </nuxt-link>
        </p>
        <h1
          class="font-bold mb-4 text-3xl md:text-5xl !leading-tight"
          v-bind="video.cslp && video?.cslp.title"
        >
          {{ video?.title }}
        </h1>

        <p class="text-sm mb-2">
          Published on
          <time
            v-if="video?.date"
            :datetime="format(new Date(video.date), 'MMM dd, yyyy')"
            v-bind="video.cslp && video?.cslp.date"
            >{{ format(new Date(video.date), "MMM dd, yyyy") }}</time
          >
        </p>

        <ul
          class="flex space-x-2"
          v-if="video?.tags"
          v-bind="video?.cslp && video?.cslp.tags"
        >
          <li
            v-for="(tag, index) in video.tags"
            :key="tag"
            class="tag"
            v-bind="video?.cslp && video?.cslp[`tags__${index}`]"
          >
            {{ tag }}
          </li>
        </ul>
      </header>

      <section>
        <lite-youtube v-if="video" :videoid="video.videoid"></lite-youtube>

        <div class="my-12" v-if="relatedVideos">
          <h3 class="title inline-block mb-4">Related</h3>
          <ul class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <video-card
              v-for="relatedVideo in relatedVideos"
              :video="relatedVideo.video"
              :key="relatedVideo.video.videoid"
              :small="false"
              :featured="false"
              :cslp="relatedVideo.video.cslp"
            />
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
