import { QueryOperation } from "@contentstack/delivery-sdk";
import type { BaseEntry } from "@contentstack/delivery-sdk";

type GetPageProps = {
  url: string;
  contentTypeUid?: string;
};

interface PageEntry extends BaseEntry {
  url: string;
  seo: {
    image: string;
    description: string;
    keywords: string[];
  };
  components: [any];
}

export const useGetPage = async ({ url, contentTypeUid }: GetPageProps) => {
  const { $stack } = useNuxtApp();

  const result = await $stack.contentType(contentTypeUid || 'page')
    .entry()
    .query()
    .where("url", QueryOperation.EQUALS, url)
    .find<PageEntry>();

  if (result?.entries) {
    return result?.entries[0]
  }
}