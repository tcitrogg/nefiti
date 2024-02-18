<script lang="ts">
  import { getThumbnail } from "$lib/utils";
  // import { Image } from "@unpic/svelte";
  import Pill from "./Pill.svelte";
  import Image from "./Image.svelte";
  import Button from "./ui/button/button.svelte";

  export let item: any = {}
  // export let style = ""

  let title = `${Object.values(item.attributes.title)[0]}`
  let description = Object.values(item.attributes.description)[0] ?? ""
</script>

<!-- {#await getThumbnail(mangaData[0])} -->
  <!-- <section class="w-full md:w-6/12 h-full object-cover sticky md:relative md:rounded-lg bg-zinc-300 dark:bg-zinc-700"/> -->
<!-- <img src={value} alt={`${Object.values(mangaData[0].attributes.title)[0]}`} class="w-full md:w-5/12 h-full object-cover object-top sticky md:relative md:rounded-lg"> -->
<!-- {/await} -->
<section class="w-full h-full overflow-hidden relative flex gap-3">
  <section class={`w-full lg:w-5/12 h-full object-fill object-top sticky lg:relative lg:rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900`}>
    <Image
      src="{getThumbnail(item)}"
      alt="{title}"
    />
      <!-- layout="constrained" -->
  </section>
  
  <section class="w-full h-full absolute top-0 left-0 z-10 bg-gradient-to-b from-transparent via-zinc-100/90 dark:via-zinc-950/90 to-zinc-100 dark:to-zinc-950 lg:hidden"/>
  
  <section class="w-full lg:w-7/12 flex flex-col gap-6 lg:gap-4 justify-between z-10 p-4 lg:px-2 lg:py-4 absolute lg:relative bottom-0">
    <section class="flex flex-col gap-6 md:gap-4">
      <section class="flex flex-col gap-1.5">
        <!-- <Skeleton type="p" /> -->
        <h4 class="font-semibold text-ellipsis text-2xl md:text-3xl">{title}</h4>
        <p class="text-xs uppercase opacity-60 whitespace-nowrap"># {item.attributes?.status}</p>
      </section>
  
      <section class="flex flex-wrap gap-2 snap-x snap-mandatory">
        {#each item.attributes.tags as eachTag}
          <section class="flex"><Pill
            link={`/m/tag/${eachTag.id}`}
            title={`${Object.values(eachTag.attributes.name)[0]}`}
            style={"text-sm"}
          /></section>
        {/each}
      </section>
      <article class="text-sm font-bold opacity-70 line-clamp-4 md:line-clamp-5 lg:line-clamp-6">{item.attributes.description.en ? item.attributes.description.en : description}</article>
    </section>
    
    <section class="flex mt-3 pb-1">
      <a href={`/m/${item.id}`} title={`${title}`} class="focus:ring-0 focus:outline-none relative bg-main w-28 py-1.5 rounded-lg flex items-center justify-center font-semibold">
        Read
      </a>
      <!-- <Button href={`/${item.id}`}>Read</Button> -->
    </section>
  </section>
</section>