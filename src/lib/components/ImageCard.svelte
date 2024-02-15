<script lang="ts">
    import { getThumbnail } from "$lib/utils";
  import { Image } from "@unpic/svelte";

  export let item: any = {}
  export let style = ""

  let title = Object.values(item.attributes.title)[0]
</script>

<section class={`${style} w-full h-full overflow-hidden rounded-lg relative flex flex-col`}>
  
  <section class="w-full h-full object-cover absolute object-top">
    <Image
      src="{getThumbnail(item)}"
      alt="{title}"
      layout="constrained"
    />
  </section>

  <!-- overlay -->
  <section class="w-full h-full absolute top-0 left-0 z-10 bg-gradient-to-b from-transparent to-zinc-950"/>

  <section class="w-full flex flex-col z-10 px-2 gap-1.5 absolute bottom-0">
    <h4 class="font-medium text-ellipsis text-xl md:text-2xl">{title}</h4>
    <p class="text-xs uppercase opacity-60 whitespace-nowrap"># {item.attributes?.status}</p>
    <article class="text- text-neutral-300 font-bold opacity-70">{Object.values(item.attributes.description)[0]}</article>
    
    <section class="flex mt-3">
      <a href={`/${item.id}`} title={`${title}`} class="focus:ring-0 focus:outline-none relative bg-main-green w-28 py-1.5 rounded-lg flex items-center justify-center">
        Read
      </a>
    </section>
  </section>
</section>