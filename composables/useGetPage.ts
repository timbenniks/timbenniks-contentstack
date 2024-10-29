import contentstack, { QueryOperation } from "@contentstack/delivery-sdk";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import type { Page } from "~/contentstack/generated";
import { replaceCslp } from "~/helpers"

type GetPageProps = {
  url: string;
  contentTypeUid?: string;
};

export const useGetPage = async ({ url, contentTypeUid }: GetPageProps) => {
  const { $stack } = useNuxtApp();
  const { preview } = useNuxtApp().$config.public;

  const { data, status, refresh } = await useAsyncData(`${contentTypeUid}-${url}`, async () => {

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
      return replaceCslp(result.entries[0])
    }
    else {
      return []
    }
  });

  if (preview && import.meta.client) {
    ContentstackLivePreview.onEntryChange(refresh)
  }

  return { data, status, refresh }
}