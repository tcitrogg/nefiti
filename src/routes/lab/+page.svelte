<script lang="ts">
  import Image from '$lib/components/Image.svelte';
  import { fade, slide } from 'svelte/transition';
    import { storeAsideBarMinimised } from '../../stores/layoutData';

  const imagePage = "/imgs/thumbnails/extended-realm.jfif"
</script>

<section transition:slide={{duration:300}} class="w-full md:pl-4 md:pr-3 flex relative">
  <section class="w-full {$storeAsideBarMinimised ? 'lg:w-9/12' : 'lg:w-11/12'} md:mx-auto h-full flex flex-col relative z-10">

    <!-- Pages -->
    <section in:fade id={``} class="w-full relative overflow-hidden bg-gradient-to-b from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700 flex">
      <Image
        src={imagePage}
        alt={imagePage}
        style={"relative"}
      />
      <!-- {#if prevPage !== 0} -->
      <a href={`#prevPage`} class="w-3/12 h-full focus:outline-none focus:ring-0 focus:border-none absolute left-0 top-0">
        <section class="w-full h-full bg-amber-50050">
          <!-- prev: prevPage -->
        </section>
      </a>
    <!-- {/if} -->

    <!-- {#if isMenuVisible} -->
      <section transition:slide class="w-6/12 h-full bg-green-500/50 absolute left-[25%] top-0">
      </section>
    <!-- {/if} -->

    <!-- {#if nextPage <= listOfImages.length} -->
      <a href={`#nextPage`} class="w-3/12 h-full focus:outline-none focus:ring-0 focus:border-none absolute right-0 top-0">
        <section class="w-full h-full bg-amber-50050">
          <!-- next: nextPage -->
        </section>
      </a>
    <!-- {/if} -->
    </section>
  </section>
</section>