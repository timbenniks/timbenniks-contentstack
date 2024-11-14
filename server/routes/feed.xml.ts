import RSS from 'rss';
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

  const { entries } = await stack.contentType('article').entry().query().find()

  const feed = new RSS({
    title: 'Tim Benniks',
    site_url: 'https://timbenniks.dev',
    feed_url: `https://timbenniks.dev/feed.xml`,
  });

  entries && entries.forEach((entry) => {
    feed.item({
      title: entry.title,
      url: `https://timbenniks.dev${entry.url}`,
      description: entry.description,
      date: entry.date,
      categories: entry.tags,
      author: "Tim Benniks",
    });
  });

  event.node.res.setHeader('content-type', 'text/xml');
  return feed.xml({ indent: true });
})