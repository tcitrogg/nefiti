<script lang="ts">
  import { slide } from "svelte/transition";
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import sampleData from "$lib/sampleData.json";
  import Nav from "$lib/components/Nav.svelte";
  import Logo from "$lib/components/Logo.svelte";
  import { metainfo } from "$lib/config";

  export let data: PageData;

  let searchTitle = $page.url.searchParams.get("title")
  sampleData.data = searchTitle === null ? [] : sampleData.data
  searchTitle = searchTitle === null ? "Not known" : searchTitle
  // data = searchTitle === null ? [] : data
</script>

<Nav/>

<section transition:slide={{duration:80}} class="w-full h-smscreen md:h-screen sticky flex flex-col">
  <section class="w-full h-full overflow-y-auto md:py-7 lg:px-10">
    <header class="w-full bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-lg py-3 px-4 sticky top-0 left-0 block md:hidden">
      <section class="flex md:hidden items-center gap-2">
        <Logo/>
  
        <!-- <span class="opacity-40">t/</span> -->
        <h1 class="text-xl font-semibold">
          {metainfo.title}
        </h1>
      </section>
    </header>
  
    <section class="w-full md:w-9/12 md:mx-auto h-full flex flex-col gap-8 px-4">
      <section class="flex flex-col gap-2  bg-zinc-50/80 dark:bg-zinc-950/80">
        <p class="opacity-80">Looking for:</p>
        <section class="flex gap-3">
          <i class="icon icon-ic_fluent_search_20_regular flex text-2xl md:text-3xl py-1.5"/>

          <h3 class="text-4xl font-bold">{searchTitle}</h3>
        </section>
      </section>
      
      <section class="h-full flex flex-col gap-2">
        <p class="opacity-80">Results:</p>

        <section>
          {@html JSON.stringify(data)}
        </section>

        <ul class="h-full flex flex-col gap-2">
          {#each sampleData.data as eachItem}
            <a href={`/m/${eachItem.id}`} class="ring-2 ring-transparent focus:ring-main/50 focus:outline-none">
              <section class="w-full flex rounded-xl p-1 gap-3 hover:bg-zinc-200 dark:hover:bg-zinc-900">
                <section class="w-16 h-20 bg-gradient-to-br from-main to-zinc-950 rounded-lg overflow-hidden"></section>
                <h4 class="w-9/12 line-clamp-3 py-2">{Object.values(eachItem.attributes.title)[0]}</h4>
              </section>
            </a>
          {:else}
            <section class="h-full flex flex-col gap-4 justify-between">
              <section class="flex gap-3">
                <i class="icon icon-ic_fluent_box_multiple_search_20_regular flex text-5xl py-1"/>

                <h4 class="font-medium text-2xl">Oops! got nothing on that.</h4>
              </section>

              <section class="">
                <button class="hidden py-2 px-3 md:px-6 lg:flex items-center bg-zinc-200/50 hover:bg-zinc-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
                  <i class="icon icon-ic_fluent_home_20_regular flex text-2xl md:text-3xl"/>
                  <p class="">Go Home</p>
                </button>
              </section>
            </section>
          {/each}
  
          <section class="py-14 opacity-20 text-center"><em>That's all we've got</em></section>
        </ul>
      </section>
    </section>
  </section>

</section>