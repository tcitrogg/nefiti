<script lang="ts">
  import { slide } from "svelte/transition";
  import { storeAsideBarMinimised, isSearchMinimised } from "../../stores/layoutData";

  const handleSearchMinimised = ()=>{
    isSearchMinimised.set(!$isSearchMinimised)
  }
</script>

{#if $isSearchMinimised}
  <section transition:slide={{duration:80}} class="w-full md:pl-3 {$storeAsideBarMinimised ? 'md:w-[90%] lg:w-[94%]' : 'md:w-[70%] lg:w-[80%]'} h-smscreen md:h-screen fixed z-[70] right-0 top-0">
    <section class="w-full h-full bg-zinc-100/80 dark:bg-zinc-900/90 backdrop-blur flex flex-col p-4">
      <section class="w-full md:w-10/12 md:mx-auto">
        <!-- Top search bar -->
        <section class="w-full pt-0 py-6 flex gap-3 items-center">
          <button on:click={handleSearchMinimised} class="md:hidden hover:bg-zinc-300/40 hover:dark:bg-zinc-700/30 py-1.5 px-1.5 flex items-centerfocus:ring-2 focus:ring-main/50 focus:outline-none rounded-full gap-4">
            <i class="icon icon-ic_fluent_dismiss_20_regular flex text-3xl"/>
          </button>
          <section class="w-full md:w-10/12 md:mx-auto rounded-lg bg-zinc-200 dark:bg-zinc-700 flex overflow-hidden focus-within:ring-2 focus-within:ring-main/50 focus-within:outline-none shadow-lg shadow-zinc-900/10 dark:shadow-zinc-900/50">
            <input type="text" placeholder="Search..." class="w-full px-3 py-2 bg-transparent focus:ring-0 focus:outline-none">
            <button type="submit" class="p-2 bg-zinc-300/50 dark:bg-zinc-600/50 hover:bg-zinc-300 dark:hover:bg-zinc-600">
              <i class="icon icon-ic_fluent_search_20_regular flex text-3xl"/>
            </button>
          </section>
        </section>
      </section>

      <section class="w-full h-full overflow-y-auto">
        <section class="w-full md:w-9/12 md:mx-auto flex flex-col gap-3">
          
          <section class="w-full flex rounded-xl p-1 gap-3 hover:bg-zinc-200 dark:hover:bg-zinc-700">
            <section class="w-20 h-24 bg-amber-500 rounded-lg"></section>
            <h4 class="w-9/12 font-medium text-lg line-clamp-2 py-2">bankai</h4>
          </section>

        </section>
      </section>
    </section>
  </section>
{/if}