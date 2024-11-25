import { joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'
import { createOperationsGenerator } from '#image'

const operationsGenerator = createOperationsGenerator({
  keyMap: {
    width: 'width',
    height: 'height',
    quality: 'quality',
    assetuid: 'assetuid',
    versionuid: 'versionuid',
    auto: 'auto',
  },
  valueMap: {
    fit: {
      fill: 'crop',
      inside: 'crop',
      outside: 'crop',
      cover: 'bounds',
      contain: 'bounds',
    },
  },
  joinWith: '&',
  formatter: (key, value) => `${key}=${value}`,
})

export const getImage: ProviderGetImage = (src, { modifiers = {}, baseURL = '/', apiKey } = {}) => {
  const { assetuid, versionuid, ...remainingModifiers } = modifiers;
  const operations = operationsGenerator(remainingModifiers)

  return {
    url: joinURL(baseURL, apiKey, assetuid, versionuid, src + (operations ? ('?' + operations) : '')),
  }
}