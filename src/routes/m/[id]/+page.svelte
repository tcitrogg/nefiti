<script lang="ts">
  import { page } from '$app/stores';
  import Metahead from '$lib/components/Metahead.svelte';
  import Pill from '$lib/components/Pill.svelte';
  import CopyLinkBtn from '$lib/components/CopyLinkBtn.svelte';
  import type { PageData } from './$types';
  import Image from '$lib/components/Image.svelte';
  import { getThumbnail } from '$lib/utils';

  export let data: PageData;
  const mangaData = data

  const title = `${Object.values(mangaData.attributes.title)[0]}`
  const description = Object.values(mangaData.attributes.description)[0] ?? ""
  const keywords = mangaData.attributes.tags.map((eachTag:any)=>Object.values(eachTag.attributes.name)[0])
  // const date = new Date(mangaData.attributes.createdAt)
  const year = mangaData.attributes.year ?? mangaData.attributes.createdAt.slice(0,4)
  // handleFetch()

  console.log(mangaData)

  let mangaThumbnail = getThumbnail(mangaData);
</script>

<Metahead
  title={`${title}`}
  description={`${description}`}
  keywords={keywords}
  seoType="NewsArticle"
  createdAt={`${mangaData.attributes.createdAt}`}
  updatedAt={`${mangaData.attributes.updatedAt}`}
  image={mangaThumbnail}
/>

<!-- <section class="w-full h-full hidden md:block bg-gradient-to-b from-neutral-100/50 to-neutral-100 dark:from-neutral-950/50 dark:to-neutral-950 -z-10 absolute top-0"/> -->

<section class="w-full h-full">
  
  <img src="{mangaThumbnail}" alt={title} class="w-full h-full object-cover fixed top-0 left-0 blur-sm opacity-20 dark:opacity-40">
  <section class="w-full h-smscreen md:h-screen fixed top-0 left-0 z-10 bg-gradient-to-b from-zinc-100/80 dark:from-zinc-950/80 via-zinc-100/95 dark:via-zinc-950/95 to-zinc-100 dark:to-zinc-950"/>  

  <section class="w-full h-full relative z-10 md:px-4 overflow-y-auto">

    <section class="w-full lg:w-10/12 md:mx-auto flex flex-col gap-4 lg:gap-8">
      <section class="w-full flex md:flex-row flex-col md:gap-4 md:pt-8 lg:pt-14">
        <section class="w-full md:w-4/12">
          <section class="w-full h-96">
            <section class="skew-b w-full h-full md:rounded-2xl sticky top-0 left-0 bg-zinc-300 dark:bg-zinc-800 overflow-hidden">
              <Image
                src="{mangaThumbnail}"
                alt="{title}"
              />
              <!-- <img src={mangaThumbnail} alt={`${title}`} class="z-0 w-full h-full object-cover object-top" loading="lazy"> -->
            </section>
          </section>
        </section>
  
        <section class="w-full md:w-8/12 flex flex-col gap-6 p-4 lg:p-10 md:pt-4">
          <section class="flex flex-col gap-3">
            <section class="flex items-start justify-between">
              <h2 class="font-semibold text-3xl">{title}</h2>
              
              <CopyLinkBtn content={`${$page.url}`}/>
            </section>
  
            <!-- {mangaThumbnail} -->
            
            <!-- <p class="whitespace-nowrap">{$page.url}</p> -->
            <article class="">{description}</article>
            
            <!-- <section class="w-full flex">
              <section class="py-1 px-3 rounded-lg bg-zinc-950 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 text-sm font-semibold">
                <p class="whitespace-nowrap">{year}</p>
              </section>
            </section> -->
          </section>
          <section class="flex flex-col gap-4">
            <section class="flex flex-wrap gap-2.5 snap-x snap-mandatory">
              <section class="flex"><Pill
                link={`about:blank`}
                title={year}
                style={"text-sm py-1"}
                isActive={true}
              /></section>
              {#each mangaData.attributes.tags as eachTag}
                <section class="flex"><Pill
                  link={`/m/tag/${eachTag.id}`}
                  title={`${Object.values(eachTag.attributes.name)[0]}`}
                  style={"text-sm py-1"}
                /></section>
              {/each}
            </section>
          </section>
  
          <!-- <p class="text-sm">{date.toLocaleString()}</p> -->
          <!-- <p class="">{mangaData.attributes.year}</p> -->
        </section>
      </section>
  
      <section class="w-full px-4">
        <hr class="border-zinc-200 dark:border-zinc-800 rounded-full">
      </section>
  
      <!-- {/* chapters */} -->
      <section class="divide-ydivide-zinc-300dark:divide-zinc-700 flex flex-col py-4">
        <h4 class="text-lg px-4">
          <span class="opacity-50">#</span>
          <!-- <span class="font-semibold">Volumes & Chapters</span> -->
          <span class="font-semibold">Chapters</span>
        </h4>
  
        <section class="w-full space-y-2 pt-2 md:pt-4">
          {#each data.chapters as eachChapter, index}
            <a href={`/${$page.params.id}/c/${eachChapter.id}`} class="">
              <section class="w-full hover:bg-main/10 border-bborder-b-main-green/5 flex p-2 px-4 md:py-4 md:rounded-md divide-x divide-zinc-200 dark:divide-zinc-800 gap-3">
                <section class="flex items-center justify-center gap-2">
                  <!-- <article class="opacity-60" title="Volume">Vol. {eachChapter.attributes.volume}</article> -->
                  <article class="" title="Chapter">Chp. {eachChapter.attributes.chapter  }</article>
                </section>
                <article class="w-7/12 flex items-center pl-3">{eachChapter.attributes.title}</article>
              </section>
            </a>
          {/each}
          <section class="h-20"></section>
        </section>
      </section>
      
      <!-- <h1>{data.id}</h1> -->
      <!-- <section>{@html JSON.stringify(data, null, 3)}</section> -->
      <!-- <section>{@html JSON.stringify(data.chapters, null, 3)}</section> -->
      <!-- <p class="">{$page.params.id}</p> -->
  
      <section class="w-full py-5 opacity-5 flex items-center justify-center">rogg</section>
    </section>

  </section>
</section>