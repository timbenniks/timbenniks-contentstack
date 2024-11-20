<script setup lang="ts">
import { format } from "date-fns";
import contentstack, { QueryOperation } from "@contentstack/delivery-sdk";
import { replaceCslp } from ".././../helpers";
import type { Article } from "~/contentstack/generated";

useHead({
  script: [
    {
      type: "module",
      defer: true,
      src: "/youtube.js",
      tagPosition: "bodyClose",
    },
    {
      type: "module",
      defer: true,
      src: "/questionnaire-cms.js",
      tagPosition: "bodyClose",
    },
  ],
});

const route = useRoute();
const slug = route.params.slug && route.params.slug[0];

const { data: post } = await useGetEntryByUrl<Article>({
  contentTypeUid: "article",
  url: `/writing/${slug}`,
  referenceFieldPath: ["faqs"],
  jsonRtePath: ["content"],
  locale: "en-us",
  replaceHtmlCslp: true,
});

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
    name: "writing",
    item: `https://timbenniks.dev/writing`,
  },
  {
    "@type": "ListItem",
    position: 3,
    name: slug && slug.replaceAll("-", " "),
    item: `https://timbenniks.dev/writing/${slug}`,
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
      "@type": "BlogPosting",
      headline: post.value?.title ?? "",
      image: post.value?.image ?? "",
      keywords: post.value?.tags?.join(", ") ?? "",
      mainEntityOfPage: `https://timbenniks.dev/writing/${slug}`,
      url: `https://timbenniks.dev/writing/${slug}`,
      datePublished: post.value?.date ?? "",
      dateCreated: post.value?.date ?? "",
      dateModified: post.value?.date ?? "",
      description: post.value?.description ?? "",
      timeRequired: `PT${
        post.value?.reading_time?.split(" min read")[0] ?? "0"
      }M`,
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
    },
  ],
});

useSeoMeta({
  googleSiteVerification: "hif_cn9hF2RVSnTq5HwjSkKrXqJT9Q6BR_FaBBmr-20",
  algoliaSiteVerification: "315ACC06D73AB3EA",
  titleTemplate: "%s - Tim Benniks",
  description: post.value?.description,
  title: post.value?.title,
  ogImage: post.value?.image,
});

const { data: relatedPosts } = await useAsyncData(
  `related-${route.path}`,
  async () => {
    if (!post.value || !post.value.tags) return [];

    const { stack } = useNuxtApp().$contentstack as { stack: any };

    const { entries } = await stack
      .contentType("article")
      .entry()
      .query()
      .where("uid", QueryOperation.NOT_EQUALS, post.value.uid)
      .containedIn("tags", post.value.tags)
      .limit(3)
      .find();

    entries.map((entry: Article) => {
      contentstack.Utils.addEditableTags(entry as any, "article", true);
    });

    const mappedEntries = replaceCslp(entries);

    const result = mappedEntries.map((entry: Article) => {
      return {
        uid: entry.uid,
        title: entry.title,
        url: entry.url,
        image: entry.image,
        reading_time: entry.reading_time,
        description: entry.description,
        cslp: {
          title: {
            ...entry.cslp.title,
          },
          image: {
            ...entry.cslp.image,
          },
          description: {
            ...entry.cslp.description,
          },
          reading_time: {
            ...entry.cslp.reading_time,
          },
        },
      };
    });

    return result;
  }
);

const { livePreviewEnabled } = useNuxtApp().$contentstack as {
  livePreviewEnabled: boolean;
};

const faqs = computed(() => {
  let result: any[] = [];

  post.value &&
    post.value?.faqs &&
    post.value?.faqs[0]?.qas.map((qa) => {
      result.push({
        question: qa.qa.question,
        answer: qa.qa.answer,
        wrapperCslp: qa.cslp.qa,
        innerCslp: qa.qa.cslp,
      });
    });

  return result;
});
</script>

<template>
  <div class="p-8 md:p-0 md:pb-12">
    <Head>
      <Meta name="keywords" :content="post?.tags.join(', ')" />
    </Head>

    <Head v-if="post?.canonical_url">
      <Link rel="canonical" :href="post.canonical_url" />
    </Head>

    <div class="max-w-screen-lg mx-auto">
      <header class="mb-4">
        <p class="mb-12">
          <nuxt-link
            to="/writing"
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
            All posts
          </nuxt-link>
        </p>
        <h1
          class="font-bold mb-4 text-3xl md:text-5xl !leading-tight"
          v-bind="post.cslp && post?.cslp.title"
        >
          {{ post?.title }}
        </h1>

        <p class="text-sm mb-2">
          Published on
          <time
            v-if="post?.date"
            :datetime="format(new Date(post.date), 'MMM dd, yyyy')"
            v-bind="post.cslp && post?.cslp.date"
            >{{ format(new Date(post.date), "MMM dd, yyyy") }}</time
          >
        </p>

        <ul
          class="flex space-x-2"
          v-if="post?.tags"
          v-bind="post?.cslp && post?.cslp.tags"
        >
          <li
            v-for="(tag, index) in post.tags"
            :key="tag"
            class="tag"
            v-bind="post?.cslp && post?.cslp[`tags__${index}`]"
          >
            {{ tag }}
          </li>
        </ul>
      </header>

      <section class="flex gap-12 flex-col lg:flex-row">
        <article
          class="prose prose-invert lg:prose-lg prose-headings:font-bold"
        >
          <!-- <pre>{{ post?.content }}</pre> -->
          <div
            v-if="post?.content && post?.body"
            v-html="post?.content"
            v-bind="post?.cslp && post?.cslp.content"
          />

          <div
            v-if="!post?.content && post?.body"
            v-html="post?.body"
            v-bind="post?.cslp && post?.cslp.body"
          />

          <p
            class="text-xs mt-4 mb-12 text-slate-300"
            v-if="post?.canonical_url"
          >
            Originally published at:
            <a
              class="text-slate-300"
              :href="post?.canonical_url"
              target="_blank"
              v-bind="post?.cslp && post?.cslp.canonical_url"
              >{{ post?.canonical_url }}</a
            >
          </p>
        </article>
        <aside>
          <div class="sticky top-24">
            <p class="text-xs text-slate-400 mb-2 uppercase mt-8">Written by</p>
            <div class="flex items-center gap-2">
              <img
                loading="lazy"
                src="https://res.cloudinary.com/dwfcofnrd/image/upload/q_auto,f_auto,w_96,h_96,c_thumb/Tim/tim_aug_2023.png"
                alt="Tim Benniks"
                width="48"
                height="48"
                class="w-10 h-10 rounded-full"
              />
              Tim Benniks
            </div>
            <NuxtImg
              v-if="post?.image"
              provider="cloudinaryFetch"
              :src="post.image"
              :alt="post.title"
              width="1920"
              height="1080"
              fit="cover"
              loading="eager"
              sizes="sm:30vw"
              fetchpriority="high"
              class="my-8 fancy-image-alt"
            />

            <p
              class="mb-4 text-xs max-w-96 break-words"
              v-if="livePreviewEnabled"
            >
              <span class="text-slate-400 block"
                >Edit image URL in visual builder</span
              >
              <span v-bind="post?.cslp && post?.cslp.image">{{
                post?.image
              }}</span>
            </p>

            <p
              class="font-bold text-[#db97bf] mb-2"
              v-if="post?.reading_time"
              v-bind="post?.cslp && post?.cslp.reading_time"
            >
              {{ post.reading_time }}
            </p>

            <ul
              v-if="post?.tocs"
              class="bg-[#0e1029] p-8 pb-2"
              v-bind="post.cslp && post?.cslp.tocs"
            >
              <li
                v-for="(item, index) in post.tocs"
                :key="item.toc.html_id"
                class="mb-6"
              >
                <a
                  class="hover:underline text-slate-200"
                  :href="`#${item.toc.html_id}`"
                  v-bind="post.cslp && post?.cslp[`tocs__${index}`]"
                  >{{ item.toc.text }}</a
                >
              </li>
            </ul>
          </div>
        </aside>
      </section>

      <div class="my-12" v-if="relatedPosts.length">
        <h3 class="title inline-block mb-4">Related writing</h3>
        <ul class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article-card
            v-for="article in relatedPosts"
            :article="article"
            :key="article.id"
            :small="false"
            :featured="false"
            :cslp="article.cslp"
          />
        </ul>
      </div>

      <faq
        v-bind="post?.cslp && post?.cslp.faqs"
        v-if="faqs.length > 0"
        :faqs="faqs"
        :big="false"
        title="Frequently asked questions"
      />
    </div>
  </div>
</template>
