<script lang="ts">
  import { getThumbnail } from "$lib/utils";
  // import { Image } from "@unpic/svelte";
  import Image from "./Image.svelte";

  export let item: any = {}
  // export let style = ""

  let title = `${Object.values(item.attributes.title)[0]}`
  // console.log(title)
</script>

<section class="inline-block w-40 lg:w-60">
  <a href={`/m/${item.id}`} title={`${title}`} class="w-full h-full focus:ring-0 focus:outline-none flex flex-col gap-2 relative">
    <section class={`w-full h-44 lg:h-60 overflow-hidden rounded-lg relative flex flex-col bg-zinc-100 dark:bg-zinc-900`}>
      <Image
        src="{getThumbnail(item)}"
        alt="{title}"
      />
        <!-- layout="constrained" -->
    </section>
    <section class="w-full h- flex flex-col z-10 p-2">
      <h4 class="w-full font-medium text-ellipsis line-clamp-1">{title}</h4>
      <p class="text-xs uppercase opacity-60 whitespace-nowrap"># {item.attributes?.status}</p>
    </section>
  </a>
</section>