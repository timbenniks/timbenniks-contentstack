import { QueryOperation } from "@contentstack/delivery-sdk";
import type { Header } from "~/contentstack/generated";

export const useGetNavigation = async () => {
  const { $stack } = useNuxtApp();

  // const result = await $stack
  //   .contentType("header")
  //   .entry()
  //   .includeReference("navigation_menu.link_to_page")
  //   .query()
  //   .where("uid", QueryOperation.EQUALS, "blt130e9552b62be6a1")
  //   .find<Header>();

  // return result.entries &&
  //   result.entries[0]?.navigation_menu?.map((item) => {
  //     if (!item?.link_to_page) {
  //       return;
  //     }

  //     return {
  //       copy: item.copy,
  //       url: item?.link_to_page[0]?.url,
  //     };
  // });

  const query = $stack.ContentType("header").Query()
  query.includeReference("navigation_menu.link_to_page")
  query.where("uid", "blt130e9552b62be6a1")
  const result = await query.toJSON().find()

  console.log()

  return result &&
    result[0][0]?.navigation_menu?.map((item: any) => {
      if (!item?.link_to_page) {
        return;
      }

      return {
        copy: item.copy,
        url: item?.link_to_page[0]?.url,
      };
    });
}