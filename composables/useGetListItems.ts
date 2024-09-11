// import { QueryOperation } from "@contentstack/delivery-sdk";

// type GetListItemProps = {
//   contentTypeUid: "video" | "talk" | "article";
//   limit?: number;
//   tag?: string;
// };

// export const useGetListItems = async ({ contentTypeUid, limit, tag }: GetListItemProps) => {
//   const { $stack } = useNuxtApp();

//   const query = $stack.contentType(contentTypeUid)
//     .entry()
//     .query()

//   if (limit) {
//     query.limit(limit)
//   }

//   query.orderByDescending("date")

//   if (tag) {
//     query.where("tags", QueryOperation.INCLUDES, [tag])
//   }

//   const result = await query.find()

//   if (result?.entries) {
//     return result?.entries
//   }
// }

type GetListItemProps = {
  contentTypeUid: "video" | "talk" | "article";
  limit?: number;
  tag?: string;
};

export const useGetListItems = async ({ contentTypeUid, limit, tag }: GetListItemProps) => {
  const { $stack } = useNuxtApp();

  const query = $stack.ContentType(contentTypeUid).Query()

  if (limit) {
    query.limit(limit)
  }

  query.descending("date")

  if (tag) {
    query.containedIn("tags", [tag])
  }

  const result = await query.toJSON().find()

  if (result && result[0]) {
    return result[0]
  }
}