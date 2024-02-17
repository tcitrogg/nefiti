<script lang="ts">
    import Metahead from "$lib/components/Metahead.svelte";
    import Pill from "$lib/components/Pill.svelte";
import { shuffle } from "$lib/utils";
  import type { PageData } from "./$types";

  export let data: PageData;

  const listOfWallpapers = [
    "/imgs/wallpapers/Wallpaper phone 4k - Japanese style neon shallows.jfif",
    "/imgs/wallpapers/WANEELLA pixel art (3).gif",
    "/imgs/wallpapers/WANEELLA pixel art.gif",
    "/imgs/wallpapers/Waterfall, Pixel Jeff.gif",
  ]

  const title = "A-Maze"
</script>

<Metahead
  ogtitle={`${title}`}
  ogdescription={`${title}`}
  ogkeywords={"Games, A-Maze, GitHub/nedredmond"}
/>

<section class="w-full h-full p-4 pb-0 md:p-8">
  
  <img src={shuffle(listOfWallpapers)[0]} alt={""} class="w-full h-full object-cover fixed top-0 left-0 blur-sm opacity-20 dark:opacity-40">
  <section class="w-full h-smscreen md:h-screen fixed top-0 left-0 z-10 bg-gradient-to-b from-zinc-100/80 dark:from-zinc-950/80 via-zinc-100/95 dark:via-zinc-950/95 to-zinc-100 dark:to-zinc-950"/>

  <section class="w-full h-full relative z-10 flex flex-col gap-4">
    <header class="flex items-center gap-1">
      <h2 class="">Games /</h2>
      <Pill title={title}/>
    </header>

    <iframe title="A-Maze by GitHub/nedredmond" src="https://nedredmond.github.io/a-maze?ref=madewithsvelte.com" frameborder="0"
    class="w-full h-full rounded-lg rounded-b-none md:rounded-b-lg bg-zinc-200 text-zinc-100 dark:bg-zinc-50 dark:text-zinc-950"
    />
  </section>
</section>
