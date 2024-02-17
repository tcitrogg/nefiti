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
  // import Autoplay from "embla-carousel-autoplay";

  import Metahead from '$lib/components/Metahead.svelte';
  import Pill from "$lib/components/Pill.svelte"
  import ItemCard from '$lib/components/ItemCard.svelte';
  import ItemCardTwo from '$lib/components/ItemCardTwo.svelte';
  import ItemCardThree from '$lib/components/ItemCardThree.svelte';
  import ItemCardFour from '$lib/components/ItemCardFour.svelte';
    import { metainfo } from '$lib/config';
    
  export let data: PageData;
  // import { data } from './+page';
  const mangaData = data.data ? data.data : sampleData.data
  // .data.map((value)=>value.attributes.tags)
  // console.log(mangaData)

  // const listOfTags = ["All", ...shuffle(tags.data).slice(0, 20)]
  const listOfTags = shuffle(tags.data).slice(0, 20)
  const placeholders = new Array(20)

  // 2/15/2024
  const precious_her = "08059585629"

  // console.log(tags.data.map((value)=>value.attributes.name))
</script>

<Metahead/>

<section class="w-full py-2 md:px-4 md:py-4 flex flex-col gap-2.5 md:gap-4 snap snap-y snap-mandatory">

  <section class="w-full mt-1">
    <section class="flex overflow-x-scroll sm-scrollbar rounded-scrollbar sm-hide-scrollbar py-1 px-4 md:px-0">
      <section class="flex flex-nowrap gap-2.5 snap-x snap-mandatory">
        {#each listOfTags as eachTag}
          <section class="flex"><Pill
            link={`/tag/${eachTag.id}`}
            title={`${Object.values(eachTag.attributes.name)[0]}`}
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
    <section class="w-full md:mx-auto h-full flex flex-col md:flex-row gap-4">
      <!-- lay 1 -->
      <section class="w-full md:w-6/12 h-80 md:h-[28rem] relative bg-zinc-100 dark:bg-zinc-900 md:rounded-lg overflow-hidden">
          <!-- plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]} -->
        <Carousel.Root
          class="w-full h-80 md:h-[28rem] relative">
          <Carousel.Content>
            {#each shuffle(mangaData).slice(0, 7) as eachManga, i}
              <Carousel.Item class="w-full h-80 md:h-[28rem]">
                <ItemCard item={eachManga}/>
              </Carousel.Item>
            {/each}
          </Carousel.Content>
          <Carousel.Previous class="absolute left-4" />
          <Carousel.Next class="absolute right-4" />
          <!-- <section class="w-10/12 h-40 mr-auto absolute left-0 bg-amber-500/40 z-10">
          </section> -->
        </Carousel.Root>
      </section>

      <!-- lay 2 only on small screen -->
      <section class="w-full md:px-6 space-y-3 snapstart md:hidden">
        <h4 class="text-xl font-semibold px-4 md:px-0">
          Feel that reiatsu huh?
        </h4>
        <section class="flex overflow-x-scroll sm-scrollbar rounded-scrollbar sm-hide-scrollbar py-1 px-4 md:px-0">
          <section class="flex flex-nowrap gap-2 md:gap-3 snap-x snap-mandatory">
            {#each shuffle(mangaData) as eachItem}
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
            <ItemCardTwo item={mangaData[8]}/>
          </section>
        </section>
        <section class="w-full h-64 md:h-3/6 flex gap-4">
          <section class="w-6/12 h-full rounded-lg">
            <ItemCardTwo item={mangaData[5]}/>
          </section>
          <section class="w-6/12 h-full rounded-lg">
            <ItemCardTwo item={mangaData[2]}/>
          </section>
        </section>
      </section>
    </section>
    
    <section class="w-full md:mx-auto flex flex-col gap-8 md:gap-12">
      <!-- lay 4 -->
      <section class="w-full space-y-2 snapstart">
        <h4 class="text-xl font-semibold px-4 md:px-0">
          Check this out
        </h4>
        <section class="flex overflow-x-scroll sm-scrollbar rounded-scrollbar sm-hide-scrollbar py-1 px-4 md:px-0">
          <section class="flex flex-nowrap gap-2 md:gap-3 snap-x snap-mandatory">
            {#each shuffle(mangaData) as eachItem}
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
          <ItemCardTwo item={mangaData[7]}/>
        </section>
        <section class="w-full md:w-6/12 h-72 hidden md:block">
          <ItemCardTwo item={mangaData[0]}/>
        </section>
      </section>

      <!-- lay 6 -->
      <section class="w-full space-y-3 snapstart">
        <h4 class="text-xl font-semibold px-4 md:px-0">
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
      <section class="w-full h-[35rem] md:h-[30rem]">
        <ItemCardFour item={shuffle(mangaData)[4]}/>
      </section>
    </section>

    <section class="w-full md:mx-auto flex flex-col gap-8 md:gap-12 pt-10">
      
      <!-- lay 9 -->
      <section class="w-full flex gap-4">
        <section class="w-full md:w-6/12 md:h-[27rem] flex flex-col gap-4 px-4 py-2 md:p-0">
          <section class="w-full h-64 md:h-3/6 flex gap-4">
            <section class="w-6/12 h-full rounded-lg">
              <ItemCardTwo item={mangaData[8]}/>
            </section>
            <section class="w-6/12 h-full rounded-lg">
              <ItemCardTwo item={mangaData[7]}/>
            </section>
          </section>
          <section class="w-full h-64 md:h-3/6 flex gap-4">
            <section class="w-6/12 h-full rounded-lg">
              <ItemCardTwo item={mangaData[6]}/>
            </section>
            <section class="w-6/12 h-full rounded-lg">
              <ItemCardTwo item={mangaData[5]}/>
            </section>
          </section>
        </section>
        <section class="w-full md:w-6/12 md:h-[27rem] hidden md:flex flex-col gap-4 px-4 py-2 md:p-0">
          <section class="w-full h-64 md:h-3/6 flex gap-4">
            <section class="w-6/12 h-full rounded-lg">
              <ItemCardTwo item={mangaData[4]}/>
            </section>
            <section class="w-6/12 h-full rounded-lg">
              <ItemCardTwo item={mangaData[1]}/>
            </section>
          </section>
          <section class="w-full h-64 md:h-3/6 flex gap-4">
            <section class="w-6/12 h-full rounded-lg">
              <ItemCardTwo item={mangaData[0]}/>
            </section>
            <section class="w-6/12 h-full rounded-lg">
              <ItemCardTwo item={mangaData[1]}/>
            </section>
          </section>
        </section>
      </section>

      <!-- lay 10 -->
      <section class="w-full rounded-lg px-4 md:p-0 flex flex-col md:flex-row md:items-center md:justify-center gap-3">
        <section class="w-full md:w-6/12 h-72">
          <ItemCardTwo item={shuffle(mangaData)[2]}/>
        </section>
        <section class="w-full md:w-6/12 h-72 hidden md:block">
          <ItemCardTwo item={shuffle(mangaData)[3]}/>
        </section>
      </section>

      <!-- lay 11 -->
      <section class="w-full space-y-2 snapstart">
        <h4 class="text-xl font-semibold px-4 md:px-0">
          Nanda?
        </h4>
        <section class="flex overflow-x-scroll sm-scrollbar rounded-scrollbar sm-hide-scrollbar py-1 px-4 md:px-0">
          <section class="flex flex-nowrap gap-2 md:gap-3 snap-x snap-mandatory">
            {#each shuffle(mangaData) as eachItem}
              <ItemCardThree item={eachItem}/>
            {:else}
              <section class="rounded-lg w-32 lg:w-60 h-44 lg:h-60 bg-zinc-300 dark:bg-zinc-700"/>
            {/each}
          </section>
        </section>
      </section>
    
      <!-- lay 10 -->
      <section class="w-full h-72 rounded-lg px-4 md:p-0 md:hidden flex flex-col md:flex-row md:items-center md:justify-center gap-3">
        <ItemCardTwo item={shuffle(mangaData)[0]}/>
      </section>

      <!-- lay 12 -->
      <section class="w-full flex gap-4">
        <section class="w-full md:w-6/12 md:h-[27rem] flex flex-col gap-4 px-4 py-2 md:p-0">
          <section class="w-full h-64 md:h-3/6 flex gap-4">
            <section class="w-6/12 h-full rounded-lg">
              <ItemCardTwo item={shuffle(mangaData)[0]}/>
            </section>
            <section class="w-6/12 h-full rounded-lg">
              <ItemCardTwo item={shuffle(mangaData)[2]}/>
            </section>
          </section>
          <section class="w-full h-64 md:h-3/6 flex gap-4">
            <section class="w-6/12 h-full rounded-lg">
              <ItemCardTwo item={shuffle(mangaData)[4]}/>
            </section>
            <section class="w-6/12 h-full rounded-lg">
              <ItemCardTwo item={shuffle(mangaData)[6]}/>
            </section>
          </section>
        </section>
        <section class="w-full md:w-6/12 md:h-[27rem] hidden md:flex flex-col gap-4 px-4 py-2 md:p-0">
          <section class="w-full h-64 md:h-3/6 flex gap-4">
            <section class="w-6/12 h-full rounded-lg">
              <ItemCardTwo item={shuffle(mangaData)[1]}/>
            </section>
            <section class="w-6/12 h-full rounded-lg">
              <ItemCardTwo item={shuffle(mangaData)[3]}/>
            </section>
          </section>
          <section class="w-full h-64 md:h-3/6 flex gap-4">
            <section class="w-6/12 h-full rounded-lg">
              <ItemCardTwo item={shuffle(mangaData)[5]}/>
            </section>
            <section class="w-6/12 h-full rounded-lg">
              <ItemCardTwo item={shuffle(mangaData)[7]}/>
            </section>
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
