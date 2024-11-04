import RSS from 'rss';
// import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: 'Tim Benniks',
    site_url: 'https://timbenniks.dev',
    feed_url: `https://timbenniks.dev/feed.xml`,
  });

  // const { stack } = useNuxtApp().$contentstack;

  // const { entries } = await stack
  //   .contentType("article")
  //   .entry()
  //   .query()


  // const docs = entries.map((entry) => {
  //   return {
  //     title: entry.title,
  //     url: `https://timbenniks.dev/${entry.url}`,
  //     description: entry.description,
  //     date: entry.date,
  //     categories: entry.tags,
  //     author: "Tim Benniks",
  //   };
  // });

  const docs = [{
    title: "title",
    _path: `https://timbenniks.dev/writing/test`,
    description: "title",
    date: "2024-10-29",
    tags: ["title"],
  }]

  docs.map((post: any) => {
    feed.item({
      title: post.title,
      url: `https://timbenniks.dev${post._path}`,
      description: post.description,
      date: post.date,
      categories: post.tags,
      author: "Tim Benniks",
    });
  })

  event.node.res.setHeader('content-type', 'text/xml');
  return feed.xml({ indent: true });
})