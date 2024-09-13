import contentstack, { QueryOperation } from "@contentstack/delivery-sdk";

type GetListItemProps = {
  contentTypeUid: "video" | "talk" | "article";
  limit?: number;
  tag?: string;
};


function replaceEditableTag(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => replaceEditableTag(item));
  }

  const newObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (key === "$") {
        newObj["editabletag"] = replaceEditableTag(obj[key] as any);
      } else {
        newObj[key] = replaceEditableTag(obj[key] as any);
      }
    }
  }
  return newObj;
}

export const useGetListItems = async ({ contentTypeUid, limit, tag }: GetListItemProps) => {
  const { data, status, refresh } = await useAsyncData(`page-${contentTypeUid}`, async () => {
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

      const mappedEntryForVue = replaceEditableTag(result.entries)
      return mappedEntryForVue;
    }
  });

  return { data, status, refresh }
}

// type GetListItemProps = {
//   contentTypeUid: "video" | "talk" | "article";
//   limit?: number;
//   tag?: string;
// };

// export const useGetListItems = async ({ contentTypeUid, limit, tag }: GetListItemProps) => {
//   const { data, status, refresh } = await useAsyncData(`page-${contentTypeUid}`, async () => {
//     const { $stack } = useNuxtApp();

//     const query = $stack.ContentType(contentTypeUid).Query()

//     if (limit) {
//       query.limit(limit)
//     }

//     query.descending("date")

//     if (tag) {
//       query.containedIn("tags", [tag])
//     }

//     const result = await query.toJSON().find()

//     if (result && result[0]) {
//       return result[0]
//     }
//   });

//   return { data, status, refresh }
// }