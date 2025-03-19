// See https://observablehq.com/framework/config for documentation.
export default {
  // Home
  // The app’s title; used in the sidebar and webpage titles.
  title: "Tilastokirja",
  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  // pages: [
  //   {
  //     name: "ETUSIVU", path: "/index"
  //   },
  //   {
  //     name: "Alue", path: "/pages/alue/alue",
  //   },
    // {
    //   name: "Ilmasto", path: "/pages/ilmasto/ilmasto",
    // },
    // {
    //   name: "Muuttoliike", path: "/pages/muuttoliike/muuttoliike",
    // },
      // open: true,
      // pages: [
      //   {name: "Asuinolot", path: "/pages/asuminen/asuinolot"},
      //   {name: "Valmistuneet asunnot", path: "/pages/asuminen/valmistuneet"},
      //   {name: "Vanhojen asuntojen €/m2", path: "/pages/asuminen/vanhat_neliohinta"},
      //   {name: "Kesämökit", path: "/pages/asuminen/kesamokit"},
      // ]

  // ],

  // Content to add to the head of the page, e.g. for a favicon:
  head: '<link rel="icon" href="etusivu.svg" type="image/svg" sizes="32x32">',
  // The path to the source root.
  root: "src",
  // Some additional configuration options and their defaults:
  //theme: "light", // try "light", "dark", "slate", etc.
  style: "kangasala-style.css",
  //header: ` <a href="./">ETUSIVU</a>`, // what to show in the header (HTML)
  header: ` <a href="./"><img src="./images/home.png" alt="Etusivu"></img></a> |<a href="/pages/asuminen/rakentaminen.html"><img src="./images/building.png" alt="Asuminen ja rakentaminen"></img></a> `,
  footer: false, // what to show in the footer (HTML)
  sidebar: false, // whether to show the sidebar
    //whether to show the table of contents
  pager: false, // whether to show previous & next links in the footer
  // output: "dist", // path to the output root for build
  search: true,
  toc: false,
  // activate search
  // linkify: true, // convert URLs in Markdown to links
  // typographer: false, // smart quotes and other typographic improvements
  preserveExtension: true, // drop .html from URLs
  // preserveIndex: false, // drop /index from URLs

};



