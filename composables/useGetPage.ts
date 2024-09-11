import { QueryOperation } from "@contentstack/delivery-sdk";
import type { Page } from "~/contentstack/generated";

type GetPageProps = {
  url: string;
  contentTypeUid?: string;
  cacheBust?: number
};

export const useGetPage = async ({ url, contentTypeUid, cacheBust }: GetPageProps) => {
  const { data, status, error, refresh, clear } = await useAsyncData(`page-${url}-${cacheBust}`, async () => {
    const { $stack } = useNuxtApp();
    const result = await $stack.contentType(contentTypeUid || 'page')
      .entry()
      .includeReference("components.two_columns.two_column_connection")
      .query()
      .where("url", QueryOperation.EQUALS, url)
      .find<Page>();

    if (result?.entries) {
      return result.entries[0] as Page;
    }
  });

  return { data, status, error, refresh, clear }
}