<script>
  import { metainfo } from "$lib/config";
  import ThemeBtn from "$lib/components/ThemeBtn.svelte";
  import { getRandomColor, shuffle } from "$lib/utils";
  import Avatar from 'svelte-boring-avatars';
  // import sampleData from "$lib/sampleData.json"
  import tags from "$lib/tags.json"
  import { isAsideBarMinimised, layoutData } from "../../stores/layoutData";
  import { page } from "$app/stores";
    import { slide } from "svelte/transition";
  // import Button from "$lib/components/ui/button/button.svelte";
  // import Image from "$lib/components/Image.svelte";
  // let checkAsideBar = $isAsideBarMinimised
  // $: lengthOfData = checkAsideBar ? 3 : 5
  
  const handleAsideBarMinimise = ()=>{
    isAsideBarMinimised.set(!$isAsideBarMinimised)
    // lengthOfDataIfAsideBarIsMinimised.set($isAsideBarMinimised ? 3 : 5)
  }

  const data = shuffle(tags.data).slice(0,4)
  // ?? shuffle(sampleData.data).slice(0, 4)
  // const data = $layoutData.length !== 0 ? $layoutData : shuffle(sampleData.data).slice(0,$isAsideBarMinimised ? 4 : 5)
</script>

<section class="{$isAsideBarMinimised ? "md:w-[10%] lg:w-[7%]" : "md:w-[30%] lg:w-[20%]"} h-full md:block hidden items-center justify-center fixed z-50 top-0 left-0">
  <aside class="w-full h-full px-4 {$isAsideBarMinimised ? 'md:py-5' : 'md:p-4'} lg:py-5 flex flex-col gap-5 items-center justify-between">
    <section class="w-full flex flex-col gap-5">
      <section class="w-full flex {$isAsideBarMinimised ? 'flex-col' : ''} items-center gap-2 pl-1">
        <button on:click={handleAsideBarMinimise} class="px-2 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-900 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-full {$isAsideBarMinimised ? 'order-2' : 'order-1'}">
          {#if $isAsideBarMinimised}
            <i transition:slide class="icon icon-ic_fluent_re_order_dots_horizontal_20_regular flex text-3xl"/>
          {:else}
            <i transition:slide class="icon icon-ic_fluent_re_order_dots_vertical_20_regular flex text-3xl"/>
          {/if}
        </button>
  
        <section class="flex items-center {$isAsideBarMinimised ? 'order-1 justify-center py-2' : 'order-2 gap-2'}">
          <img src="/favicon.svg" alt="[ni]" class="w-6 block dark:hidden">
          <img src="/favicon-light.svg" alt="[ni]" class="w-6 hidden dark:block">
  
          <!-- <span class="opacity-40">t/</span> -->
          <h1 class="text-xl font-semibold">
            {#if !$isAsideBarMinimised}
            {metainfo.title}
            {/if}
          </h1>
        </section>
      </section>
  
      <section class="w-full flex flex-col gap-2">
        <a href='/' aria-current={$page.url.pathname === '/' ? 'page' : undefined} class="navbtn py-1.5 px-3 flex items-center {$isAsideBarMinimised ? 'justify-center' : ''} focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
          <i class="icon icon-ic_fluent_home_20_{$page.url.pathname === '/' ? 'filled' : 'regular'} flex text-3xl"/>
          {#if !$isAsideBarMinimised}
            <p class="text-">Home</p>
          {/if}
        </a>
        <a href='/lib' aria-current={$page.url.pathname === '/lib' ? 'page' : undefined} class="navbtn py-1.5 px-3 flex items-center {$isAsideBarMinimised ? 'justify-center' : ''} focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
          <i class="icon icon-ic_fluent_library_20_{$page.url.pathname === '/lib' ? 'filled' : 'regular'} flex text-3xl"/>
          {#if !$isAsideBarMinimised}
            <p class="text-">Library</p>
          {/if}
        </a>
        <a href='#search' aria-current={$page.url.pathname.endsWith("#search") ? 'page' : undefined} class="navbtn py-1.5 px-3 flex items-center {$isAsideBarMinimised ? 'justify-center' : ''} focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
          <i class="icon icon-ic_fluent_search_20_{$page.url.pathname.endsWith('#search') ? 'filled' : 'regular'} flex text-3xl"/>
          {#if !$isAsideBarMinimised}
            <p class="text-">Search</p>
          {/if}
        </a>
      </section>
  
      <section class="w-full md:h-2/6 lg:h-auto {$isAsideBarMinimised ? 'md:hidden lg:flex' : ''} md:overflow-y-auto lg:overflow-auto rounded-lg bg-zinc-200 dark:bg-zinc-900 flex flex-col gap-1 p-1">
        {#each data as eachTag}
          <a href={`/m/${eachTag.id}`} title={`${Object.values(eachTag.attributes.name)[0]}`} class="w-full h-full focus:ring-0 focus:outline-none flex flex-col gap-2 relative">
            <section class="w-full rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-800 p-2 flex items-center {$isAsideBarMinimised ? 'justify-center' : ''} gap-2">
              <Avatar
                name={eachTag.id}
                size={35}
                square={false}
                colors={Array.from({ length: 3 }, () => getRandomColor())}
                variant={"sunset"}
              />
              {#if !$isAsideBarMinimised}
                <p class="w-10/12 line-clamp-1">{`${Object.values(eachTag.attributes.name)[0]}`}</p>
              {/if}
              <!-- <Image src={} alt={}/> -->
            </section>
          </a>
        {/each}
      </section>
    </section>
  
    <section class="w-full flex flex-col gap-2">
      <!-- <a href='#' class="py-1.5 px-3 flex items-center justify- ring-2 ring-transparent focus:ring-main focus:outline-none text-main rounded-lg gap-4 bg-main/10">
        <p class="text-">Mode</p>
      </a> -->
      <ThemeBtn style="py-1.5 px-3 flex items-center {$isAsideBarMinimised ? 'justify-center' : ''} ring-2 ring-transparent focus:ring-main/50 focus:outline-none rounded-lg gap-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-900" bg={""} iconSize={"3xl"}>
        {#if !$isAsideBarMinimised}
          <p class="text-">Theme</p>
        {/if}
      </ThemeBtn>
    </section>
  </aside>
</section>
