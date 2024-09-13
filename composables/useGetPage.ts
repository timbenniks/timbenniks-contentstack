import contentstack, { QueryOperation } from "@contentstack/delivery-sdk";
import type { Page } from "~/contentstack/generated";

type GetPageProps = {
  url: string;
  contentTypeUid?: string;
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
        newObj["editable-tag"] = replaceEditableTag(obj[key] as any);
      } else {
        newObj[key] = replaceEditableTag(obj[key] as any);
      }
    }
  }
  return newObj;
}

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
      contentstack.Utils.addEditableTags(result.entries[0] as any, contentTypeUid || 'page', true);
      const mappedEntryForVue = replaceEditableTag(result.entries[0])
      return mappedEntryForVue;
    }
  });

  return { data, status, refresh }
}