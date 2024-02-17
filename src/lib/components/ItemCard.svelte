<script lang="ts">
    import { getThumbnail } from "$lib/utils";

    // import { getCovertArt } from "$lib/utils";
  import Pill from "./Pill.svelte";
  import Image from "./Image.svelte";
  // import { Image } from "@unpic/svelte";
	import { Picture } from 'svelte-lazy-loader';

  export let item: any = {}
  export let style = ""

  let title = `${Object.values(item.attributes.title)[0]}`
</script>

<a href={`/m/${item.id}`} title={`${title}`} class="w-full h-full focus:ring-0 focus:outline-none flex flex-col gap-2 relative">
  <section class={`${style} w-full h-full overflow-hidden md:rounded-xl relative flex flex-col`}>
    <section class="w-full h- flex flex-col bg-zinc-200/70 dark:bg-zinc-800/70 backdrop-blur-sm absolute top-0 left-0 z-10 p-2 space-y-1">
      <h4 class="font-medium text-ellipsis line-clamp-1">{title}</h4>
      <p class="text-xs uppercase opacity-60 whitespace-nowrap"># {item.attributes?.status}</p>
      <!-- <section class="flex ">
        <p class="py-0.5 px-2.5 rounded-xl bg-main-green text-zinc-950 dark:bg-main-green dark:text-zinc-100 text-xs uppercase">
          # {item.attributes?.status}
        </p>
      </section> -->
      <!-- <p class="text-sm uppercase font-bold opacity-60 flex items-center gap-1.5">
        <i class="w-2.5 h-2.5 bg-main-green rounded-full"/>{item.attributes?.status}
      </p> -->
    </section>
    <section class={`w-full h-full`}>
      <Image
        src="{getThumbnail(item)}"
        alt="{title}"
      />
    </section>
  </section>
</a>