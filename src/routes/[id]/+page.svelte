<script lang="ts">
    import { page } from '$app/stores';
    import Metahead from '$lib/components/Metahead.svelte';
    import Pill from '$lib/components/Pill.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  const title = Object.values(data.data.attributes.title)[0]
  const description = data.data.attributes.description.en ? data.data.attributes.description.en : Object.values(data.data.attributes.description)[0]
  const keywords = data.data.attributes.tags.map((eachTag:any)=>Object.values(eachTag.attributes.name)[0])
  // const date = new Date(data.data.attributes.createdAt)
  const year = data.data.attributes.year
  // handleFetch()
</script>


<Metahead
  ogtitle={`${title}`}
  ogdescription={`${description}`}
  ogkeywords={keywords}
/>

<!-- <h1>{data.id}</h1>
<section>{@html JSON.stringify(data, null, 3)}</section> -->

<!-- <section class="w-full md:w-11/12 md:mx-auto py-2 md:py-4 flex flex-col space-y-3 md:space-y-6 snap snap-y snap-mandatory relative">
  lay 8
  <section class="w-full relative gap-3">
    <img src={data.cover_art} alt={`${Object.values(data.data.attributes.title)[0]}`} class="w-full md:w-10/12 md:mx-auto h-full object-cover fixed top-0 md:right-[4.3%]">
    <section class="w-full h-smscreen md:h-screen absolute top-0 left-0 z-10 bg-gradient-to-b from-transparent via-zinc-10/95 dark:via-zinc-950/95 to-zinc-100 dark:to-zinc-950"/>

    
    <section class="w-full flex flex-col justify-between z-10 p-4 pt-60 px-10 relative top-0 left-0 bg-gradient-to-b from-transparent via-zinc-950 to-zinc-950">
      <section class="flex flex-col gap-1.5">
        <h4 class="font-medium text-ellipsis text-xl md:text-2xl">{Object.values(data.data.attributes.title)[0]}</h4>
        <p class="text-xs uppercase opacity-60 whitespace-nowrap"># {data.data.attributes?.status}</p>
        <article class="text-sm text-neutral-300 font-bold opacity-70 line-clamp-4">{Object.values(data.data.attributes.description)[0]}</article>
      </section>

      <section class="w-full md:w-8/12 md:mx-auto mt-2">
        
      </section>

      <h1>{data.id}</h1>
      <section>{@html JSON.stringify(data, null, 3)}</section>
    </section>
  </section>
  
</section> -->


<section class="w-full h-full hidden md:block bg-gradient-to-b from-neutral-100/50 to-neutral-100 dark:from-neutral-950/50 dark:to-neutral-950 -z-10 absolute top-0"/>

<section class="w-full h-full overflow-y-auto">
  
  <img src={data.cover_art} alt={`${Object.values(data.data.attributes.title)[0]}`} class="w-full h-full object-cover fixed top-0 left-0 blur-sm opacity-20 dark:opacity-40">
  <section class="w-full h-smscreen md:h-screen fixed top-0 left-0 z-10 bg-gradient-to-b from-zinc-100/80 dark:from-zinc-950/80 via-zinc-100/95 dark:via-zinc-950/95 to-zinc-100 dark:to-zinc-950"/>  

  <section class="w-full md:w-10/12 md:mx-auto h-full flex flex-col gap-4 md:gap-8 relative z-10">
    <section class="w-full flex md:flex-row flex-col md:gap-4 md:pt-14">
      <section class="w-full md:w-4/12">
        <section class="w-full h-96">
          <section class="skew-b w-full h-full md:rounded-2xl bg-zinc-300 dark:bg-zinc-800 overflow-hidden">
            <img src={data.cover_art} alt={`${title}`} class="z-0 w-full h-full object-cover object-top">
          </section>
        </section>
      </section>

      <section class="w-full md:w-8/12 flex flex-col gap-6 p-4 md:p-10 md:pt-4">
        <section class="flex flex-col gap-3">
          <sectiom class="flex items-start justify-between">
            <h2 class="font-semibold text-3xl">{title}</h2>

            <section class="py-1.5 px-3 rounded-lg bg-zinc-950 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 font-semibold">
                <p class="whitespace-nowrap">{year}</p>
              </section>
          </sectiom>
          <article class="">{description}</article>
        </section>
        <section class="flex flex-col gap-4">
          <section class="flex flex-wrap gap-2.5 snap-x snap-mandatory">
            {#each data.data.attributes.tags as eachTag}
              <section class="flex"><Pill
                link={`/tag/${eachTag.id}`}
                title={`${Object.values(eachTag.attributes.name)[0]}`}
                style={"text-sm py-1"}
              /></section>
            {/each}
          </section>
        </section>

        <!-- <p class="text-sm">{date.toLocaleString()}</p> -->
        <!-- <p class="">{data.data.attributes.year}</p> -->
      </section>
    </section>

    <section class="w-full px-4">
      <hr class="border-zinc-300 dark:border-zinc-700 rounded-full">
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
            <section class="w-full hover:bg-main-green/10 border-bborder-b-main-green/5 flex p-2 px-4 md:py-4 md:rounded-md divide-x divide-zinc-300 dark:divide-zinc-700 gap-3">
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

    <section class="w-full py-5 opacity-10 flex items-center justify-center">thy tsurgeon</section>
  </section>
</section>