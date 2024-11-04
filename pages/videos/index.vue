<script setup lang="ts">
const route = useRoute();
const path = route.path;

const title = computed(() => {
  let title = "";

  if (path === "/") {
    title = "home";
  } else {
    title = route.path.replace("/", "");
  }

  return title;
});

const listItemElements = [
  {
    "@type": "ListItem",
    position: 1,
    name: "home",
    item: "https://timbenniks.dev/",
  },
];

if (path !== "/") {
  listItemElements.push({
    "@type": "ListItem",
    position: 2,
    name: title.value,
    item: `https://timbenniks.dev${route.path}`,
  });
}

const { data: page } = await useGetEntryByUrl(
  "page",
  path,
  [
    "components.two_columns.two_column_connection",
    "components.two_columns.two_column_connection.side_a.faq_connector.reference",
    "components.two_columns.two_column_connection.side_b.faq_connector.reference",
    "components.two_columns.two_column_connection.side_a.timeline_connector.reference",
    "components.two_columns.two_column_connection.side_b.timeline_connector.reference",
  ],
  [],
  "en-us"
);

useJsonld({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://timbenniks.dev/#breadcrumb",
      itemListElement: listItemElements,
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
