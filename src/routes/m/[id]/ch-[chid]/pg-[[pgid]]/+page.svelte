<script lang="ts">
  import { fetchImage, flyAndScale, getThumbnail, percentOf, sortWithVolume, titleCase } from '$lib/utils';
  import { fade, slide } from 'svelte/transition';
  import type { PageData } from './$types';
  import { page } from '$app/stores';
  import { appinfo, metainfo } from '$lib/config';
  import CopyBtn from '$lib/components/CopyBtn.svelte';
  import Pill from '$lib/components/Pill.svelte';
  import * as Drawer from "$lib/components/ui/drawer";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { currentChapterData, nextChapterData, previousChapterData } from "../../../../../stores/eachPage";
    import Image from '$lib/components/Image.svelte';
  export let data: PageData;

  let mangaData = data.mangaInfo

  $: nextChapter = null
  $: previousChapter = null
  $: currentChapter = null
  $: sortWithVolume(mangaData).forEach((eachVolume: any) => {
    eachVolume.chapters.find((eachChapter:any, index: number)=>{
      if ($page.params.chid===eachChapter.id){
        nextChapter = eachVolume.chapters[index+1] ?? null
        previousChapter = eachVolume.chapters[index-1] ?? null
        currentChapter = {volume: eachVolume.volume, ...eachChapter}
      }
    })
  });

  const mangaTitle = `${Object.values(mangaData?.attributes.title)[0]}`
  const mangaDescription = Object.values(mangaData.attributes.description)[0] ?? ""
  const mangaKeywords = mangaData.attributes.tags.map((eachTag:any)=>Object.values(eachTag.attributes.name)[0])
  // // const date = new Date($mangaData.attributes.createdAt)
  const mangaYear = mangaData.attributes.year ?? mangaData.attributes.createdAt.slice(0,4)
  const mangaStatus = titleCase(mangaData.attributes.status) ?? "Unknown"  
  let mangaThumbnail = getThumbnail(mangaData);

  let copyInfo = `Check out this Page ${Number($page.params.pgid)+1} of Chapter ${currentChapter?.chapter} in **${mangaTitle}** on ${metainfo.title}
${$page.url}

_from ${metainfo.url}_`
  
  $: isAboutDialogMinimised = false
  const handleAboutDialog = ()=>{
    isAboutDialogMinimised = !isAboutDialogMinimised
  }

  $: pageProgress = percentOf(Number($page.params.pgid)+1, data.usingData.length)

  let isMenuVisible = true
  const handleMenu = ()=>{
    isMenuVisible = !isMenuVisible
  }

  // Image is loading
  let imgSrc = fetchImage(`${data.baseUrl}/data-saver/${data.chapterHash}/${data.usingDataSaver[Number($page.params.pgid)]}`);

  let isImageLoaded = false
  const handleLoadingImg = ()=> isImageLoaded = true

</script>



{#if isMenuVisible}
  <header transition:slide={{axis: 'y', duration: 300}} class="w-full md:w-7/12 lg:w-[48%] flex items-center justify-between px-4 py-1 gap-2 fixed top-1 md:top-0 md:left-[36%] z-20">
    <!-- prev button -->
    {#if Number($page.params.pgid) !== 0}
      <a href="pg-{Number($page.params.pgid)-1}" title="Previous Page" class="p-2 bg-zinc-300/60 dark:bg-zinc-800/60 text-zinc-100 backdrop-blur-[2px] focus:ring-2 focus:ring-main/50 focus:outline-none rounded-full">
        <i transition:slide class="icon icon-ic_fluent_chevron_left_20_filled flex text-2xl"/>
      </a>
    {/if}

    <!-- next button -->
    {#if !(Number($page.params.pgid)+1 == data.usingData.length)}
      <a href="pg-{Number($page.params.pgid)+1}" title="Next Page" class="p-2 bg-zinc-300/60 dark:bg-zinc-800/60 text-zinc-100 backdrop-blur-[2px] focus:ring-2 focus:ring-main/50 focus:outline-none rounded-full">
        <i transition:slide class="icon icon-ic_fluent_chevron_right_20_filled flex text-2xl"/>
      </a>
    {/if}
  </header>
{/if}

<section class="w-full h-full">
  <section in:fade id={``} class="w-full h-full relative flex">
    <section class="w-full h-full flex flex-col">
      {#await imgSrc}
        <!-- imgSrc is pending -->
        <Skeleton class="h-full w-full md:rounded-lg"/>
      {:then value}
        <!-- imgSrc was fulfilled -->
        <!-- <Image
          src={value}
          classes={"w-full"}
        /> -->
        <img src={value} data-sveltekit-reload alt="" class="w-full" on:load={handleLoadingImg} data-loaded={isImageLoaded} data-src={value} srcset={value} data-srcset={value}>
      {:catch error}
        <!-- imgSrc was rejected -->
        <!-- <section class="w-full h-full p-4 md:p-0"></section> -->
        <Skeleton class="h-full w-full md:rounded-lg p-4 md:p-0">

          <h4 class="font-medium text-2xl">Oops!</h4>
          <p class="">Error loading image: {error.message}</p>
        </Skeleton>
      {/await}
    
      <!-- <section class="py-7 opacity-0">Next page</section> -->
    </section>

    {#if Number($page.params.pgid) !== 0}
    <a href="pg-{Number($page.params.pgid)-1}" class="w-2/12 h-full block md:hidden focus:outline-none focus:ring-0 focus:border-none fixed md:absolute left-0 top-0">
      <section class="w-full h-full">
        <!-- prev: prevPage -->
      </section>
    </a>
    {/if}
  
    <section transition:slide on:click={handleMenu} class="w-8/12 h-full fixed md:absolute left-[16.667%] top-0">
    </section>
  
    {#if !(Number($page.params.pgid)+1 == data.usingData.length)}
    <a href="pg-{Number($page.params.pgid)+1}" class="w-2/12 h-full block md:hidden focus:outline-none focus:ring-0 focus:border-none fixed md:absolute right-0 top-0">
      <section class="w-full h-full">
        <!-- next: nextPage -->
      </section>
    </a>
    {/if}
  </section>
</section>

<!-- bottom bar -->
{#if isMenuVisible}
  <footer transition:slide={{axis: 'y', duration: 300}} class="w-full md:w-7/12 lg:w-[48%] flex items-center justify-center p-2 py-1 gap-2 fixed bottom-1 md:bottom-0 md:left-[36%] z-20">
    <!-- Pager -->
    <p class="bg-zinc-300/60 dark:bg-zinc-800/60 backdrop-blur-lg py-1 px-2.5 whitespace-nowrap text-xs rounded-lg">
      <span class="">{Number($page.params.pgid)+1}</span>
    </p>

    <!-- progress -->
    <section class="w-full rounded-full bg-zinc-300 dark:bg-zinc-800 h-1">
      <section class="bg-main ring-2 ring-main/20 py-0.5 rounded-full" style="width: {pageProgress}0%;"/>
    </section>

    <!-- menu button -->
    <button on:click={handleAboutDialog} class="lg:block hidden px-2 py-0.5 bg-zinc-300/60 dark:bg-zinc-800/60 text-zinc-100 backdrop-blur-[2px] focus:ring-2 focus:ring-main/50 focus:outline-none rounded-full">
      <i transition:slide class="icon icon-ic_fluent_re_order_dots_horizontal_20_regular flex text-2xl"/>
    </button>
    <Drawer.Root>
      <Drawer.Trigger>
        <!-- <Button builders={[builder]} variant="outline">Open Drawer</Button> -->
        <button class="block lg:hidden px-2 py-0.5 bg-zinc-300/60 dark:bg-zinc-800/60 text-zinc-100 backdrop-blur-[2px] focus:ring-2 focus:ring-main/50 focus:outline-none rounded-full">
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
                  link={`/m/tag?id=${eachTag.id}`}
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
              <p title={`No Previous Chapter`} class="relative px-3 py-1 rounded-lg flex items-center justify-center opacity-20">
                Beginning
              </p>
            {/if}

            <p class="opacity-60">Chapter</p>

            {#if nextChapter !== null}
              <a  href={`${nextChapter.id}`} title={`Next Chapter`} class="focus:ring-0 focus:outline-none relative bg-zinc-300/50 hover:bg-zinc-300 dark:bg-zinc-800/50 dark:hover:bg-zinc-800  px-3 py-1 rounded-lg flex items-center justify-center">
                Next
              </a>
            {:else}
              <p title={`No Next Chapter`} class="relative px-3 py-1 rounded-lg flex items-center justify-center opacity-20">
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
  </footer>
{/if}



<!-- Lg-screen dialog -->
{#if isAboutDialogMinimised}
  <section class="w-full h-full fixed z-[70] top-0 right-0 hidden lg:block">
    <!-- dialog overlay -->
    <section on:click={handleAboutDialog} aria-placeholder="overlay" class="fixed inset-0 bg-zinc-950/40"/>
    <section transition:flyAndScale={{x: 3}} class="w-4/12 ml-auto h-full bg-zinc-100 dark:bg-zinc-900 shadow-md rounded-l-xl p-3 pb-5 flex flex-col gap-4 justify-between overflow-y-auto relative z-[70]">
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
            </section>
  
            <section class="flex flex-col gap-1">
              <a href={`/m/${mangaData.id}#${data.id}`} class="py-2 px-3 flex items-center bg-zinc-300/50 hover:bg-zinc-300 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
                <i class="icon icon-ic_fluent_news_20_regular flex text-3xl"/>
                <p class="">Manga's page</p>
              </a>
            </section>
          </section>
        </section>
  
        <section class="flex items-center justify-between p-3">
          {#if previousChapter !== null}
            <a href={`/m/${mangaData.id}/ch-${previousChapter.id}`} title={`Previous Chapter`} class="focus:ring-0 focus:outline-none relative bg-zinc-300/50 hover:bg-zinc-300 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 px-3 py-1 rounded-lg flex items-center justify-center">
              Previous
            </a>
          {:else}
            <p title={`No Previous Chapter`} class="relative px-3 py-1 rounded-lg flex items-center justify-center opacity-20">
              Beginning
            </p>
          {/if}

          <p class="opacity-60">Chapter</p>

          {#if nextChapter !== null}
            <a  href={`/m/${mangaData.id}/ch-${nextChapter.id}`} title={`Next Chapter`} class="focus:ring-0 focus:outline-none relative bg-zinc-300/50 hover:bg-zinc-300 dark:bg-zinc-800/50 dark:hover:bg-zinc-800  px-3 py-1 rounded-lg flex items-center justify-center">
              Next
            </a>
          {:else}
            <p title={`No Next Chapter`} class="relative px-3 py-1 rounded-lg flex items-center justify-center opacity-20">
              The end
            </p>
          {/if}
        </section>
      </section>
    </section>
  </section>
{/if}