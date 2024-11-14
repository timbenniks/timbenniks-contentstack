import { SitemapStream, streamToPromise } from 'sitemap'
import contentstack, { Region } from '@contentstack/delivery-sdk'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { apiKey, deliveryToken, environment, region } = config.public.contentstack.deliverySdkOptions;
  const stack = contentstack.stack({
    apiKey,
    deliveryToken,
    environment,
    region: region === 'eu' ? Region.EU : Region.US,
  });

  const { entries: articles } = await stack.contentType('article').entry().query().find()


  const sitemap = new SitemapStream({
    hostname: 'https://timbenniks.dev'
  })

  const writing = articles && articles.map((doc) => {
    return doc.url
  })

  const urls = [
    '/',
    '/about',
    '/livestreams',
    '/presskit',
    '/alive-and-kicking',
    '/speaking',
    '/videos',
    '/uses'
  ]

  urls.push(...writing)

  for (const doc of urls) {
    sitemap.write({
      url: doc,
      changefreq: 'monthly'
    })
  }
  sitemap.end()

  return streamToPromise(sitemap)
})