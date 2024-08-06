<script setup>
import Richtext from "./components/richtext.vue";
import TwoColumn from "./components/twoColumns.vue";

const timelineItems = [
  {
    daterange: "August 2023 - Present",
    text: "At Hygraph, Tim Benniks is the Developer Relations Lead, driving outreach and awareness initiatives. In this role, he connects with the developer community through engaging content, live streams, and industry events. Tim's efforts are focused on showcasing Hygraph's capabilities, fostering strong relationships with developers and partners, and promoting the adoption of headless CMS solutions. His work enhances Hygraph's visibility and empowers developers to build innovative and scalable applications using Hygraph's platform.",
    company: "Hygraph",
    title: "Developer Relations Lead for Outreach and Awareness",
    location: "Remote",
    url: "https://hygraph.com",
  },
  {
    daterange: "March 2021 - Present",
    text: "At the beginning of my tenure as a member of the Technical Council, I played a pivotal role in shaping the decision-making processes for new member admissions for SI's. Diligently evaluated potential members to ensure they adhered to Microservices, API-first, Cloud-native, and Headless (MACH) architecture principles. As a group of dedicated Council members, we were instrumental in maintaining the high standards of the alliance, fostering innovation, and ensuring that new entrants contributed meaningfully to the MACH ecosystem.",
    company: "MACH Alliance",
    title: "Member of Tech Council",
    location: "Remote",
    url: "https://machalliance.org",
  },
  {
    daterange: "January 2023 - August 2023",
    text: "Played a crucial role in engaging and educating the developer community. Inspire and Empower is the motto. Responsibilities included creating educational content, live streaming, speaking at conferences, and providing guidance to developers to effectively utilize Uniform's cutting-edge platform. My work significantly contributed to increasing Uniform's visibility and adoption within the tech community, fostering a vibrant and informed user base.",
    company: "Uniform",
    title: "Director of Developer Relations",
    location: "Remote",
    url: "https://uniform.dev",
  },
  {
    daterange: "February 2021 - January 2023",
    text: "Joined Uniform as Principal Developer Advocate. Developer Relations, defining the perception of Uniform to technical people in the community of developers, partners, and customers. Setting up processes, KPIs, and their measurement, creating content (written and video) around DXC, and speaking at conferences.",
    company: "Uniform",
    title: "Principal Developer Advocate",
    location: "Remote",
    url: "https://uniform.dev",
  },
  {
    daterange: "March 2018 - February 2021",
    text: "Served as Director of Web Development at Valtech. A global role representing front-end developers across Valtech. Setting up best practices around team management, pitching, and use of MACH technology. Helping Global clients to achieve digital transformation at scale. Clients include: P&G, Rolex, LVMH",
    company: "Valtech",
    title: "Director of Web Development",
    location: "Paris Area, France",
    url: "https://www.valtech.com",
  },
  {
    daterange: "April 2017 - January 2020",
    text: "Global front-end lead on the website factory program for L'Oréal. Leading teams in France, US and Ukraine. In charge of code quality across projects, front-end architecture, tech stack decisions. Brands: Kerastase, Garnier, Redken, Essie, L'Oréal Paris, La Roche Posay, Vichy.",
    company: "Valtech",
    title: "Global Front-End Lead",
    location: "Paris Area, France",
    url: "https://www.valtech.com",
  },
  {
    daterange: "April 2015 - April 2017",
    text: "Served as Technical Delivery Manager at AKQA. Dividing time between being tech lead and developer. Streamlining client processes and decision making with creative innovation, tech limitations and client goals in mind. Clients: Chanel, Hermès, Google, Nike.",
    company: "AKQA",
    title: "Technical Delivery Manager",
    location: "Paris Area, France",
    url: "https://www.akqa.com",
  },
  {
    daterange: "March 2014 - April 2015",
    text: "Served as Principal Web Developer at AKQA. Leading the tech team on a content level, presenting to peers, guiding juniors and interns and working closely with external tech partners. Clients: Chanel, Hermès, Red Bull, Martell, Google, Nike",
    company: "AKQA",
    title: "Principal Web Developer",
    location: "Paris Area, France",
    url: "https://www.akqa.com",
  },
  {
    daterange: "January 2011 - March 2014",
    text: "Served as Senior Web Developer at AKQA. Worked on front-end architecture for big multi-market platforms and through the line campaigns. Clients: Heineken, Tommy Hilfiger, Mini, Nike, EA Sports, Philips.",
    company: "AKQA",
    title: "Senior Web Developer",
    location: "Amsterdam Area, Netherlands",
    url: "https://www.akqa.com",
  },
  {
    daterange: "May 2010 - December 2010",
    text: "Served as Front-End Developer at Mirabeau. Worked closely with the backend developers. Clients: Transavia.com, AutoTrader, VUmc, Nutricia, Stadgenoot, KLM, RDC.",
    company: "Mirabeau",
    title: "Front-End Developer",
    location: "Netherlands",
    url: "https://www.mirabeau.nl",
  },
  {
    daterange: "January 2010 - May 2010",
    text: "Served as Team Lead Front-End Development at Mediamatic. Responsible for the quality assurance of code, meeting deadlines, and handling resourcing.",
    company: "Mediamatic",
    title: "Team Lead Front-End Development",
    location: "Amsterdam",
    url: "https://www.mediamatic.net",
  },
  {
    daterange: "January 2008 - January 2010",
    text: "Served as Front-End Engineer at Mediamatic. Responsible for the overall look and feel of websites built with the anyMeta CMS. Clients: Picnic, Pakhuis de Zwijger, Women INC, Mediamatic.net, Mediamatic Travel, Museum de Paviljoens.",
    company: "Mediamatic",
    title: "Front-End Engineer",
    location: "Amsterdam",
    url: "https://www.mediamatic.net",
  },
];

const talksData = [
  {
    title: "2024 09 27 Clqdq87gltsup0bvztwqw2f1v",
    description: "",
    conference: "CMSCamp Mallorca",
    talk: "Alive and Kicking",
    location: "Catalonia Majorica Palma Mallorca",
    date: "2024-09-27",
    id: "clqdq87gltsup0bvztwqw2f1v",
    link: "https://mallorca.cmscamp.eu/",
  },
  {
    title: "2024 06 26 Clxkjutfsgp2b08uncx30wni3",
    description: "",
    conference: "Algolia DevBit",
    talk: "CatnibDB, Supabase and Algolia power",
    location: "Virtual",
    date: "2024-06-26",
    id: "clxkjutfsgp2b08uncx30wni3",
    link: "https://app.events.ringcentral.com/events/algolia-devbit-5/reception",
  },
  {
    title: "2024 06 05 Clqdq6ui7ts730bvzmk1xw47t",
    description: "",
    conference: "ContentCon 2024",
    talk: "Alive and Kicking",
    location: "Austin, Texas",
    date: "2024-06-05",
    id: "clqdq6ui7ts730bvzmk1xw47t",
    link: "https://www.contentstack.com/contentcon",
  },
  {
    title: "2024 02 29 Clkzot86xire30aujuy08465e",
    description: "",
    conference: "DEVworld Conference 2024",
    talk: "Alive and Kicking - a vue into rock & roll",
    location: "Amsterdam",
    date: "2024-02-29",
    id: "clkzot86xire30aujuy08465e",
    link: "https://devworldconference.com/",
  },
];

const videoData = [
  {
    title: "The fastest site I ever built",
    description:
      "In this video, I explain the unconventional means I used to build the fastest website of my career.\n\nCheck it out! https://timbenniks.dev\n\nIt's open source:\nhttps://github.com/timbenniks/timbenniksdev-2024\n\nFollow me here:\nWebsite: https://timbenniks.dev\nTwitter: https://twitter.com/timbenniks\nLinkedIn: https://linkedin.com/in/timbenniks\nGithub: https://github.com/timbenniks",
    date: "2024-07-01T07:45:23Z",
    image: "https://i.ytimg.com/vi/F6WjICjSJO0/maxresdefault.jpg",
    videoId: "F6WjICjSJO0",
  },
  {
    title: "72 hours in Austin, TX",
    description:
      "The folks at ContentCon asked me if I wanted to be the entertainment and open their annual conference with my Alive & Kicking guitar talk. Austin, Texas was awesome. Thanks for having me!\n\nFollow me here:\nWebsite: https://timbenniks.dev\nTwitter: https://twitter.com/timbenniks\nGithub: https://github.com/timbenniks",
    date: "2024-06-10T07:13:06Z",
    image: "https://i.ytimg.com/vi/mvq-_s20NDk/maxresdefault.jpg",
    videoId: "mvq-_s20NDk",
  },
  {
    title:
      "The Jake Ward Interview. The power of developer advocacy with Data Protocol",
    description:
      "Jake Ward, the co-founder and CEO of Data Protocol, and I discuss the current state of developer advocacy in 2024 and share insights on how dev rel teams can measure their impact.\n\nFollow Jake here:\nhttps://twitter.com/Jacobmward\nhttps://dataprotocol.com\nhttps://www.linkedin.com/in/jacobmward/\n\nFollow me here:\nhttps://timbenniks.dev\nhttps://twitter.com/timbenniks\nhttps://linkedin.com/in/timbenniks",
    date: "2024-04-15T13:00:24Z",
    image: "https://i.ytimg.com/vi/VEX0KtITib4/maxresdefault.jpg",
    videoId: "VEX0KtITib4",
  },
];

const speakerMedia = [
  {
    src: "/Tim/tim-talk.png",
    alt: "Tim Benniks in Berlin",
    url: "https://res.cloudinary.com/dwfcofnrd/image/upload/v1718362826/Tim/tim-talk.png",
  },
  {
    src: "/Tim/tim_june_2024.jpg",
    alt: "Tim Benniks in Paris",
    url: "https://res.cloudinary.com/dwfcofnrd/image/upload/v1718362826/Tim/tim_june_2024.jpg",
  },
  {
    src: "/Tim/tim_aug_2023.png",
    alt: "Tim Benniks in his studio",
    url: "https://res.cloudinary.com/dwfcofnrd/image/upload/v1718362826//Tim/tim_aug_2023.png",
  },
];

const speakerDeets = [
  { label: "Name", val: "Tim Benniks" },
  {
    label: "Company",
    val: "Hygraph",
    link: "https://hygraph.com",
  },
  {
    label: "Title",
    val: "Developer Relations Lead for outreach and awareness",
  },
  { label: "Location", val: "Greater Toulouse Area, France" },
  { label: "E-mail", val: "timbenniks.dev@gmail.com" },
  {
    label: "Website",
    val: "https://timbenniks.dev",
    link: "https://timbenniks.dev",
  },
];

const navigation = [
  {
    url: "https://timbenniks.dev",
    copy: "ABOUT",
  },
  {
    url: "https://timbenniks.dev",
    copy: "VIDEOS",
  },
  {
    url: "https://timbenniks.dev",
    copy: "WRITING",
  },
];

const articleData = [
  {
    _path: "/writing/how-i-supercharched-my-websites-speed",
    image:
      "https://media.dev.to/cdn-cgi/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https://res.cloudinary.com/dwfcofnrd/image/upload/v1719837465/website/fast-website-poster.jpg",
    title: "How I supercharched my website's speed",
    description:
      "In this blog post, I want to share how I transformed my website into the fastest site I've ever built. I'll walk you through the steps, my unconventional decisions, and the tools I used to achieve this feat.",
    reading_time: "5 min read",
  },

  {
    _path: "/writing/how-i-supercharched-my-websites-speed",
    image:
      "https://media.dev.to/cdn-cgi/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https://res.cloudinary.com/dwfcofnrd/image/upload/v1719837465/website/fast-website-poster.jpg",
    title: "How I supercharched my website's speed",
    description:
      "In this blog post, I want to share how I transformed my website into the fastest site I've ever built. I'll walk you through the steps, my unconventional decisions, and the tools I used to achieve this feat.",
    reading_time: "5 min read",
  },
  {
    _path: "/writing/how-i-supercharched-my-websites-speed",
    image:
      "https://media.dev.to/cdn-cgi/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https://res.cloudinary.com/dwfcofnrd/image/upload/v1719837465/website/fast-website-poster.jpg",
    title: "How I supercharched my website's speed",
    description:
      "In this blog post, I want to share how I transformed my website into the fastest site I've ever built. I'll walk you through the steps, my unconventional decisions, and the tools I used to achieve this feat.",
    reading_time: "5 min read",
  },
  {
    _path: "/writing/how-i-supercharched-my-websites-speed",
    image:
      "https://media.dev.to/cdn-cgi/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https://res.cloudinary.com/dwfcofnrd/image/upload/v1719837465/website/fast-website-poster.jpg",
    title: "How I supercharched my website's speed",
    description:
      "In this blog post, I want to share how I transformed my website into the fastest site I've ever built. I'll walk you through the steps, my unconventional decisions, and the tools I used to achieve this feat.",
    reading_time: "5 min read",
  },
];

const faqs = [
  {
    question: "Who is Tim Benniks?",
    answer:
      "Tim Benniks is a Netherlands-born Developer Relations Lead for Outreach and Awareness at Hygraph, currently residing in France. With a rich background in web development and creative content production, Tim has built a career that merges technical expertise with artistic expression.",
  },
  {
    question: "Where does Tim Benniks work?",
    answer:
      "As of 2023, Tim serves as the Developer Relations Lead for Outreach and Awareness at Hygraph and works remotely from his countryside farm in France.",
  },
  {
    question: "What did Tim do before Hygraph?",
    answer:
      "Before joining Hygraph, Tim was the Director of Developer Relations at Uniform. He also has considerable experience in agencies, including roles such as Global Front-end Director at Valtech and Principal Front-end Developer at AKQA.",
  },
  {
    question: "Why did Tim Benniks change his career path in 2020?",
    answer:
      "In 2020, Tim decided to reinvent his career to reconnect with his creativity and community. Moving away from agency life, he began focusing on producing YouTube videos and speaking at conferences to share his knowledge and passion for web development and creativity.",
  },
  {
    question: "What kind of content does Tim create?",
    answer:
      "Tim specializes in creating high-production-value talks for virtual conferences and YouTube videos that explore web development topics, conduct interviews, and feature live commentary on various services.",
  },
  {
    question: "How can I support Tim's content creation?",
    answer:
      "If you enjoy Tim's work and wish to support him, you can subscribe to his YouTube channel or consider sponsoring at https://buymeacoffee.com/timbenniks.",
  },
];
</script>
<template>
  <main class="mx-auto max-w-[1400px] bg-[#1b1d39]">
    <GlobalHeader :navigation="navigation" searchurl="/search" />
    <Hero
      :smallertitle="false"
      titletag="h1"
      subtitletag="h2"
      :right="true"
      title="Tim Benniks"
      description="DEVELOPER RELATIONS LEADER, SPEAKER, CONTENT CREATOR"
    >
      <template #image>
        <Image
          alt="Tim Benniks at Vue.js Amsterdam 2024 during his Alive and Kicking talk"
          src="/website/tim-latest.png"
          fit="thumbnail"
          :height="618"
          loading="lazy"
          provider="cloudinaryNative"
          sizes="sm:100vw"
          :width="1440"
        />
      </template>

      <template #ctas>
        <cta
          url="https://timbenniks.dev"
          text="More about Tim"
          target="_blank"
        />
        <cta url="https://timbenniks.dev" text="Another CTA" target="_blank" />
      </template>
    </Hero>

    <Hero
      :smallertitle="false"
      titletag="p"
      subtitletag="p"
      :right="false"
      title="About Tim"
      description="DEVELOPER RELATIONS LEADER, SPEAKER, CONTENT CREATOR
"
    >
      <template #image>
        <Image
          alt="Tim Benniks at Vue.js Amsterdam 2024 during his Alive and Kicking talk"
          src="/website/tim_augmented.png"
          fit="thumbnail"
          :height="618"
          loading="lazy"
          provider="cloudinaryNative"
          sizes="sm:100vw"
          :width="1440"
        />
      </template>

      <template #ctas>
        <cta
          url="https://timbenniks.dev"
          text="More about Tim"
          target="_blank"
        />
        <cta url="https://timbenniks.dev" text="Another CTA" target="_blank" />
      </template>
    </Hero>

    <articles
      title="Articles"
      :first-featured="true"
      :small="false"
      :articles="articleData"
    />

    <TwoColumn>
      <template #sidea>
        <TitleBlock title="This is a title block" tag="h1" :nospace="false" />
        <Richtext>
          <p>
            If you enjoy Tim's work and wish to support him, you can subscribe
            to his YouTube channel or consider sponsoring at
            <a href="https://buymeacoffee.com/timbenniks">buymeacoffee</a>.
          </p>
        </Richtext>

        <faq :faqs="faqs" />
      </template>
      <template #sideb>
        <Richtext>
          <p>
            If you enjoy Tim's work and wish to support him, you can subscribe
            to his YouTube channel or consider sponsoring at
            <a href="https://buymeacoffee.com/timbenniks">buymeacoffee</a>.
          </p>
        </Richtext>
        <Media
          caption="Tim Benniks at Vue.js Amsterdam 2024"
          alt="Tim Benniks at Vue.js Amsterdam 2024 during his Alive and Kicking talk"
          src="/website/tim_augmented.png"
          fit="thumb"
          :height="500"
          loading="lazy"
          provider="cloudinaryNative"
          sizes="sm:100vw"
          :width="500"
        />
      </template>
    </TwoColumn>

    <SpeakerDetails :deets="speakerDeets" />

    <SpeakerMedia
      :media="speakerMedia"
      descripiton="Click on the images for their full resolution versions."
    />

    <videos
      :videos="videoData"
      title="videos"
      description="Click on the images for their full resolution versions."
      extras-url="https://timbenniks.dev"
      :first-featured="false"
    />

    <talks :talks="talksData" title="Talks" />

    <Timeline :timeline-items="timelineItems" />

    <GlobalFooter />
  </main>
</template>
