<script lang="ts">
  import { getThumbnail, shuffle } from '$lib/utils';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { Image } from "@unpic/svelte";
  import tags from "$lib/tags.json"
  import sampleData from "$lib/sampleData.json"
  import { Button } from "$lib/components/ui/button";
  import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import Pill from "$lib/components/Pill.svelte"
  import ItemCard from '$lib/components/ItemCard.svelte';
  import ItemCardTwo from '$lib/components/ItemCardTwo.svelte';
  import ItemCardThree from '$lib/components/ItemCardThree.svelte';
  import ItemCardFour from '$lib/components/ItemCardFour.svelte';
  import ImageCard from '$lib/components/ImageCard.svelte';
 
    
  export let data: PageData;
  // import { data } from './+page';
  const mangaData = data.data ? data.data : sampleData.data
  // console.log(mangaData)

  // const listOfTags = ["All", ...shuffle(tags.data).slice(0, 20)]
  const listOfTags = shuffle(tags.data).slice(0, 20)
  const placeholders = new Array(20)

  const precious_her = "08059585629"
</script>

<section class="w-full py-2 md:px-2 md:py-4 flex flex-col gap-2.5 md:gap-4 snap snap-y snap-mandatory">

  <section class="w-full md:w-8/12 md:mx-auto mt-1">
    <section class="flex overflow-x-scroll sm-scrollbar rounded-scrollbar sm-hide-scrollbar py-1 px-4 md:px-0">
      <section class="flex flex-nowrap gap-2.5 lg:gap-4 snap-x snap-mandatory">
        {#each listOfTags as eachTag}
          <section class="flex"><Pill
            link={`/tag/${eachTag.id}`}
            title={Object.values(eachTag.attributes.name)[0]}
          /></section>
        {:else}
          <!-- empty list -->
        {/each}
      </section>
    </section>
  </section>

  <section class="w-full flex flex-col gap-8 md:gap-12 md:pb-0">

    
    <!-- autoplay
    pauseOnFocus
    autoplayDuration={2000}
    dots={false}
    class={"w-full h-full"} -->
    <section class="w-full md:w-10/12 md:mx-auto h-full flex flex-col md:flex-row gap-4">
      <!-- lay 1 -->
      <section class="w-full md:w-6/12 h-80 md:h-[28rem]">
        <Carousel.Root class="w-full max-w-xs">
          <Carousel.Content>
            {#each Array(5) as _, i (i)}
              <Carousel.Item>
                <div class="p-1">
                  <Card.Root>
                    <Card.Content
                      class="flex aspect-square items-center justify-center p-6"
                    >
                      <span class="text-4xl font-semibold">{i + 1}</span>
                    </Card.Content>
                  </Card.Root>
                </div>
              </Carousel.Item>
            {/each}
          </Carousel.Content>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel.Root>
      </section>

      <!-- lay 2 only on small screen -->
      <section class="w-full md:px-6 space-y-3 snapstart md:hidden">
        <h4 class="text-xl font-semibold px-4 md:px-0">
          Feel that reiatsu huh?
        </h4>
        <section class="flex overflow-x-scroll sm-scrollbar rounded-scrollbar sm-hide-scrollbar py-1 px-4 md:px-0">
          <section class="flex flex-nowrap gap-2 md:gap-3 snap-x snap-mandatory">
            {#each mangaData as eachItem}
              <ItemCardThree item={eachItem}/>
            {:else}
              <section class="rounded-lg w-32 lg:w-60 h-44 lg:h-60 bg-zinc-300 dark:bg-zinc-700"/>
            {/each}
          </section>
        </section>
      </section>
      
      <!-- lay 3 -->
      <section class="w-full md:w-6/12 md:h-[27rem] flex flex-col gap-4 px-4 py-2 md:p-0">
        <section class="w-full h-64 md:h-3/6 flex gap-4">
          <section class="w-6/12 h-full rounded-lg">
            <ItemCardTwo item={mangaData[0]}/>
          </section>
          <section class="w-6/12 h-full rounded-lg">
            <ItemCardTwo item={mangaData[0]}/>
          </section>
        </section>
        <section class="w-full h-64 md:h-3/6 flex gap-4">
          <section class="w-6/12 h-full rounded-lg">
            <ItemCardTwo item={mangaData[0]}/>
          </section>
          <section class="w-6/12 h-full rounded-lg">
            <ItemCardTwo item={mangaData[0]}/>
          </section>
        </section>
      </section>
    </section>
    
    <section class="w-full md:w-10/12 md:mx-auto flex flex-col gap-8 md:gap-12">
      <!-- lay 4 -->
      <section class="w-full space-y-2 snapstart">
        <h4 class="text-xl font-semibold px-4 md:px-0">
          Check this out
        </h4>
        <section class="flex overflow-x-scroll sm-scrollbar rounded-scrollbar sm-hide-scrollbar py-1 px-4 md:px-0">
          <section class="flex flex-nowrap gap-2 md:gap-3 snap-x snap-mandatory">
            {#each mangaData as eachItem}
              <ItemCardThree item={eachItem}/>
            {:else}
              <section class="rounded-lg w-32 lg:w-60 h-44 lg:h-60 bg-zinc-300 dark:bg-zinc-700"/>
            {/each}
          </section>
        </section>
      </section>
    
      <!-- lay 5 -->
      <section class="w-full rounded-lg px-4 md:p-0 flex flex-col md:flex-row md:items-center md:justify-center gap-3">
        <section class="w-full md:w-6/12 h-72">
          <ItemCardTwo item={mangaData[0]}/>
        </section>
        <section class="w-full md:w-6/12 h-72 hidden md:block">
          <ItemCardTwo item={mangaData[0]}/>
        </section>
      </section>

      <!-- lay 6 -->
      <section class="w-full space-y-3 snapstart">
        <h4 class="text-xl font-medium px-4 md:px-0">
          Bling Bang Bang Born
        </h4>
        <section class="flex overflow-x-scroll sm-scrollbar rounded-scrollbar sm-hide-scrollbar py-1 px-4 md:px-0">
          <section class="flex flex-nowrap gap-2 md:gap-3 snap-x snap-mandatory">
            {#each mangaData as eachItem}
              <!-- <section class=""> -->
                <ItemCardThree item={eachItem}/>
              <!-- </section> -->
              <!-- <section class="flex">
                <a href={`/`} title={``} class="w-full h-full focus:ring-0 focus:outline-none flex flex-col gap-2 relative">
                  <section class={`w-full h-full overflow-hidden rounded-lg relative flex flex-col bg-zinc-300 dark:bg-zinc-700 `}>
                    <img src="/imgs/thumbnails/tokyo-revengers.jpg" alt={``} class="w-full h-full object-cover"/>
                  </section>
                  <section class="w-full h- flex flex-col z-10 p-2">
                    <h4 class="font-medium text-ellipsis line-clamp-1">{eachItem.id}</h4>
                    <p class="text-xs uppercase opacity-60 whitespace-nowrap"># item</p>
                  </section>
                </a>
              </section> -->
            {:else}
              <section class="rounded-lg w-32 lg:w-60 h-44 lg:h-60 bg-zinc-300 dark:bg-zinc-700"/>
            {/each}
          </section>
        </section>
      </section>

      <!-- lay 8 -->
      <section class="w-full h-[35rem] md:h-[30rem] overflow-hidden relative flex gap-3">
        {#await getThumbnail(mangaData[0])}
          <section class="w-full md:w-6/12 h-full object-cover sticky md:relative md:rounded-lg bg-zinc-300 dark:bg-zinc-700"/>
        <!-- <Skeleton injClass={"w-full md:w-6/12 h-full object-cover sticky md:relative md:rounded-lg bg"}/> -->
        {:then value}
          <!-- promise was fulfilled -->
        <img src={value} alt={`${Object.values(mangaData[0].attributes.title)[0]}`} class="w-full md:w-5/12 h-full object-cover object-top sticky md:relative md:rounded-lg">
        {/await}

        <section class="w-full h-full absolute top-0 left-0 z-10 bg-gradient-to-b from-transparent via-zinc-100/90 dark:via-zinc-950/90 to-zinc-100 dark:to-zinc-950 md:hidden"/>
        
        <section class="w-full md:w-7/12 flex flex-col gap-6 md:gap-4 justify-between z-10 p-4 md:px-2 md:py-4 absolute md:relative bottom-0">
          <section class="flex flex-col gap-6 md:gap-4">
            <section class="flex flex-col gap-1.5">
              <!-- <Skeleton type="p" /> -->
              <h4 class="font-semibold text-ellipsis text-2xl md:text-3xl">{Object.values(mangaData[0].attributes.title)[0]}</h4>
              <p class="text-xs uppercase opacity-60 whitespace-nowrap"># {mangaData[0].attributes?.status}</p>
            </section>

            <section class="flex flex-wrap gap-2 snap-x snap-mandatory">
              {#each mangaData[0].attributes.tags as eachTag}
                <section class="flex"><Pill
                  link={`/tag/${eachTag.id}`}
                  title={`${Object.values(eachTag.attributes.name)[0]}`}
                  style={"text-sm"}
                /></section>
              {/each}
            </section>
            <article class="text-sm font-bold opacity-70 line-clamp-4 md:line-clamp-none">{mangaData[0].attributes.description.en ? mangaData[0].attributes.description.en : Object.values(mangaData[0].attributes.description)[0]}</article>
          </section>
          
          <section class="flex mt-3 pb-1">
            <a href={`/${mangaData[0].id}`} title={`title`} class="focus:ring-0 focus:outline-none relative bg-main-green w-28 py-1.5 rounded-lg flex items-center justify-center">
              Read
            </a>
          </section>
        </section>
      </section>
    </section>

    <section class="w-full md:w-10/12 md:mx-auto flex flex-col gap-8 md:gap-12 pt-10">
      
      <!-- lay 9 -->
      <section class="w-full md:w-6/12 md:h-[27rem] flex flex-col gap-4 px-4 py-2 md:p-0">
        <section class="w-full h-64 md:h-3/6 flex gap-4">
          <section class="w-6/12 h-full rounded-lg">
            <ItemCardTwo item={mangaData[0]}/>
          </section>
          <section class="w-6/12 h-full rounded-lg">
            <ItemCardTwo item={mangaData[0]}/>
          </section>
        </section>
        <section class="w-full h-64 md:h-3/6 flex gap-4">
          <section class="w-6/12 h-full rounded-lg">
            <ItemCardTwo item={mangaData[0]}/>
          </section>
          <section class="w-6/12 h-full rounded-lg">
            <ItemCardTwo item={mangaData[0]}/>
          </section>
        </section>
      </section>

      <!-- lay 10 -->
      <section class="w-full rounded-lg px-4 md:p-0 flex flex-col md:flex-row md:items-center md:justify-center gap-3">
        <section class="w-full md:w-6/12 h-72">
          <ItemCardTwo item={mangaData[0]}/>
        </section>
        <section class="w-full md:w-6/12 h-72 hidden md:block">
          <ItemCardTwo item={mangaData[0]}/>
        </section>
      </section>

      <!-- lay 11 -->
      <section class="w-full space-y-2 snapstart">
        <h4 class="text-xl font-semibold px-4 md:px-0">
          Nandato?
        </h4>
        <section class="flex overflow-x-scroll sm-scrollbar rounded-scrollbar sm-hide-scrollbar py-1 px-4 md:px-0">
          <section class="flex flex-nowrap gap-2 md:gap-3 snap-x snap-mandatory">
            {#each mangaData as eachItem}
              <ItemCardThree item={eachItem}/>
            {:else}
              <section class="rounded-lg w-32 lg:w-60 h-44 lg:h-60 bg-zinc-300 dark:bg-zinc-700"/>
            {/each}
          </section>
        </section>
      </section>
    
      <!-- lay 10 -->
      <section class="w-full h-72 rounded-lg px-4 md:p-0 md:hidden flex flex-col md:flex-row md:items-center md:justify-center gap-3">
        <ItemCardTwo item={mangaData[0]}/>
      </section>

      <!-- lay 12 -->
      <section class="w-full md:w-6/12 md:h-[27rem] flex flex-col gap-4 px-4 py-2 md:p-0">
        <section class="w-full h-64 md:h-3/6 flex gap-4">
          <section class="w-6/12 h-full rounded-lg">
            <ItemCardTwo item={mangaData[0]}/>
          </section>
          <section class="w-6/12 h-full rounded-lg">
            <ItemCardTwo item={mangaData[0]}/>
          </section>
        </section>
        <section class="w-full h-64 md:h-3/6 flex gap-4">
          <section class="w-6/12 h-full rounded-lg">
            <ItemCardTwo item={mangaData[0]}/>
          </section>
          <section class="w-6/12 h-full rounded-lg">
            <ItemCardTwo item={mangaData[0]}/>
          </section>
        </section>
      </section>
    </section>

  </section>

  <!-- <section class="">
    {JSON.stringify(mangaData[0])}
  </section> -->

  <!-- below mark -->
  <section class="w-full py-5 flex items-center justify-center">
    <a href="http://github.com/tcitrogg" class="">
      <h2 class="opacity-50 hover:opacity-70">
        <span class="italic">thy</span>
        <span class="">tsurgeon</span>
      </h2>
    </a>
  </section>
</section>
