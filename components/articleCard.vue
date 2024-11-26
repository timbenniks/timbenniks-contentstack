<script setup lang="ts">
defineProps(["article", "small", "featured", "cslp"]);

const { livePreviewEnabled } = useNuxtApp().$contentstack as {
  livePreviewEnabled: boolean;
};

function parseImage(imageUrl: string) {
  let provider = "cloudinaryNative";
  let url = null;

  if (imageUrl?.includes("cloudinary")) {
    const id = imageUrl.split(
      "https://res.cloudinary.com/dwfcofnrd/image/upload/"
    )[1];

    provider = "cloudinaryNative";
    url = id;
  } else {
    provider = "cloudinaryFetch";
    url = imageUrl;
  }

  return {
    url,
    provider,
  };
}

function getCSImageVersion(thumbnail: any) {
  const {
    deliverySdkOptions: { apiKey },
    assetHost,
  } = useRuntimeConfig().public.contentstack;

  const assetuid = thumbnail?.uid;
  const url = thumbnail?.url;
  const src = thumbnail?.filename;

  const baseStr = url.split(src)[0];
  const versionuid = baseStr.split(
    `https://${assetHost}/${apiKey}/${assetuid}/`
  )[1];

  return versionuid.slice(0, -1);
}
</script>

<template>
  <li :class="featured ? 'mb-12' : 'mb-4'">
    <NuxtLink
      :to="article.url"
      class="md:flex"
      :class="small || featured ? 'md:flex-row md:space-x-4' : 'flex-col'"
    >
      <Image
        v-if="article?.thumbnail"
        v-bind="cslp?.thumbnail"
        provider="contentstack"
        :src="article?.thumbnail?.filename"
        :quality="90"
        :width="featured ? 1280 : 700"
        :height="featured ? 720 : 394"
        fit="fill"
        :alt="`Poster image for: ${article.title}` || ''"
        format="pjpg"
        sizes="sm:400px md:800px"
        :modifiers="{
          assetuid: article?.thumbnail?.uid,
          auto: 'avif',
          versionuid: getCSImageVersion(article?.thumbnail),
        }"
        :loading="featured ? 'eager' : 'lazy'"
        :fetchpriority="featured ? 'high' : 'auto'"
        class="w-full mb-2"
        :class="{
          'md:w-64': small,
          'w-full md:w-3/5 lg:w-[800px] lg:h-[450px] fancy-image-alt': featured,
          'fancy-image': !featured,
        }"
      />

      <Image
        v-else
        fit="thumb"
        :provider="parseImage(article.image).provider"
        :src="parseImage(article.image).url"
        :alt="`Poster image for: ${article.title}` || ''"
        class="w-full mb-2"
        :class="{
          'md:w-64': small,
          'w-full md:w-3/5 lg:w-[800px] lg:h-[450px] fancy-image-alt': featured,
          'fancy-image': !featured,
        }"
        :sizes="featured ? 'sm:800px' : 'sm:350px'"
        :width="featured ? 1280 : 350"
        :height="featured ? 720 : 197"
        :loading="featured ? 'eager' : 'lazy'"
        :fetchpriority="featured ? 'high' : 'auto'"
      />

      <div>
        <p
          class="font-bold"
          :class="
            featured ? 'text-3xl mb-2 line-clamp-3' : 'text-xl line-clamp-2'
          "
          v-bind="cslp?.title"
        >
          {{ article.title }}
        </p>

        <p
          v-if="small || featured"
          class="text-slate-400 text-sm"
          :class="{ 'line-clamp-2': small }"
          v-bind="cslp?.description"
        >
          {{ article.description }}
        </p>
        <p
          v-if="!featured"
          class="text-sm font-bold text-[#db97bf] mt-1"
          v-bind="cslp?.reading_time"
        >
          {{ article.reading_time }}
        </p>

        <template v-if="featured">
          <p class="text-xs text-slate-400 mb-2 uppercase mt-8">Written by</p>
          <div class="flex items-center gap-2">
            <img
              loading="lazy"
              src="https://res.cloudinary.com/dwfcofnrd/image/upload/q_auto,f_auto,w_96,h_96,c_thumb/Tim/tim_aug_2023.png"
              alt="Tim Benniks"
              width="48"
              height="48"
              class="w-12 h-12 rounded-full"
            />
            <p class="flex flex-col">
              <span>Tim Benniks</span>
              <span class="text-sm text-[#db97bf]" v-bind="cslp?.reading_time">
                {{ article.reading_time }}
              </span>
            </p>
          </div>
        </template>
      </div>
    </NuxtLink>
    <p
      class="my-4 text-xs break-all"
      v-if="livePreviewEnabled && !article?.thumbnail"
    >
      <span class="text-slate-400 block">Edit image URL in visual builder</span>
      <span v-bind="cslp && cslp?.image"
        >https://res.cloudinary.com/dwfcofnrd/image/upload/{{
          parseImage(article.image).url
        }}</span
      >
    </p>
  </li>
</template>
