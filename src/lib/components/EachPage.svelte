<script lang="ts">
  import IntersectionObserver from 'svelte-intersection-observer';
  import { fade, slide } from 'svelte/transition';
  import Image from './Image.svelte';
    import { page } from '$app/stores';

  export let thisPage = 0;
  thisPage = Number(thisPage)
  console.log(thisPage, typeof(thisPage))
  export let imgSrc = "";
  export let chapterLength = 1;
  const chapterLink = $page.url.href.split("?pg=")[0]
  // export let imgAlt = "";

  // console.log($page.url)
</script>


<!-- <IntersectionObserver on:intersect={() => (thisPage)} threshold={0.5} rootMargin="0px">
  <section in:fade id={`${thisPage+1}`} class="w-full relative overflow-hidden bg-gradient-to-b from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700">
    <Image
      src={imgSrc}
      alt={`#${thisPage}`}
    />
    <section class="flex absolute bottom-1 ml-1">
      <a href={`#${thisPage+1}`} class="py-1 px-2 rounded-md text-xs bg-zinc-900/40 hover:bg-zinc-900/70 backdrop-blur- font-medium text-zinc-200">
        <p class="whitespace-nowrap">Page: {thisPage+1}</p>
      </a>
    </section>
  </section>
</IntersectionObserver> -->

<section in:fade id={``} class="w-full relative overflow-hidden flex bg-gradient-to-bfrom-zinc-200 to-zinc-300dark:from-zinc-800dark:to-zinc-700">
  <Image
    src={imgSrc}
    style={"relative"}
    classes="w-full object-cover object-top"
  />

  {#if thisPage !== 0}
  <a href={`?pg=${thisPage - 1}`} class="w-3/12 h-full focus:outline-none focus:ring-0 focus:border-none absolute left-0 top-0">
    <section class="w-full h-full bg-amber-50050">
      <!-- prev: prevPage -->
    </section>
  </a>
  {/if}

<!-- {#if isMenuVisible} -->
  <!-- <section transition:slide class="w-6/12 h-full bg-green-50050 absolute left-[25%] top-0">
  </section> -->
<!-- {/if} -->

  {#if !(thisPage >= chapterLength)}
  <a href={`${thisPage + 1}`} class="w-3/12 h-full focus:outline-none focus:ring-0 focus:border-none absolute right-0 top-0">
    <section class="w-full h-full bg-amber-50050">
      <!-- next: nextPage -->
    </section>
  </a>
  {/if}
</section>