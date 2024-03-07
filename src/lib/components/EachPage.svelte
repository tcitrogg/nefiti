<script lang="ts">
  import IntersectionObserver from 'svelte-intersection-observer';
  import { fade } from 'svelte/transition';
  import Image from './Image.svelte';

  export let thisPage = 0;
  export let imgSrc = "";
  // export let imgAlt = "";
</script>


<IntersectionObserver on:intersect={() => (thisPage)} threshold={0.5} rootMargin="0px">
  <section in:fade id={`${thisPage+1}`} class="w-full relative overflow-hidden bg-gradient-to-b from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700">
    <!-- section.w-full.h-full -->
    <!-- <Image
      src={`${eachData}`}
      alt={`Page #${index+1}`}
      classes={""}
    /> -->
    
      <!-- src={`${data.baseUrl}/data-saver/${data.chapterHash}/${eachData}`} -->
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
</IntersectionObserver>