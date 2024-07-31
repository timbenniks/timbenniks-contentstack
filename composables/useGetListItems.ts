import { QueryOperation } from "@contentstack/delivery-sdk";

type GetListItemProps = {
  contentTypeUid?: string;
  limit: number;
  tag?: string;
};

export const useGetListItems = async ({ contentTypeUid, limit, tag }: GetListItemProps) => {
  const { $stack } = useNuxtApp();

  const query = $stack.contentType(contentTypeUid || 'video')
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
    return result?.entries
  }
}