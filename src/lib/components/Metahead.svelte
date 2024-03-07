<script lang="ts">
  import { page } from "$app/stores";
  import { metainfo } from "$lib/config";

  export let title: string = "";
  let ogtitle = title.length !== 0 ? `${metainfo.title} - ${title}` : metainfo.title
  export let keywords: string = metainfo.keywords;
  export let description: string = metainfo.description;
  export let caption: string = "";
  // export let ogcwd: string = "page";
  let ogcaption = caption.slice(caption.indexOf(":")+1) ?? `${description.slice(0, 50)}...`
  
  // export let image: string = `/favicon.svg`;
  export let image: string = `/og`;
  
  export let seoType: "WebSite" | "Person" | "Organization" | "NewsArticle" | "WebPage" = "WebPage";
  export let createdAt: string = "";
  export let updatedAt: string = "";

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
  
  <meta name="description" content={description}/>
  <meta name="keywords" content={keywords} />
  <meta name="category" content="Digital Content Platform" />
  <meta name="classification" content="Web App" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  
  <link rel="canonical" href={`${$page.url}`} />
  
  <meta property="og:title" content={ogtitle} />
  <meta property="og:url" content={metainfo.url} />
  <meta property="og:description" content={description} />
  <meta property="og:site_name" content={ogtitle} />
  <meta property="og:image" content={image} />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={metainfo.url} />
  <meta name="twitter:creator" content={metainfo.creator} />
  <meta name="twitter:title" content={ogtitle} />
  <meta name="twitter:image" content={image} />
  <meta name="twitter:description" content={description} />
  
  <!-- Images -->
  <!-- <link rel="icon" href="/icon?e3ec99920756668c" type="image/png" sizes="32x32" /> -->
  <link rel="icon" href="/favicon-32x32.svg" type="image/svg" sizes="32x32" />
  <link rel="icon" href="/favicon-16x16.svg" type="image/svg" sizes="16x16" />
  <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
  <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.svg" />
  

<!-- SEO -->
{#if seoType === "WebSite"}
  {@html `<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "WebSite",
      "name": "${ogtitle}",
      "url": "${metainfo.url}${cwd.slice(1)}"
  }
  </script>`}
{:else if seoType === "Person"}
  {@html `<script type="application/ld+json">
  {
    "@context" : "https://schema.org",
    "@type" : "Person",
    "name" : "${metainfo.creator}",
    "username": "${metainfo.handle}",
    "url" : "${metainfo.contact[0].link}",
    "sameAs" : "${metainfo.contact[0].title}/${metainfo.handle}"
  }
  </script>`}
{:else if seoType === "Organization"}
  {@html `<script type="application/ld+json">
  {
    "@context" : "https://schema.org",
    "@type" : "Organization",
    "name" : "${metainfo.title}",
    "url" : "${metainfo.contact[0].link}",
    "sameAs" : "${metainfo.contact[0].title}/${metainfo.handle}"
  }
  </script>`}
{:else if seoType === "NewsArticle"}
  {@html `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${metainfo.url}/"
    },
    "headline": "${ogcaption}",
    "image": [
      "${image}"
    ],
    "datePublished": "${createdAt}",
    "dateModified": "${updatedAt}",
    "author": {
      "@type": "Person",
      "name": "${metainfo.organisation}",
      "username": "${metainfo.handle}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "${metainfo.organisation}",
      "logo": {
        "@type": "Symbol",
        "url": "${metainfo.url}"
      }
    },
    "description": "${description}",
    "caption": "${ogcaption}"
  }
  </script>`}
{:else}
  {@html `<script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "name": "${ogtitle}",
      "image": [
        "${image}"
      ],
      "description": "${description}",
      "publisher": {
        "@type": "ProfilePage",
        "name": ${metainfo.organisation},
        "username": "${metainfo.handle}",
        "website": "${metainfo.contact[0].link}"
      }
    }
    </script>`}
  {/if}
</svelte:head>
