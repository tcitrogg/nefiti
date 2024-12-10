import { dev } from '$app/environment'
export const url = dev ? 'http://localhost:5173/' : 'https://nefiti.vercel.app/'

const title = "Nefiti"

export const metainfo = {
  title,
  short_name: "Ni",
  version: "01.23.456",
  handle: "@tcitrogg",
  keywords: "Manga reader, Manga sharing, Novel publishing, Story telling, Stories, Novels, Genres, Romance, Web novels, Read manga, Webnovels, Romance stories, Read novels online, Fantasy story, Read novels, Novels online, Read webcomics, Read webnovels, Action fantasy, Recommendations, News, Reviews, Spoilers, Websites, Genre, Series, Characters, ",
  description: `From manga to webnovels, ${title} ignites your passion for stories. Read anything, anywhere, discover hidden gems through personalized recommendations, and join a vibrant community of readers and writers. Share your own novels, discuss trending news, and dive into spoiler-filled forums. With Scroll, every turn of the page unlocks a new world. A Manga reader for, reading and sharing your favourite manga collection with family and friends.`,
  caption: `More than just pages, it's an experience. Share and unfold endless stories with ${title}`,
  logo: "",
  ogimg: "/favicon.svg",
  // ogimg: "/api/og",
  organisation: "Tcitrogg",
  creator: "tcitrogg",
  creator_shortname: "rogge",
  contact: [
    { title: "Website", link: "https://bnierimi.vercel.app"},
    { title: "Email", link: "mailto:tcitrogg@gmail.com"},
    { title: "GitHub", link: "https://github.com/tcitrogg"},
    { title: "X", link: "https://x.com/tcitrogg"},
    { title: "Instagram", link: "https://instagram.com/tcitrogg"},
    { title: "Threads", link: "https://threads.net/@tcitrogg"},
    { title: "LinkedIn", link: "https://www.linkedin.com/in/tcitrogg"},
    { title: "Peerlist", link: "https://peerlist.io/tcitrogg"},
    // { title: "Showwcase", link: "https://peerlist.io/tcitrogg"},
  ],
  support: {
    eth_addr: "0x3",
  },
  url,
  isDev: dev ? true : false,
  background_color: "#f5f5f5",
  theme_color: "#f5f5f5",
  color_band: ["#1DB954", "#121212"],
  avatar_prefix: "y/",
  levelling_prefix: "Lv."
}

export const appinfo = {
  baseUrl:'https://api.mangadex.org',
  includedTagNames:['Action', 'Romance'],
  excludedTagNames:["Harem", "Loli", "Hentai", "Ecchi", "Girls' Love", "Sexual Violence", "Boys' Love", "Incest", "Rape", "Genderswap", "Crossdressing"],
}
