import contentstack from '@contentstack/delivery-sdk'
import type { Plugin } from 'nuxt/app'
import Personalize from '@contentstack/personalize-edge-sdk'
import type { LivePreviewSdkOptions, DeliverySdkOptions, PersonalizeSdkOptions, IStackSdk } from '../utils'
import { defineNuxtPlugin, useState, useRequestEvent } from '#app'

const contentstackPlugin: Plugin = async (_nuxtApp) => {
  // @ts-expect-error Region is seen as String rather than Region...
  const { deliverySdkOptions, livePreviewSdkOptions, personalizeSdkOptions }: {
    deliverySdkOptions: DeliverySdkOptions
    livePreviewSdkOptions: LivePreviewSdkOptions
    personalizeSdkOptions: PersonalizeSdkOptions
  } = _nuxtApp.$config.public.contentstack

  const stack = contentstack.stack(deliverySdkOptions)
  const livePreviewEnabled = deliverySdkOptions?.live_preview?.enable
  const { editableTags } = livePreviewSdkOptions
  const { enable: personalizationEnabled, host: personalizationHost, projectUid: personalizationProjectUid } = personalizeSdkOptions

  let livePreviewSdk
  let emptyBlockClass

  if (livePreviewEnabled && import.meta.client) {
    const { default: ContentstackLivePreview, VB_EmptyBlockParentClass } = await import('@contentstack/live-preview-utils')

    livePreviewSdk = ContentstackLivePreview
    emptyBlockClass = VB_EmptyBlockParentClass

    livePreviewSdk.init({
      ...livePreviewSdkOptions,
      stackSdk: stack.config as IStackSdk,
      stackDetails: {
        apiKey: deliverySdkOptions.apiKey,
        environment: deliverySdkOptions.environment,
      },
    })
  }

  const variantAlias = useState('variantAlias', () => '')

  if (personalizationEnabled && personalizationProjectUid) {
    Personalize.setEdgeApiUrl(`https://${personalizationHost}`)
    Personalize.init(personalizationProjectUid)

    if (import.meta.server) {
      const event = useRequestEvent()
      variantAlias.value = event?.context.p13n
    }
  }

  if (livePreviewEnabled) {
    _nuxtApp.hook('page:finish', () => {
      refreshNuxtData();
    });
  }

  return {
    provide: {
      contentstack: {
        livePreviewEnabled,
        editableTags,
        stack,
        ContentstackLivePreview: livePreviewSdk || null,
        VB_EmptyBlockParentClass: emptyBlockClass || null,
        Personalize,
        variantAlias,
      },
    },
  }
}

export default defineNuxtPlugin(contentstackPlugin)
