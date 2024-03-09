<script lang="ts">
  import { page } from '$app/stores';
  import Metahead from '$lib/components/Metahead.svelte';
    import Nav from '$lib/components/Nav.svelte';
  import Pill from '$lib/components/Pill.svelte';
  import Avatar from 'svelte-boring-avatars';
  import dgData from "$lib/dgData.json";
    import { metainfo } from '$lib/config';
    import { slide } from 'svelte/transition';
    import YoursTcitrogg from '$lib/components/YoursTcitrogg.svelte';
    import { getRandomColor, shuffle } from '$lib/utils';
  // import type { PageData } from './$types';

  // export let data: PageData;
  const title = "Tsurgeon"
  // const description = data.data.attributes.description.en ? data.data.attributes.description.en : Object.values(data.data.attributes.description)[0]

  // Just placeholder for now
  const description = dgData.tag.attributes.description.en ? dgData.tag.attributes.description.en : Object.values(dgData.tag.attributes.description)[0]
  const year = 2023

  let tagId = $page.params["id"]
  tagId = tagId === null ? "Not known" : tagId.toLocaleLowerCase()
  const isTsurgeonTag = tagId === "tsurgeon" ? true : false
  let tagColor = isTsurgeonTag ? metainfo.color_band : Array.from({ length: 2 }, () => getRandomColor())

  // handleFetch()

  // let avatarColors = ["#1DB954", "#121212"]

  // variants = ["marble", "beam", "pixel", "sunset", "ring", "bauhaus"]

  const listOfBook = dgData.books
</script>


<Metahead
  title={`${title}`}
  description={`${description}`}
  keywords={title}
/>

<Nav/>

<section transition:slide={{duration:80}} class="w-full h-smscreen md:h-screen sticky flex flex-col">
  <section class="w-full h-full overflow-y-auto md:py7 lg:px-10">

    <section class="w-full md:w-9/12 md:mx-auto">
      <!-- Account -->
      <section class="w-full bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md rounded-b-lg md:roundedlg py-5 md:p-4 px-3 flex justify-between items-center sticky top-0 z-10">
        <section class="flex items-center gap-3 md:py-3 px4">
          <section class="rounded-full relative bg-green-400">
            <!-- name={`${metainfo.avatar_prefix}${user.username}`} -->
            <Avatar
              name={tagId}
              size={55}
              square={false}
              colors={tagColor}
              variant={"sunset"}
            />
            {#if isTsurgeonTag}
              <i class="icon icon-ic_fluent_circle_off_20_filled flex text-xl absolute -bottom-2 -right-1 rounded-full bg-zinc-50/70 dark:bg-zinc-950/70 md:bg-zinc-100/70 md:dark:bg-zinc-900/70 backdrop-blur-sm p-1 text-main"/>
            {:else}
              <i class="icon icon-ic_fluent_tag_20_filled flex text-xl absolute top-1/4 right-1/4 rounded-full bg-zinc-50/70 dark:bg-zinc-950/70 md:bg-zinc-100/70 md:dark:bg-zinc-900/70 backdrop-blur-sm p-1"/>
            {/if}
          </section>
      
          <section class="flex flex-col -space-y-0.5">
            <h3 class="font-medium text-xl flex">
              <span>{tagId}</span>
              <span class="opacity-10">.tag</span>
            </h3>
          </section>
        </section>
      </section>
      
      <!-- <section class="w-full px-5">
        <hr class="border-zinc-200 dark:border-zinc-800 rounded-full">
      </section> -->

      <!-- Results -->
      <section class="w-full md:bg-zinc-100md:dark:bg-zinc-900/60 rounded-lg md:py-4 px-3 flex flex-col gap-2 justify-between">
        <section class="h-full flex flex-col gap-2">
          <p class="opacity-80">
            <span class="opacity-50">#</span>
            <span class="font-semibold">Books</span>
          </p>

          <ul class="h-full flex flex-col gap-2">
            {#each shuffle(dgData.books) as eachItem}
              <a href={`/m/${eachItem.id}`} class="ring-2 ring-transparent focus:ring-main/50 focus:outline-none">
                <section class="w-full flex rounded-xl p-1 gap-3 hover:bg-zinc-200 dark:hover:bg-zinc-900">
                  <section class="w-16 h-20 bg-gradient-to-br from-main to-zinc-950 rounded-lg overflow-hidden">
                    <img src="{eachItem.thumbnail}" alt="" class="z-0 w-full h-full object-cover"/>
                  </section>
                  <h4 class="w-9/12 line-clamp-3 py-2">{eachItem.title}</h4>
                </section>
              </a>
            {:else}
              <section class="h-full flex flex-col gap-4 justify-between">
                <section class="flex gap-3">
                  <i class="icon icon-ic_fluent_box_multiple_search_20_regular flex text-5xl py-1"/>

                  <h4 class="font-medium text-2xl">Sorry! don't think there is something like that.</h4>
                </section>

                <section class="">
                  <button class="py-2 px-3 md:px-6 flex items-center bg-zinc-200/50 hover:bg-zinc-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
                    <i class="icon icon-ic_fluent_home_20_regular flex text-2xl md:text-3xl"/>
                    <p class="">Go Home</p>
                  </button>
                </section>
              </section>
            {/each}
    
            <section class="py-10 opacity-0 text-center block md:py-5"><em>That's all we've got</em></section>
          </ul>
        </section>
      </section>
    </section>

    <!-- yours Tcitrogg -->
    {#if isTsurgeonTag}
      <section class="w-full py-10">
        <YoursTcitrogg/>
      </section>
    {/if}
  </section>
</section>