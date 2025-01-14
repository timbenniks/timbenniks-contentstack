<script setup lang="ts">
import type { Page } from "~/contentstack/generated";

const route = useRoute();
const path = route.path;

const { data: page } = await useGetEntryByUrl<Page>({
  contentTypeUid: "page",
  url: path,
  referenceFieldPath: [
    "components.two_columns.two_column_connection",
    "components.two_columns.two_column_connection.side_a.faq_connector.reference",
    "components.two_columns.two_column_connection.side_b.faq_connector.reference",
    "components.two_columns.two_column_connection.side_a.timeline_connector.reference",
    "components.two_columns.two_column_connection.side_b.timeline_connector.reference",
  ],
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
    item: `https://timbenniks.dev${route.path}`,
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

useSeoMeta({
  googleSiteVerification: "hif_cn9hF2RVSnTq5HwjSkKrXqJT9Q6BR_FaBBmr-20",
  algoliaSiteVerification: "315ACC06D73AB3EA",
  titleTemplate: "%s - Tim Benniks",
  description: page.value?.seo?.description,
  title: page.value?.title,
  ogImage: page.value?.seo?.image.secure_url,
});
</script>
<template>
  <ComponentList v-if="page" :page="page" />
</template>
