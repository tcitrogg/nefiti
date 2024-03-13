<script lang="ts">
    import CopyBtn from '$lib/components/CopyBtn.svelte';
    import Pill from '$lib/components/Pill.svelte';
    import { fly, slide } from 'svelte/transition';
    import type { PageData } from './$types';
    import { page } from '$app/stores';
    import Image from '$lib/components/Image.svelte';
    import Metahead from '$lib/components/Metahead.svelte';
    import Nav from '$lib/components/Nav.svelte';
    
    export let data: PageData;

    // let gotData = 
</script>

<Nav/>

<Metahead
  title={`${data.title}`}
  description={`${data.description}`}
  seoType="NewsArticle"
  createdAt={`${data.year}`}
  updatedAt={`${data.year}`}
  image={data.thumbnail}
/>
  <!-- keywords={.data.keywords} -->


{#if !(data.bookNotExist)}
  <section transition:slide={{duration:300}} class="w-full h-full">
  
    <img src="{data.thumbnail}" alt={data.title} class="w-full h-full object-cover fixed top-0 left-0 blur-sm opacity-20 dark:opacity-40">
    <section class="w-full h-smscreen md:h-screen fixed top-0 left-0 z-10 bg-gradient-to-b from-zinc-100/80 dark:from-zinc-950/80 via-zinc-100/95 dark:via-zinc-950/95 to-zinc-100 dark:to-zinc-950"/>  
  
    <section class="w-full h-full relative z-10 md:px-4 overflow-y-auto">
  
      <section class="w-full lg:w-10/12 md:mx-auto flex flex-col gap-4 lg:gap-8">
        <section class="w-full flex md:flex-row flex-col md:gap-4 md:pt-8 lg:pt-14">
          <section class="w-full md:w-4/12">
            <section class="w-full h-96">
              <!-- <a href="/" class="py-1 px-1 rounded-full bg-zinc-950 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 text-sm font-semibold ring-2 ring-transparent focus:ring-main/50 focus:outline-none flex md:hidden items-center gap-3 absolute top-2 left-2 z-10">
                <i class="icon icon-ic_fluent_home_20_regular flex text-2xl"/>
              </a> -->
              <section transition:slide={{axis: 'y'}} class="skew-b w-full h-full md:rounded-2xl sticky top-0 left-0 bg-zinc-300 dark:bg-zinc-800 overflow-hidden shadow-md">
                <Image
                  src="{data.thumbnail}"
                  alt="{data.title}"
                />
                <!-- <img src={mangaThumbnail} alt={`${title}`} class="z-0 w-full h-full object-cover object-top" loading="lazy"> -->
              </section>
            </section>
          </section>
    
          <section class="w-full md:w-8/12 flex flex-col gap-6 p-4 lg:p-10 md:pt-4">
            <section class="flex flex-col gap-3">
              <section class="flex items-start justify-between">
                <h2 transition:fly class="font-semibold text-3xl">{data.title}</h2>
                
                <CopyBtn content={`${$page.url}`}/>
              </section>

              <article class="">{data.description}</article>
              
            </section>
            <section class="flex flex-col gap-4">
              <section class="flex flex-wrap gap-2.5 snap-x snap-mandatory">
                <Pill
                  link={`#`}
                  title={data.year}
                  style={"text-sm py-1"}
                  isActive={true}
                />
                <Pill
                  link={`#`}
                  title={`# ${data.status}`}
                  style={"text-sm py-1"}
                  isActive={true}
                />
                <Pill
                  link={`#`}
                  title={data.language}
                  style={"text-sm py-1"}
                  isActive={true}
                />
                {#each data?.tags as eachTag}
                  <section class="flex"><Pill
                    link={"#"}
                    title={`${eachTag}`}
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
        <section class="divide-ydivide-zinc-300dark:divide-zinc-700 flex flex-col p-4 md:p-0 gap-4">
          {#each data?.chapters as item, index}
            <h3 class="text-2xl md:text-3xl">
              <span class="opacity-40">#{index+1}</span>
              <span class="font-medium">{item?.title}</span>
            </h3>
            <article class="w-full">
              {item?.content}
            </article>
          {:else}
            Nothing yet
          {/each}
          <section class="h-20"></section>
        </section>
    
        <!-- below mark -->
        <section class="w-full py-5 flex items-center justify-center">
            <a href="http://github.com/tcitrogg" class="">
            <h2 class="opacity-0 hover:opacity-70">
                <span class="italic">thy</span>
                <span class="">tsurgeon</span>
            </h2>
            </a>
        </section>
      </section>
  
    </section>
  </section>
{:else}
  <section class="w-full lg:w-10/12 md:mx-auto h-4/5 my-auto flex flex-col gap-4 lg:gap-8">
    <section class="h-full w-full md:rounded-lg p-4 md:p-0 flex flex-col justify-around">
        <section class="">
          <h4 class="font-medium text-3xl">Oops!</h4>
          <p class="text-lg">No story like that...</p>
        </section>
        
        <section class="">
            to back to Tsurgeon's page
        </section>
    </section>
  </section>
{/if}

