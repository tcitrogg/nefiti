<script>
  import { metainfo } from "$lib/config";
  import ThemeBtn from "$lib/components/ThemeBtn.svelte";
  import { getRandomColor, shuffle } from "$lib/utils";
  import Avatar from 'svelte-boring-avatars';
  // import sampleData from "$lib/sampleData.json"
  import tags from "$lib/tags.json"
  import dgData from "$lib/dgData.json";
  import { storeAsideBarMinimised, isAsideBarBtnClick, layoutData, isSearchMinimised } from "../../stores/layoutData";
  import { page } from "$app/stores";
  import { slide } from "svelte/transition";
	import { browser } from "$app/environment";
    import SearchBox from "./SearchBox.svelte";
    import Logo from "./Logo.svelte";
  
	let isAsideBarMinimised;

  if (browser) {
		if (localStorage.asidebarminimise === "true" || (!("asidebarminimise" in localStorage) && window.matchMedia("(prefers-asidebarminimise-scheme: true)").matches)) {
			isAsideBarMinimised = true;
      storeAsideBarMinimised.set(isAsideBarMinimised)
		} else {
			isAsideBarMinimised = false;
      storeAsideBarMinimised.set(isAsideBarMinimised)
		}
	} else {
		isAsideBarMinimised = true;
    storeAsideBarMinimised.set(isAsideBarMinimised)
	}
  
  const handleAsideBarMinimise = ()=>{
    isAsideBarMinimised = !isAsideBarMinimised;
    localStorage.setItem('asidebarminimise', isAsideBarMinimised ? "true" : "false");
    storeAsideBarMinimised.set(isAsideBarMinimised)
    isAsideBarBtnClick.set(true)
    // localStorage.setItem('color-theme', isDarkMode ? "dark" : "light");
    // lengthOfDataIfAsideBarIsMinimised.set(isAsideBarMinimised ? 3 : 5)
  }

  const handleSearchMinimised = ()=>{
    isSearchMinimised.set(!$isSearchMinimised)
  }

  const data = shuffle(tags.data).slice(0,3)
  // ?? shuffle(sampleData.data).slice(0, 4)
  // const data = $layoutData.length !== 0 ? $layoutData : shuffle(sampleData.data).slice(0,isAsideBarMinimised ? 4 : 5)
</script>

<!-- Use `svelte-legos` to set the `isAsideBarMinimised = true` on Medium screen -->
<section class="{isAsideBarMinimised ? "md:w-[10%] lg:w-[7%]" : "md:w-[30%] lg:w-[20%]"} h-full md:block hidden items-center justify-center fixed z-50 top-0 left-0">
  <aside class="w-full h-full px-4 {isAsideBarMinimised ? 'md:py-5' : 'md:p-4 lg:pr-1'} lg:py-5 flex flex-col gap-5 items-center justify-between">
    <section class="w-full flex flex-col gap-5">
      <section class="w-full flex {isAsideBarMinimised ? 'flex-col' : ''} items-center gap-2 pl-1">
        <button on:click={handleAsideBarMinimise} class="px-2 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-900 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-full {isAsideBarMinimised ? 'order-2' : 'order-1'}">
          {#if isAsideBarMinimised}
            <i transition:slide class="icon icon-ic_fluent_re_order_dots_horizontal_20_regular flex text-3xl"/>
          {:else}
            <i transition:slide class="icon icon-ic_fluent_re_order_dots_vertical_20_regular flex text-3xl"/>
          {/if}
        </button>
  
        <section class="flex items-center {isAsideBarMinimised ? 'order-1 justify-center py-2' : 'order-2 gap-2'}">
          <Logo width="w-6"/>
          <!-- <span class="opacity-40">t/</span> -->
          <h1 class="text-xl font-semibold">
            {#if !isAsideBarMinimised}
            {metainfo.title}
            {/if}
          </h1>
        </section>
      </section>
  
      <section class="w-full flex flex-col gap-2">
        <a href='/' aria-current={$page.url.pathname === '/' ? 'page' : undefined} class="navbtn py-1.5 px-3 flex items-center {isAsideBarMinimised ? 'justify-center' : ''} focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
          <i class="icon icon-ic_fluent_home_20_{$page.url.pathname === '/' ? 'filled' : 'regular'} flex text-3xl"/>
          {#if !isAsideBarMinimised}
            <p class="text-">Home</p>
          {/if}
        </a>
        <a href='/lib' aria-current={$page.url.pathname === '/lib' ? 'page' : undefined} class="navbtn py-1.5 px-3 flex items-center {isAsideBarMinimised ? 'justify-center' : ''} focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
          <i class="icon icon-ic_fluent_library_20_{$page.url.pathname === '/lib' ? 'filled' : 'regular'} flex text-3xl"/>
          {#if !isAsideBarMinimised}
            <p class="text-">Library</p>
          {/if}
        </a>
        <button on:click={handleSearchMinimised} aria-current={$page.url.pathname.endsWith("#search") ? 'page' : undefined} class="{$isSearchMinimised ? 'text-main md:bg-main/10' : ''} md:hover:bg-zinc-200 md:dark:hover:bg-zinc-900 py-1.5 px-3 flex items-center {isAsideBarMinimised ? 'justify-center' : ''} focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
          <i class="icon icon-ic_fluent_search_20_{$page.url.pathname.endsWith('#search') ? 'filled' : 'regular'} flex text-3xl"/>
          {#if !isAsideBarMinimised}
            <p class="text-">Search</p>
          {/if}
        </button>
      </section>
  
      <section class="w-full md:h-2/6 lg:h-auto {isAsideBarMinimised ? 'md:hidden lg:flex' : ''} md:overflow-y-auto lg:overflow-auto rounded-lg bg-zinc-200/40 dark:bg-zinc-900/60 flex flex-col gap-1 p-1">
        <a href={`/m/tag?id=${dgData.tag.id}`} title={Object.values(dgData.tag.attributes.name)[0]} class="w-full h-full focus:ring-2 focus:ring-main/50 focus:outline-none flex flex-col gap-2 relative">
          <section class="w-full rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-900 p-2 flex items-center {isAsideBarMinimised ? 'justify-center' : ''} gap-2">
            <Avatar
              name={dgData.tag.id}
              size={35}
              square={false}
              colors={metainfo.color_band}
              variant={"sunset"}
            />
            {#if !isAsideBarMinimised}
              <p class="w-10/12 line-clamp-1">{`${Object.values(dgData.tag.attributes.name)[0]}`}</p>
            {/if}
            <!-- <Image src={} alt={}/> -->
          </section>
        </a>
        {#each data as eachTag}
          <a href={`/m/tag?id=${eachTag.id}`} title={`${Object.values(eachTag.attributes.name)[0]}`} class="w-full h-full focus:ring-2 focus:ring-main/50 focus:outline-none flex flex-col gap-2 relative">
            <section class="w-full rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-900 p-2 flex items-center {isAsideBarMinimised ? 'justify-center' : ''} gap-2">
              <Avatar
                name={eachTag.id}
                size={35}
                square={false}
                colors={Array.from({ length: 2 }, () => getRandomColor())}
                variant={"sunset"}
              />
              {#if !isAsideBarMinimised}
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
      <ThemeBtn style="py-1.5 px-3 flex items-center {isAsideBarMinimised ? 'justify-center' : ''} ring-2 ring-transparent focus:ring-main/50 focus:outline-none rounded-lg gap-3 bg-zinc-200/40 hover:bg-zinc-200 dark:bg-zinc-900/60 dark:hover:bg-zinc-900" bg={""} iconSize={"3xl"}>
        {#if !isAsideBarMinimised}
          <p class="text-">Theme</p>
        {/if}
      </ThemeBtn>
    </section>
  </aside>
</section>