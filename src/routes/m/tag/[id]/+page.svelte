<script lang="ts">
  import { page } from '$app/stores';
  import Metahead from '$lib/components/Metahead.svelte';
    import Nav from '$lib/components/Nav.svelte';
  import Pill from '$lib/components/Pill.svelte';
  import Avatar from 'svelte-boring-avatars';
  import dgData from "$lib/dgData.json";
  // import type { PageData } from './$types';

  // export let data: PageData;
  const title = "Thy demigod"
  const description = `data.data.attributes.description.en ? data.data.attributes.description.en : Object.values(data.data.attributes.description)[0]`
  const year = 2023
  // handleFetch()

  let avatarColors = ["#1DB954", "#121212"]

  // variants = ["marble", "beam", "pixel", "sunset", "ring", "bauhaus"]

  const listOfBook = dgData.books
</script>


<Metahead
  title={`${title}`}
  description={`${description}`}
  keywords={title}
/>

<Nav/>

<!-- <section class="w-full h-full hidden md:block bg-gradient-to-b from-neutral-100/50 to-neutral-100 dark:from-neutral-950/50 dark:to-neutral-950 -z-10 absolute top-0"/> -->

<section class="w-full h-full relative">
  <img src="/imgs/thumbnails/extended-realm.jfif" alt={`extended-realm.jfif`} class="w-full h-full object-cover fixed top-0 left-0 blur-sm opacity-20 dark:opacity-40"/>
  <section class="w-full h-smscreen md:h-screen fixed top-0 left-0 z-0 bg-gradient-to-b from-zinc-100/80 dark:from-zinc-950/80 via-zinc-100/95 dark:via-zinc-950/95 to-zinc-100 dark:to-zinc-950"/>
  
  <section class="w-full h-full overflow-y-auto relative z-10">
    <section class="w-full md:w-10/12 md:mx-auto lg:w-9/12 h-full flex flex-col gap-4 md:gap-8">
      <section class="w-full flex flex-col gap-6 p-4 pt-20 md:p-10 bg-zinc-200/20 dark:bg-zinc-950/20 backdrop-blur-2xl sticky -top-14 lg:top-0 left-0 z-10 justify-center">
        <section class="flex flex-col gap-3">
          <section class="flex items-start gap-4">

            <section class="w-12 md:w-20 h-12 md:h-20 bg-gradient-to-brfrom-slate-700to-amber-500 ring-4 ring-emerald-500/50 rounded-full overflow-hidden flex items-center justify-center">
              <Avatar
                name={title}
                size={100}
                square={false}
                colors={avatarColors}
                variant={"sunset"}
              />
            </section>
  
            <h2 class="font-semibold text-3xl pt-0.5">{title}</h2>
          </section>
        </section>
      </section>
  
      <section class="w-full px-4">
        <hr class="border-zinc-200 dark:border-zinc-800 rounded-full">
      </section>
  
      <!-- {/* books */} -->
      <section class="divide-ydivide-zinc-300dark:divide-zinc-700 flex flex-col py-4">
        <h4 class="text-lg px-4">
          <span class="opacity-50">#</span>
          <!-- <span class="font-semibold">Volumes & Books</span> -->
          <span class="font-semibold">Books</span>
        </h4>
        
        <section class="w-full space-y-2 pt-2 md:pt-4 flex flex-col gap-1">
          {#each listOfBook as eachBook, index}
            <a href={`/eachBook`} class="">
              <section class="w-full hover:bg-main/10 border-bborder-b-main-green/5 flex px-4 divide-xdivide-zinc-300dark:divide-zinc-700 gap-1">
                <!-- <section class="w-1/12 flex items-center justify-center gap-2">
                  <article class="" title="Book">00{index+1}</article>
                </section> -->
                <section class="w-12 h-16 bg-gradient-to-br from-slate-700 to-amber-500 overflow-hidden">
                  <img src="/imgs/thumbnails/extended-realm.jfif" alt={`extended-realm.jfif`} class="z-0 w-full h-full object-cover"/>
                </section>
                <article class="flex items-center pl-3">{eachBook}</article>
              </section>
            </a>
          {/each}
          <section class="h-20"></section>
        </section>
      </section>
  
      <section class="w-full py-5 opacity-10 flex items-center justify-center">thy tsurgeon</section>
    </section>
  </section>
</section>