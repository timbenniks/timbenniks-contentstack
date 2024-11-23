import contentstack, { QueryOperation } from "@contentstack/delivery-sdk";
import { replaceCslp } from "../../../../helpers"
import type { IStackSdk } from "@contentstack/live-preview-utils";

type GetListItemProps = {
  contentTypeUid: "video" | "talk" | "article";
  limit?: number;
  tag?: string;
  subQueryData?: any;
};

export const useGetListItems = async ({ contentTypeUid, limit, tag, subQueryData }: GetListItemProps) => {
  const { editableTags, livePreviewEnabled } = useNuxtApp().$contentstack as {
    editableTags: boolean
    livePreviewEnabled: boolean
  }

  if (subQueryData) {
    return { data: subQueryData }
  }

  const { data, status, refresh } = await useAsyncData(`page-${contentTypeUid}-${limit}-${tag ? tag : ''}`, async () => {
    const { stack } = useNuxtApp().$contentstack as { stack: IStackSdk };

    const query = stack.contentType(contentTypeUid)
      .entry()
      .except(['locale', 'body', 'content', 'tags', 'tocs', 'faqs', 'publish_details', 'updated_at', 'updated_by', '_in_progress', 'ACL', '_version', 'created_at', 'created_by'])
      .query()

    if (limit) {
      query.limit(limit)
    }

    query.orderByDescending("date")

    if (tag) {
      query.where("tags", QueryOperation.INCLUDES, [tag])
    }

    const result = await query.find()

    if (result?.entries) {
      livePreviewEnabled && editableTags && result.entries.map((entry) => {
        contentstack.Utils.addEditableTags(entry as any, contentTypeUid, true);
      })

      const mappedEntryForVue = replaceCslp(result.entries)
      return mappedEntryForVue;
    }

    else {
      return []
    }
  });

  return { data, status, refresh }
}