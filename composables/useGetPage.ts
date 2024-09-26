import contentstack, { QueryOperation } from "@contentstack/delivery-sdk";
import type { Page } from "~/contentstack/generated";
import { replaceCslp } from "~/helpers"

type GetPageProps = {
  url: string;
  contentTypeUid?: string;
};

export const useGetPage = async ({ url, contentTypeUid }: GetPageProps) => {
  const { data, status, refresh } = await useAsyncData(`page-${url}`, async () => {
    const { $stack } = useNuxtApp();

    const result = await $stack.contentType(contentTypeUid || 'page')
      .entry()
      .includeReference([
        "components.two_columns.two_column_connection",
        "components.two_columns.two_column_connection.side_a.faq_connector.reference",
        "components.two_columns.two_column_connection.side_b.faq_connector.reference",
        "components.two_columns.two_column_connection.side_a.timeline_connector.reference",
        "components.two_columns.two_column_connection.side_b.timeline_connector.reference"
      ])
      .query()
      .where("url", QueryOperation.EQUALS, url)
      .find<Page>();

    if (result?.entries) {
      contentstack.Utils.addEditableTags(result.entries[0] as any, contentTypeUid || 'page', true);
      const mappedEntryForVue = replaceCslp(result.entries[0])
      return mappedEntryForVue;
    }
    else {
      return []
    }
  });

  return { data, status, refresh }
}