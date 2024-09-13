import { QueryOperation } from "@contentstack/delivery-sdk";
import type { Page } from "~/contentstack/generated";
// import contentstack from "contentstack"
// contentstack.Utils.addEditableTags();

type GetPageProps = {
  url: string;
  contentTypeUid?: string;
};

export const useGetPage = async ({ url, contentTypeUid }: GetPageProps) => {
  const { data, status, refresh } = await useAsyncData(`page-${url}`, async () => {
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

    // const query = $stack.ContentType(contentTypeUid || "page").Query()
    // query.includeReference("components.two_columns.two_column_connection")
    // query.where("url", url)

    // const result = await query.toJSON().find()

    // contentstack.Utils.addEditableTags(result[0][0], "page", true);

    // return result[0][0]
  });

  return { data, status, refresh }
}