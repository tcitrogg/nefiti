<script lang="ts">
  import { page } from "$app/stores";
    import { onMount } from "svelte";

  $: currentPageTracker = 0;

  // const handlePageTracking = ()=>{
    // }

    // handlePageTracking();
  onMount(() => {
    if ($page.url.pathname === '/lib') {
      currentPageTracker = 1
    } else if ($page.url.pathname === '/search') {
      currentPageTracker = 2
    } else {
      currentPageTracker = 0
    }
  });
</script>

<nav class="w-full p-2 md:hidden bg-gradient-to-b from-transparent to-neutral-100 dark:to-neutral-950 :backdrop-blur-md fixed z-50 bottom-0 left-0">
  <section class="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent to-neutral-100 dark:to-neutral-950/80"/>
  <section class="flex items-center justify-around relative z-10">
    <a href='#search' aria-current={$page.url.pathname.endsWith("#search") ? 'page' : undefined} class="navbtn p-1 flex items-center justify-center focus:ring-2 focus:ring-main/70 focus:outline-none rounded-full">
      <i class="icon icon-ic_fluent_search_20_{$page.url.pathname.endsWith("#search") ? 'filled' : 'regular'} flex text-3xl"/>
    </a>
    <a href='/' aria-current={$page.url.pathname === '/' ? 'page' : undefined} class="navbtn p-1 flex items-center justify-center focus:ring-2 focus:ring-main/70 focus:outline-none rounded-full">
      <i class="icon icon-ic_fluent_home_20_{$page.url.pathname === '/' ? 'filled' : 'regular'} flex text-3xl"/>
    </a>
    <a href='/lib' aria-current={$page.url.pathname === '/lib' ? 'page' : undefined} class="navbtn p-1 flex items-center justify-center focus:ring-2 focus:ring-main/70 focus:outline-none rounded-full">
      <i class="icon icon-ic_fluent_library_20_{$page.url.pathname === '/lib' ? 'filled' : 'regular'} flex text-3xl"/>
    </a>
  </section>
</nav>