import contentstack, { QueryOperation } from '@contentstack/delivery-sdk'
import type { EmbeddedItem } from '@contentstack/utils/dist/types/Models/embedded-object'
import type { LivePreviewQuery } from '@contentstack/delivery-sdk'
import { toRaw } from 'vue'
import { useAsyncData, useNuxtApp, useRoute, type AsyncData } from '#app'
import { replaceCslp, renderOption, type IStackSdk } from '../../utils'

export const useGetEntryByUrl = async <T>(options: {
  contentTypeUid: string
  url: string
  referenceFieldPath?: string[]
  jsonRtePath?: string[]
  locale?: string
  replaceHtmlCslp?: boolean
}): Promise<AsyncData<T | null, Error>> => {
  const {
    contentTypeUid,
    url,
    referenceFieldPath = [],
    jsonRtePath = [],
    locale = 'en-us',
    replaceHtmlCslp = false,
  } = options

  const { editableTags, stack, livePreviewEnabled, variantAlias, ContentstackLivePreview } = useNuxtApp().$contentstack as {
    editableTags: boolean
    stack: IStackSdk
    livePreviewEnabled: boolean
    variantAlias: { value: string },
    ContentstackLivePreview: any
  }

  if (livePreviewEnabled) {
    const route = useRoute()
    const qs = toRaw(route.query)
    stack.livePreviewQuery(qs as unknown as LivePreviewQuery)
  }

  const { data, status, refresh } = await useAsyncData(`${contentTypeUid}-${url}-${locale}-${variantAlias.value ? variantAlias.value : ''}`, async () => {
    let result: { entries: T[] } | null = null

    const entryQuery = stack.contentType(contentTypeUid)
      .entry()
      .except(['publish_details', 'updated_at', 'updated_by', '_in_progress', 'ACL', '_version', 'created_at', 'created_by'])
      .locale(locale)
      .includeFallback()
      .includeEmbeddedItems()
      .includeReference(referenceFieldPath ?? [])

    if (variantAlias && variantAlias.value !== '') {
      const variants = toRaw(variantAlias.value)

      entryQuery.addParams({ include_applied_variants: true })
      entryQuery.addParams({ include_dimension: true })
      entryQuery.variants(variants)
    }

    if (referenceFieldPath) {
      for (const path of referenceFieldPath) {
        entryQuery.includeReference(path)
      }
    }

    result = await entryQuery.query()
      .equalTo('url', url)
      .find() as { entries: T[] }

    const data = result?.entries?.[0] as EmbeddedItem

    // any json rte fields in the data?
    if (jsonRtePath && data) {
      contentstack.Utils.jsonToHTML({
        entry: data,
        paths: jsonRtePath,
        renderOption
      })
    }

    if (editableTags) {
      contentstack.Utils.addEditableTags(data, contentTypeUid, true, locale)
    }

    let finalData
    if (replaceHtmlCslp) {
      finalData = replaceCslp(data)
    }
    else {
      finalData = data
    }

    // find sub queries for components in the data of the page.
    const queries: any = [];
    data.components && data.components.forEach((element: any) => {
      // @ts-ignore
      const [name, props] = Object.entries(element)[0];

      // if the components have a query field, do a sub query
      if (props && props?.query) {
        const type = name.slice(0, -1); // can be video, talk, article
        const query = stack.contentType(type)
          .entry()
          .except(['locale', 'body', 'content', 'tags', 'tocs', 'faqs', 'publish_details', 'updated_at', 'updated_by', '_in_progress', 'ACL', '_version', 'created_at', 'created_by'])
          .query()
          .orderByDescending("date")

        if (props.query.limit) {
          query.limit(props.query.limit)
        }

        if (props.query.tag) {
          query.where("tags", QueryOperation.INCLUDES, [props.query.tag])
        }

        queries.push({ type, promise: query.find() })
      }
    })

    const subQueryResults = await Promise.all(queries.map((q: any) => q.promise));
    const subQueryResultsWithTypes = subQueryResults.map((result, index) => ({
      contentTypeUid: queries[index].type,
      entries: result.entries
    }));

    let finalSubQueryResults

    // add editable tags to the sub queries
    if (editableTags) {
      finalSubQueryResults = subQueryResultsWithTypes.map(queryResult => {
        queryResult.entries.map((entry: any) => {
          contentstack.Utils.addEditableTags(entry as any, queryResult.contentTypeUid, true);
        })

        return {
          ...queryResult,
          entries: replaceHtmlCslp ? replaceCslp(queryResult.entries) : queryResult.entries
        }
      })
    }
    else {
      finalSubQueryResults = subQueryResultsWithTypes
    }

    const componentsAndSubQueryData = finalData.components.map((component: any) => {
      const keys = Object.keys(component);
      const matchingKey = keys.find(key =>
        key === 'videos' || key === 'talks' || key === 'articles'
      );

      if (matchingKey) {
        const contentType = matchingKey === 'videos' ? 'video' :
          matchingKey === 'talks' ? 'talk' :
            matchingKey === 'articles' ? 'article' : null;

        const queryTag = component[matchingKey].query.tag;

        const matchingSubQuery = finalSubQueryResults.find(
          subQuery => subQuery.contentTypeUid === contentType &&
            subQuery.entries.some((entry: any) => entry.subject === queryTag)
        );

        if (matchingSubQuery) {
          const filteredEntries = matchingSubQuery.entries.filter((entry: any) => entry.subject === queryTag);
          return {
            ...component,
            [matchingKey]: {
              ...component[matchingKey],
              subQueryData: filteredEntries
            }
          };
        }
      }

      return component;
    });

    finalData.components = componentsAndSubQueryData;

    return finalData
  })

  if (livePreviewEnabled) {
    if (import.meta.client) {
      ContentstackLivePreview && ContentstackLivePreview.onEntryChange(refresh)
    }
  }

  // @ts-expect-error doesnt export all useAsyncData props
  return { data, status, refresh }
}
