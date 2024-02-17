<script lang="ts">
  import { page } from "$app/stores";
  import { metainfo } from "$lib/config";

  export let ogtitle: string = "";
  ogtitle = ogtitle.length !== 0 ? `${metainfo.title} | ${ogtitle}` : metainfo.title
  export let ogkeywords: string = metainfo.keywords;
  export let ogdescription: string = metainfo.description;
  // export let ogcwd: string = "page";
  export let caption: string = "";
  let ogcaption = caption.slice(caption.indexOf(":")+1)
  
  // export let seoType: "WebSite" | "Person" | "Organization" | "NewsArticle" | "WebPage" = "WebPage";
  // export let seoDatePublished: string = "";
  // export let seoDateModified: string = "2023-12-14 03:28:59.457311+00";

  $: cwd = $page.url.pathname
</script>

<script context="module" lang="ts">
  export function load({ page }:{page:any}) {
    page.title = metainfo.title;
    page.description = metainfo.description;
    page.keywords = metainfo.keywords;
  }
</script>


<svelte:head>
  <meta name="creator" content={metainfo.creator} />

  <title>{ogtitle}</title>
  <meta name="application-name" content={metainfo.title} />
  <meta name="apple-mobile-web-app-title" content={metainfo.title} />
  
  <meta property="og:description" content={ogdescription} />
  <meta name="description" content={ogdescription}/>
  <meta name="keywords" content={ogkeywords} />
  
  <link rel="canonical" href={`${$page.url}`} />
  
  <link rel="manifest" href="/manifest.webmanifest" />
  <meta name="category" content="Digital Content Platform" />
  <meta name="classification" content="Web App" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  
  <meta property="og:title" content={ogtitle} />
  <meta property="og:url" content={metainfo.url} />
  <meta property="og:site_name" content={ogtitle} />
  <meta property="og:image" content={`${metainfo.url}api/og`} />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={metainfo.url} />
  <meta name="twitter:creator" content={metainfo.creator} />
  <meta name="twitter:title" content={ogtitle} />
  <meta name="twitter:image" content={`${metainfo.url}og-image.svg`} />
  <meta name="twitter:description" content={ogdescription} />
  
  <!-- Images -->
  <!-- <link rel="icon" href="/icon?e3ec99920756668c" type="image/png" sizes="32x32" /> -->
  <link rel="icon" href="/favicon-32x32.svg" type="image/svg" sizes="32x32" />
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.svg" />
  

<!-- SEO -->
<!-- {#if seoType === "WebSite"}
  {@html `<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "WebSite",
      "name": "${ogtitle}",
      "url": "${metainfo.url}${cwd.slice(1)}",
  }
  </script>`}
{:else if seoType === "Person"}
  {@html `<script type="application/ld+json">
  {
    "@context" : "https://schema.org",
    "@type" : "Person",
    "name" : "Babajide F. Mosess",
    "username": "@bfm"
    "url" : "${metainfo.url}",
    "sameAs" : ${metainfo.contacts}
  }
  </script>`}
{:else if seoType === "Organization"}
  {@html `<script type="application/ld+json">
  {
    "@context" : "https://schema.org",
    "@type" : "Organization",
    "name" : "${metainfo.title}",
    "url" : "${metainfo.url}",
    "sameAs" : ${metainfo.contacts}
  }
  </script>`}
{:else if seoType === "NewsArticle"}
  {@html `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${metainfo.url}wiki"
    },
    "headline": "WikiWonders: Your Gateway to the World of Diverse Technologies and Beyond!",
    "image": [
      "${metainfo.url}api/ogimg?caption=${ogcaption}"
    ],
    "datePublished": "${seoDatePublished}",
    "dateModified": "${seoDateModified}",
    "author": {
      "@type": "Person",
      "name": "Radiance E. Babajide",
      "username": "@${metainfo.yonko}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "${metainfo.title}",
      "logo": {
        "@type": "Symbol",
        "url": "${metainfo.url}"
      }
    },
    "description": "${ogdescription}",
    "caption": "${ogcaption}"
  }
  </script>`}
{:else}
  {@html `<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "name": "${ogtitle}",
    "description": "${ogdescription}",
    "publisher": {
      "@type": "ProfilePage",
      "name": "Radiance E. Babajide",
      "username": "@${metainfo.yonko}"
    }
  }
  </script>`}
  {/if} -->
  {@html `<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "name": "${ogtitle}",
    "description": "${ogdescription}",
    "publisher": {
      "@type": "ProfilePage",
      "name": "tcitrogg",
      "username": "${metainfo.handle}"
      "website": "${metainfo.contact[0]}"
    }
  }
  </script>`}
</svelte:head>
