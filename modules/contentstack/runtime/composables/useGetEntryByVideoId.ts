import contentstack from '@contentstack/delivery-sdk'
import type { EmbeddedItem } from '@contentstack/utils/dist/types/Models/embedded-object'
import type { LivePreviewQuery } from '@contentstack/delivery-sdk'
import { toRaw } from 'vue'
import { useAsyncData, useNuxtApp, useRoute, type AsyncData } from '#app'
import { replaceCslp, type IStackSdk } from '../../utils'

export const useGetEntryByVideoId = async <T>(options: {
  videoId: string
  replaceHtmlCslp?: boolean
}): Promise<AsyncData<T | null, Error>> => {
  const {
    videoId,
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

  const { data, status, refresh } = await useAsyncData(`video-${videoId}`, async () => {
    let result: { entries: T[] } | null = null

    const entryQuery = stack.contentType('video')
      .entry()
      .except(['publish_details', 'updated_at', 'updated_by', '_in_progress', 'ACL', '_version', 'created_at', 'created_by'])
      .locale('en-us')

    result = await entryQuery.query()
      .equalTo('videoid', videoId)
      .find() as { entries: T[] }

    const data = result?.entries?.[0] as EmbeddedItem

    if (editableTags) {
      contentstack.Utils.addEditableTags(data, 'video', true, 'en-us')
    }

    let finalData
    if (replaceHtmlCslp) {
      finalData = replaceCslp(data)
    }
    else {
      finalData = data
    }

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
