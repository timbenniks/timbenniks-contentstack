import contentstack, { QueryOperation } from "@contentstack/delivery-sdk";
import { replaceCslp } from "~/helpers"

type GetListItemProps = {
  contentTypeUid: "video" | "talk" | "article";
  limit?: number;
  tag?: string;
};

export const useGetListItems = async ({ contentTypeUid, limit, tag }: GetListItemProps) => {
  const { data, status, refresh } = await useAsyncData(`page-${contentTypeUid}-${limit}-${tag ? tag : ''}`, async () => {
    const { $stack } = useNuxtApp();

    const query = $stack.contentType(contentTypeUid)
      .entry()
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
      result.entries.map((entry) => {
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