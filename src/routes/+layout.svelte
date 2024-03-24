<script>
  import "../app.pcss";
  import { inject } from '@vercel/analytics'
  
  import Nav from "$lib/components/Nav.svelte";
  import NavAside from "$lib/components/NavAside.svelte";
  import { storeAsideBarMinimised } from "../stores/layoutData";
  import { Toaster } from "$lib/components/ui/sonner";
  import { ProgressBar } from "@prgm/sveltekit-progress-bar";
  import Loading from "$lib/components/Loading.svelte";
  import SearchBox from "$lib/components/SearchBox.svelte";
  // import OnOfflineStatus from "$lib/components/OnOfflineStatus.svelte";
</script>

<Toaster/>
<Loading/>
<SearchBox/>
<!-- <OnOfflineStatus/> -->
<section class="fixed top-0 left-0 z-[70]">
  <ProgressBar class="text-main z-[70]"/>
</section>

<section class="w-full max-h-smscreen md:max-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-100 font-schibsted_grotesk flex md:flex-row flex-col relative overflow-hidden">

  <section class="w-full h-smscreen md:h-screen overflow-y-auto rounded-scrollbar sm-scrollbar flex">

    <NavAside/>
  
    <section class="w-full {$storeAsideBarMinimised ? 'md:w-[90%] lg:w-[94%]' : 'md:w-[70%] lg:w-[80%]'} md:ml-auto flex flex-col relative">
      <slot/>
    </section>
  </section>
</section>