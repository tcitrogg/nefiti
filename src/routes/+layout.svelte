<script>
  import ThemeBtn from "$lib/components/ThemeBtn.svelte";
import Button from "$lib/components/ui/button/button.svelte";
    import { metainfo } from "$lib/config";
import "../app.pcss";
</script>

<section class="w-full max-h-smscreen md:max-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-100 font-schibsted_grotesk flex md:flex-row flex-col relative overflow-hidden">

  <section class="w-full h-smscreen md:h-screen overflow-y-auto rounded-scrollbar sm-scrollbar flex">

    <section class="w-[20%] h-full md:flex hidden items-center justify-center fixed z-50 top-0 left-0">
      <aside class="w-full h-full px-4 py-5 flex flex-col gap-5">
        <section class="w-full flex items-center gap-2 pl-1">
          <button class="px-2 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-900 focus:ring-2 focus:ring-green-500/50 focus:outline-none rounded-full">
            <i class="icon icon-ic_fluent_navigation_20_regular flex text-3xl"/>
          </button>
          <h1 class="font-bold text-xl">
            <span class="opacity-40">t/</span>
            <span class="">{metainfo.title}</span>
          </h1>
        </section>

        <section class="w-full flex flex-col gap-2">
          <a href='/' class="py-1.5 px-3 flex items-center justify- ring-2 ring-transparent focus:ring-green-500/50 focus:outline-none text-green-500 rounded-lg gap-4 bg-green-500/10">
            <i class="icon icon-ic_fluent_home_20_filled flex text-3xl"/>
            <p class="text-">Home</p>
          </a>
          <a href='/' class="py-1.5 px-3 flex items-center justify- ring-2 ring-transparent focus:ring-green-500/50 focus:outline-none rounded-lg gap-4 hover:bg-zinc-200 dark:hover:bg-zinc-900">
            <i class="icon icon-ic_fluent_library_20_regular flex text-3xl"/>
            <p class="text-">Library</p>
          </a>
          <a href='/' class="py-1.5 px-3 flex items-center justify- ring-2 ring-transparent focus:ring-green-500/50 focus:outline-none rounded-lg gap-4 hover:bg-zinc-200 dark:hover:bg-zinc-900">
            <i class="icon icon-ic_fluent_search_20_regular flex text-3xl"/>
            <p class="text-">Search</p>
          </a>
        </section>

        <section class="w-full h-3/6 rounded-lg bg-zinc-100 dark:bg-zinc-900">
          
        </section>

        <section class="w-full flex flex-col gap-2">
          <!-- <a href='#' class="py-1.5 px-3 flex items-center justify- ring-2 ring-transparent focus:ring-green-500 focus:outline-none text-green-500 rounded-lg gap-4 bg-green-500/10">
            <p class="text-">Mode</p>
          </a> -->
          <ThemeBtn style="py-1.5 px-3 flex items-center justify- ring-2 ring-transparent focus:ring-green-500/50 focus:outline-none rounded-lg gap-4 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-900" bg={""} iconSize={"3xl"} text="Mode"/>
        </section>
      </aside>
    </section>
  
    <section class="w-full md:w-[80%] md:ml-auto flex flex-col relative">
      <slot />
    </section>
  
    <section class="w-full p-2 md:hidden bg-gradient-to-b from-transparent to-neutral-100 dark:to-neutral-950 :backdrop-blur-md fixed z-50 bottom-0 left-0">
      <section class="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent to-neutral-100 dark:to-neutral-950/80"/>
      <section class="flex items-center justify-around relative z-10">
        <a href='/' class="p-1 flex items-center justify-center ring-2ring-green-500 focus:outline-none text-green-500 rounded-full">
          <i class="icon icon-ic_fluent_home_20_filled flex text-4xl"/>
        </a>
        <a href='/library' class="p-1 flex items-center justify-center focus:ring-2 focus:ring-green-500/70 focus:outline-none rounded-full">
          <i class="icon icon-ic_fluent_library_20_regular flex text-4xl"/>
        </a>
        <a href='#search' class="p-1 flex items-center justify-center focus:ring-2 focus:ring-green-500/70 focus:outline-none rounded-full">
          <i class="icon icon-ic_fluent_search_20_regular flex text-4xl"/>
        </a>
      </section>
    </section>
  </section>
</section>