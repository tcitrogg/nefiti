<script lang="ts">
  import { getThumbnail } from "$lib/utils";
  // import { Image } from "@unpic/svelte";
  import Image from "./Image.svelte";

  export let item: any = {}
  // export let style = ""

  // console.log(item)
  let title = `${Object.values(item.attributes.title)[0]}`
</script>

<a href={`/m/${item.id}`} title={`${title}`} class="w-full h-full focus:ring-2 focus:outline-none focus:ring-main/70 flex flex-col gap-2 relative overflow-hidden rounded-lg">
  <section class={`w-full h-full overflow-hidden rounded-lg md:rounded-xl relative flex flex-col`}>
    <section class="w-full h- flex flex-col bg-zinc-200/70 dark:bg-zinc-800/70 backdrop-blur-sm absolute bottom-0 left-0 z-10 p-2">
      <h4 class="w-10/12 font-medium text-ellipsis line-clamp-1 ">{title}</h4>
      <p class="text-xs uppercase opacity-60 whitespace-nowrap"># {item.attributes?.status}</p>
    </section>
    <section class={`w-full h-full overflow-hidden bg-zinc-100 dark:bg-zinc-900`}>
      <Image
        src="{getThumbnail(item)}"
      />
        <!-- layout="constrained" -->
    </section>
  </section>
</a>