<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  import { appinfo, metainfo } from '$lib/config';
  import { page } from '$app/stores';
  
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { Progress } from "$lib/components/ui/progress";
  import Image from '$lib/components/Image.svelte';
  import Metahead from '$lib/components/Metahead.svelte';
  import { slide } from 'svelte/transition';
	import { Drawer } from 'vaul-svelte';
  // import { mangaData } from '../../../../../stores/eachPage';
    import { getThumbnail, titleCase } from '$lib/utils';
    import CopyLinkBtn from '$lib/components/CopyLinkBtn.svelte';

  const listOfImages = [
    "/imgs/thumbnails/Demon slayer.jfif",
    "/imgs/thumbnails/eff205d1-fe91-4456-918d-44df256587a4.jpg",
    "/imgs/thumbnails/babe-cyberpunk.jfif",
    "/imgs/thumbnails/c02f8-tribe_village03.webp",
    "/imgs/thumbnails/extended-realm.jfif",
  ]

  $: currentPageNumber = 1
  $: prevPage = currentPageNumber == 0 ? 0 : currentPageNumber
  $: nextPage = currentPageNumber + 1
  let chapterLength = data.usingData.length

  $: isMenuVisible = false
  const handleMenuVisible = ()=>{
    isMenuVisible = !isMenuVisible
  }

  
  let mangaData = data.mangaInfo
  console.log(mangaData)

  const mangaTitle = `${Object.values(mangaData?.attributes.title)[0]}`
  // const mangaDescription = Object.values(mangaData.attributes.description)[0] ?? ""
  // const mangaKeywords = mangaData.attributes.tags.map((eachTag:any)=>Object.values(eachTag.attributes.name)[0])
  // // const date = new Date($mangaData.attributes.createdAt)
  // const mangaYear = mangaData.attributes.year ?? mangaData.attributes.createdAt.slice(0,4)
  // const mangaStatus = titleCase(mangaData.attributes.status) ?? "Don't Know"
  // handleFetch()

  // console.log($mangaData)
  
  let mangaThumbnail = getThumbnail(mangaData);
  console.log("mangaThumbnail --> ", mangaThumbnail)

  let copyInfo = `Check out this chapter of **${mangaTitle}**
${$page.url}

_from ${metainfo.url}_`
</script>


<!-- <Metahead
  title={`${title}`}
  description={`${description}`}
  keywords={keywords}
  seoType="NewsArticle"
  createdAt={`${$mangaData.attributes.createdAt}`}
  updatedAt={`${$mangaData.attributes.updatedAt}`}
  image={mangaThumbnail}
/> -->

<section class="w-full md:w-10/12 md:mx-auto h-full flex flex-col relative z-10">
  <section class="w-full fixed top-0 left-0 flex ">
    <Progress value={33} class="w-full h-1"/>
    <p class="whitespace-nowrap">total: {data.usingData.length}</p>
  </section>
  
  <section class="w-full h-full">
    {#each listOfImages as eachData, index}
      <section id={`${index+1}`} class="w-full h-full">
        <Image
          src={`${eachData}`}
          alt={`Page #${index+1}`}
        />
        
        <!-- <Image
          src={`${data.host}/data/${data.chapterHash}/${eachData}`}
          src={`${data.host}/data-saver/${data.chapterHash}/${eachData}`}
          alt={`#${index}`}
        /> -->
        
      </section>
    {/each}
  </section>
    
  <section class="w-full h-smscreen md:h-screen bg-pink-600/30 fixed top-0 left-0 flex">
    <button on:click={handleMenuVisible} class="hidden md:block px-2 py-0.5 bg-zinc-200/40 hover:bg-zinc-200/70 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/70 backdrop-blur- focus:ring-2 focus:ring-main/50 focus:outline-none rounded-full absolute top-1 left-[45%] z-1">
      <i transition:slide class="icon icon-ic_fluent_re_order_dots_vertical_20_regular flex text-2xl"/>
    </button>
    <Drawer.Root>
      <Drawer.Trigger>
        <button class="block md:hidden px-2 py-0.5 bg-zinc-200/40 hover:bg-zinc-200/70 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/70 backdrop-blur- focus:ring-2 focus:ring-main/50 focus:outline-none rounded-full absolute top-1 left-[45%] z-1">
          <i transition:slide class="icon icon-ic_fluent_re_order_dots_horizontal_20_regular flex text-2xl"/>
        </button>
      </Drawer.Trigger>
        <Drawer.Overlay class="fixed inset-0 bg-zinc-950/40" />
        <Drawer.Portal>
          <Drawer.Content class="w-full h-60 fixed z-20 flex flex-col bottom-0 left-0 p-1">
            <section class="w-full h-full bg-zinc-200 dark:bg-zinc-800 shadow-md rounded-t-lg p-3 flex flex-col gap-2">
              <!-- {$mangaData} -->
              <section class="flex gap-2">
                <section class="w-14 h-20 rounded-md bg-zinc-200 dark:bg-zinc-800"></section>
                <section class="flex flex-col gap-1">
                  <h3 class="font-semibold">{mangaTitle}</h3>
                  <CopyLinkBtn content={copyInfo}/>
                </section>
              </section>
            </section>
          </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
    <!-- <Carousel.Previous class="absolute top-2/4 left-4" />
    <Carousel.Next class="absolute top-2/4 right-0" /> -->
    {#if prevPage !== 0}
      <a href={`#${prevPage}`} on:click={()=> currentPageNumber-- } class="w-3/12 h-full focus:outline-none focus:ring-0 focus:border-none">
        <section class="w-full h-full bg-amber-50050">
          <!-- prev: {prevPage} -->
        </section>
      </a>
    {/if}

    {#if isMenuVisible}
      <section transition:slide class="w-full h-full bg-green-500/50">
        where {currentPageNumber}
      </section>
    {/if}

    {#if nextPage <= listOfImages.length}
      <a href={`#${nextPage}`} on:click={()=> currentPageNumber++ } class="w-3/12 h-full focus:outline-none focus:ring-0 focus:border-none">
        <section class="w-full h-full bg-amber-50050">
          <!-- next: {nextPage} -->
        </section>
      </a>
    {/if}
  </section>
</section>
