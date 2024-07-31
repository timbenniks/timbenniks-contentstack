import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

function transformArrayToObject(array) {
  return array.reduce((acc, item) => {
    if (item.uid) {
      acc[item.uid] = item;
    }
    return acc;
  }, {});
}

async function getTalks() {
  const response = await fetch(
    "https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clifk2kla052e01ui88kyhe0c/master",
    {
      method: "post",
      body: JSON.stringify({
        query: `
          query Talks($first: Int!) {
            talks(first: $first, orderBy: date_DESC) {
              conference
              talk
              location
              date
              id
              link
            }
          }
          `,
        variables: {
          first: 150,
        },
      }),
    }
  );

  const { data } = await response.json();

  const mappedTalks = data.talks.map((talk) => {
    return {
      date: talk.date,
      title: `${talk.talk} at ${talk.conference}`,
      talk: talk.talk,
      conference: talk.conference,
      location: talk.location,
      link: talk.link,
      uid: `talk_entry_uid_${talk.id}`,
      locale: "en-us",
      created_at: talk.date,
      updated_at: talk.date,
      created_by: "cs6c7ee2bd00ff9f69",
      updated_by: "cs6c7ee2bd00ff9f69",
      content_type_uid: "video",
      publish_details: [
        {
          environment: "development",
          locale: "en-us",
          time: talk.date,
        },
      ],
      ACL: {},
      _version: 1,
      _in_progress: false,
    };
  });

  fs.writeFile(
    `./assets/import-talks/entries/talk/en-us.json`,
    JSON.stringify(transformArrayToObject(mappedTalks), null, 2),
    (err) => {
      console.log(`Talks added.`);
      console.log(mappedTalks.length);

      if (err) {
        console.error(err);
      }
    }
  );

  return mappedTalks;
}

getTalks();
