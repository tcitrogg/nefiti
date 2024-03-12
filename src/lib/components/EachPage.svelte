<script lang="ts">
  import IntersectionObserver from 'svelte-intersection-observer';
  import { fade, slide } from 'svelte/transition';
  import Image from './Image.svelte';
  import { page } from '$app/stores';

  export let imgSrc = "";
  export let chapterLength = 1;

  // $: thisPage = 0
  // thisPage = Number($page.params.pgid)
  // console.log(thisPage, typeof(thisPage))
  // let nextPage = Number($page.params.pgid) >= chapterLength ? false : thisPage + 1
  console.log(imgSrc)
  const chapterLink = $page.url.href.split("?pg=")[0]
  // export let imgAlt = "";

  // console.log($page.url)
</script>

<section in:fade id={``} class="w-full relative overflow-hidden flex bg-gradient-to-bfrom-zinc-200 to-zinc-300dark:from-zinc-800dark:to-zinc-700">
  <!-- <img src={imgSrc} alt="" class="w-full object-cover object-top"> -->
  <slot/>

  {#if Number($page.params.pgid)-1 !== 0}
  <a href="pg-{Number($page.params.pgid)-1}" class="w-3/12 h-full focus:outline-none focus:ring-0 focus:border-none absolute left-0 top-0">
    <section class="w-full h-full bg-amber-50050">
      <!-- prev: prevPage -->
    </section>
  </a>
  {/if}

  <p class="fixed top-2/4 right-2/4 bg-slate-600 p-3">
    page {$page.params.pgid}
  </p>

<!-- {#if isMenuVisible} -->
  <!-- <section transition:slide class="w-6/12 h-full bg-green-50050 absolute left-[25%] top-0">
  </section> -->
<!-- {/if} -->

  {#if !(Number($page.params.pgid) >= chapterLength)}
  <a href="pg-{Number($page.params.pgid)+1}" class="w-3/12 h-full focus:outline-none focus:ring-0 focus:border-none absolute right-0 top-0">
    <section class="w-full h-full bg-amber-50050">
      <!-- next: nextPage -->
    </section>
  </a>
  {/if}
</section>