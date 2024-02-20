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
  import * as Drawer from "$lib/components/ui/drawer";
	// import { Drawer } from 'vaul-svelte';
  // import { mangaData } from '../../../../../stores/eachPage';
  import { fetchImage, getThumbnail, shuffle, sortWithVolume, titleCase } from '$lib/utils';
  import CopyBtn from '$lib/components/CopyBtn.svelte';
  import Pill from '$lib/components/Pill.svelte';
  // import IntersectionObserver from '$lib/components/IntersectionObserver.svelte';
  import IntersectionObserver from 'svelte-intersection-observer';
  import { Button } from '$lib/components/ui/button';
  // import sampleData from "$lib/sampleData.json";
  import Readotron from '@untemps/svelte-readotron'
    import { currentChapterData, nextChapterData, previousChapterData } from '../../../../../stores/eachPage';

  const listOfImages = [
    "/imgs/thumbnails/Demon slayer.jfif",
    "/imgs/thumbnails/eff205d1-fe91-4456-918d-44df256587a4.jpg",
    "/imgs/thumbnails/babe-cyberpunk.jfif",
    "/imgs/thumbnails/c02f8-tribe_village03.webp",
    "/imgs/thumbnails/extended-realm.jfif",
  ]

  // $: currentPageNumber = 1
  // $: prevPage = currentPageNumber == 0 ? 0 : currentPageNumber
  // $: nextPage = currentPageNumber + 1
  let chapterLength = data.usingData.length

  // $: isMenuVisible = false
  // const handleMenuVisible = ()=>{
  //   isMenuVisible = !isMenuVisible
  // }
  
  
  let mangaData = data.mangaInfo

  // console.log(sortWithVolume(mangaData))

  $: nextChapter = null
  $: previousChapter = null
  $: currentChapter = null
  $: sortWithVolume(mangaData).forEach((eachVolume: any) => {
    eachVolume.chapters.find((eachChapter:any, index: number)=>{
      if ($page.params.cid===eachChapter.id){
        nextChapter = eachVolume.chapters[index+1] ?? null
        previousChapter = eachVolume.chapters[index-1] ?? null
        currentChapter = {volume: eachVolume.volume, ...eachChapter}
      }
    })
  });

  // $: ({nextChapter} = nextChapter);
  // $: ({currentChapter} = currentChapter);
  // $: ({previousChapter} = previousChapter);

  console.log("$: nextChapter", nextChapter)
  console.log("$: currentChapter", currentChapter)
  console.log("$: previousChapter", previousChapter)

  const mangaTitle = `${Object.values(mangaData?.attributes.title)[0]}`
  const mangaDescription = Object.values(mangaData.attributes.description)[0] ?? ""
  const mangaKeywords = mangaData.attributes.tags.map((eachTag:any)=>Object.values(eachTag.attributes.name)[0])
  // // const date = new Date($mangaData.attributes.createdAt)
  const mangaYear = mangaData.attributes.year ?? mangaData.attributes.createdAt.slice(0,4)
  const mangaStatus = titleCase(mangaData.attributes.status) ?? "Unknown"  
  let mangaThumbnail = getThumbnail(mangaData);

  let copyInfo = `Check out this chapter of **${mangaTitle}**
${$page.url}

_from ${metainfo.url}_`


let thisPage = 0;
</script>


<Metahead
  title={`${mangaTitle} Ch. ${chapterLength}`}
  description={`${mangaDescription}`}
  keywords={mangaKeywords}
  seoType="NewsArticle"
  createdAt={`${mangaData.attributes.createdAt}`}
  updatedAt={`${mangaData.attributes.updatedAt}`}
  image={mangaThumbnail}
/>

<section transition:slide={{duration:300}} class="w-full md:pl-4 md:pr-3 flex relative">
  <section class="w-full lg:w-9/12 md:-auto h-full flex flex-col relative z-10">
    <!-- <section class="w-full fixed top-0 left-2/4 flex z-30 ">
      <Progress value={33} class="w-full h-1"/>
      <Readotron selector=".displayBody" withScroll={true} />
      <p class="whitespace-nowrap">intersecting: Page {thisPage}</p>
      <p class="whitespace-nowrap">total: {data.usingData.length}</p>
      <p class="whitespace-nowrap">title: {currentChapter.title}</p>
    </section> -->
  
  
    <Drawer.Root>
      <Drawer.Trigger>
        <!-- <Button builders={[builder]} variant="outline">Open Drawer</Button> -->
        <button class="block lg:hidden px-2 py-0.5 bg-zinc-300/40 hover:bg-zinc-300/70 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/70 text-zinc-100 backdrop-blur- focus:ring-2 focus:ring-main/50 focus:outline-none rounded-full fixed top-1 left-[45%] z-10">
          <i transition:slide class="icon icon-ic_fluent_re_order_dots_horizontal_20_regular flex text-2xl"/>
        </button>
      </Drawer.Trigger>
      <Drawer.Content class="bg-zinc-50 dark:bg-zinc-950 shadow-md">
        <section class="flex flex-col gap-10 overflow-y-auto">
          <section class="w-full h-full p-3 flex flex-col gap-4">  
            <section class="flex gap-4 justify-between">
              <a href={`/m/${mangaData.id}#${data.id}`} class="">
                <section class="flex gap-4 items-start">
                  <section class="w-28 h-24 rounded-md bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <Image
                      src={mangaThumbnail}
                      alt={mangaTitle}
                    />
                  </section>
                  <section class="w-11/12 py-2">
                    <h3 class="font-semibold text-lg">{mangaTitle}</h3>
                    <h4 class="text-sm opacity-70 font-medium">
                      <span class="">Volume {currentChapter?.volume??1}</span>
                      <span class="">Chapter {currentChapter?.chapter}</span>
                      <p class="">Version: {currentChapter?.version??1}</p>
                      <p class="">Pages: {data.usingData.length}</p>
                    </h4>
                  </section>
                </section>
              </a>
                
              <section class="py-2">
                <CopyBtn content={copyInfo}/>
              </section>
            </section>
    
            <section class="flex gap-3">
              <p class="line-clamp-3">
                {mangaDescription}
              </p>
            </section>
    
            <section class="flex flex-wrap gap-2.5 snap-x snap-mandatory">
              <Pill
                link={`#`}
                title={mangaYear}
                style={"text-sm py-1"}
                isActive={true}
              />
              <Pill
                link={`#`}
                title={`# ${mangaStatus}`}
                style={"text-sm py-1"}
                isActive={true}
              />
              <Pill
                link={`#`}
                title={titleCase(`${mangaData.attributes?.publicationDemographic ?? mangaData.type}`)}
                style={"text-sm py-1"}
                isActive={true}
              />
              <!-- {#each mangaData.tags as eachTag}
                <section class="flex"><Pill
                  link={`/m/tag/${eachTag.id}`}
                  title={`${Object.values(eachTag.attributes.name)[0]}`}
                  style={"text-sm py-1"}
                /></section>
              {/each} -->
            </section>

            <section class="flex flex-col gap-1">
              <a href={`/m/${mangaData.id}#${data.id}`} class="py-2 px-3 flex items-center bg-zinc-300/50 hover:bg-zinc-300 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
                <i class="icon icon-ic_fluent_news_20_regular flex text-3xl"/>
                <p class="">Manga's page</p>
              </a>
              <a href='/' class="py-2 px-3 flex items-center bg-zinc-300/50 hover:bg-zinc-300 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
                <i class="icon icon-ic_fluent_home_20_regular flex text-3xl"/>
                <p class="">Home</p>
              </a>
            </section>
          </section>
    
          <section class="flex items-center justify-between p-3">
            {#if previousChapter !== null}
              <a href={`${previousChapter.id}`} title={`Previous Chapter`} class="focus:ring-0 focus:outline-none relative bg-zinc-300/50 hover:bg-zinc-300 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 px-3 py-1 rounded-lg flex items-center justify-center">
                Previous
              </a>
            {:else}
              <p title={`No Previous Chapter`} class="relative px-3 py-1 rounded-lg flex items-center justify-center">
                Previous
              </p>
            {/if}

            {#if nextChapter !== null}
              <a  href={`${nextChapter.id}`} title={`Next Chapter`} class="focus:ring-0 focus:outline-none relative bg-zinc-300/50 hover:bg-zinc-300 dark:bg-zinc-800/50 dark:hover:bg-zinc-800  px-3 py-1 rounded-lg flex items-center justify-center">
                Next
              </a>
            {:else}
              <p title={`No Next Chapter`} class="relative px-3 py-1 rounded-lg flex items-center justify-center">
                The end
              </p>
            {/if}
          </section>
        </section>
        <!-- <div class="mx-auto w-full max-w-sm">
          <Drawer.Header>
            <Drawer.Title>Move Goal</Drawer.Title>
            <Drawer.Description>Set your daily activity goal.</Drawer.Description>
          </Drawer.Header>
          <Drawer.Footer>
            <Button>Submit</Button>
            <Drawer.Close asChild let:builder>
              <Button builders={[builder]} variant="outline">Cancel</Button>
            </Drawer.Close>
          </Drawer.Footer>
        </div> -->
      </Drawer.Content>
    </Drawer.Root>
    
    <!-- Pages -->
    <section class="displayBody w-full h-full">
      {#each data.usingData as eachData, index}
      <IntersectionObserver on:intersect={() => (thisPage = index)} threshold={0.5} rootMargin="0px">
        <section id={`${index+1}`} class="w-full relative overflow-hidden bg-gradient-to-b from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700">
          <!-- section.w-full.h-full -->
          <!-- <Image
            src={`${eachData}`}
            alt={`Page #${index+1}`}
            classes={""}
          /> -->
          
            <!-- src={`${data.baseUrl}/data-saver/${data.chapterHash}/${eachData}`} -->
          <Image
            src={`${data.baseUrl}/data/${data.chapterHash}/${eachData}`}
            alt={`#${index}`}
          />
          <section class="flex absolute bottom-1 ml-1">
            <a href={`#${index+1}`} class="py-1 px-3 rounded-lg text-xs bg-zinc-900/40 hover:bg-zinc-900/70 backdrop-blur- font-medium text-zinc-200">
              <p class="whitespace-nowrap">Page: {index+1}</p>
            </a>
          </section>
        </section>
      </IntersectionObserver>
      {/each}
    </section>
  </section>
  
  <section class="hidden lg:flex sticky top-0 md:w-3/12 h-screen p-1">
    <section class="w-full h-full rounded-lg bg-zinc-100 dark:bg-zinc-900 flex flex-col gap-10 justify-between">
      <section class="h-full gap-10 overflow-y-auto">
        <section class="w-full h-full p-3 flex flex-col gap-4">  
          <section class="flex gap-4 justify-between">
            <a href={`/m/${mangaData.id}#${data.id}`} class="">
              <section class="flex gap-4 items-start">
                <section class="w-28 h-24 rounded-md bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <Image
                    src={mangaThumbnail}
                    alt={mangaTitle}
                  />
                </section>
                <section class="w-11/12 py-2">
                  <h3 class="font-semibold text-lg">{mangaTitle}</h3>
                  <h4 class="text-sm opacity-70 font-medium">
                    <span class="">Volume {currentChapter?.volume??1}</span>
                    <span class="">Chapter {currentChapter?.chapter}</span>
                    <p class="">Version: {currentChapter?.version??1}</p>
                    <p class="">Pages: {data.usingData.length}</p>
                  </h4>
                </section>
              </section>
            </a>
              
            <section class="py-2">
              <CopyBtn content={copyInfo}/>
            </section>
          </section>
  
          <section class="flex gap-3">
            <p class="line-clamp-3">
              {mangaDescription}
            </p>
          </section>
  
          <section class="flex flex-wrap gap-2.5 snap-x snap-mandatory">
            <Pill
              link={`#`}
              title={mangaYear}
              style={"text-sm py-1"}
              isActive={true}
            />
            <Pill
              link={`#`}
              title={`# ${mangaStatus}`}
              style={"text-sm py-1"}
              isActive={true}
            />
            <Pill
              link={`#`}
              title={titleCase(`${mangaData.attributes?.publicationDemographic ?? mangaData.type}`)}
              style={"text-sm py-1"}
              isActive={true}
            />
            <!-- {#each mangaData.tags as eachTag}
              <section class="flex"><Pill
                link={`/m/tag/${eachTag.id}`}
                title={`${Object.values(eachTag.attributes.name)[0]}`}
                style={"text-sm py-1"}
              /></section>
            {/each} -->
          </section>

          <section class="flex flex-col gap-1">
            <a href={`/m/${mangaData.id}#${data.id}`} class="py-2 px-3 flex items-center bg-zinc-300/50 hover:bg-zinc-300 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
              <i class="icon icon-ic_fluent_news_20_regular flex text-3xl"/>
              <p class="">Manga's page</p>
            </a>
            <!-- <a href='/' class="py-2 px-3 flex items-center bg-zinc-300/50 hover:bg-zinc-300 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
              <i class="icon icon-ic_fluent_home_20_regular flex text-3xl"/>
              <p class="">Home</p>
            </a> -->
          </section>
        </section>
      </section>

      <section class="flex items-center justify-between p-3">
        {#if previousChapter !== null}
          <a href={`/m/${mangaData.id}/c/${previousChapter.id}`} title={`Previous Chapter`} class="focus:ring-0 focus:outline-none relative bg-zinc-300/50 hover:bg-zinc-300 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 px-3 py-1 rounded-lg flex items-center justify-center">
            Previous
          </a>
        {:else}
          <p title={`No Previous Chapter`} class="relative px-3 py-1 rounded-lg flex items-center justify-center">
            Previous
          </p>
        {/if}

        {#if nextChapter !== null}
          <a href={`/m/${mangaData.id}/c/${nextChapter.id}`} title={`Next Chapter`} class="focus:ring-0 focus:outline-none relative bg-zinc-300/50 hover:bg-zinc-300 dark:bg-zinc-800/50 dark:hover:bg-zinc-800  px-3 py-1 rounded-lg flex items-center justify-center">
            Next
          </a>
        {:else}
          <p title={`No Next Chapter`} class="relative px-3 py-1 rounded-lg flex items-center justify-center">
            The end
          </p>
        {/if}
      </section>
    </section>
  </section>
</section>
