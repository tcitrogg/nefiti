<script lang="ts">
  import Avatar from 'svelte-boring-avatars';
  import { metainfo } from "$lib/config";

  export let classes = "w-full flex items-center hover:bg-zinc-300dark:hover:bg-zinc-800 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4"
  export let style = ""
</script>

<a href='https://x.com/tcitrogg' class="{classes} {style}">
    <section class="w-full flex items-center justify-center gap-2 ">
      <em class="">yours</em>
      <Avatar
        name={`${metainfo.avatar_prefix}${metainfo.organisation}`}
        size={33}
        square={false}
        colors={metainfo.color_band}
        variant={"beam"}
      />
  
      <h2 class="font-semibold text-base">{metainfo.organisation}</h2>
    </section>
  </a>