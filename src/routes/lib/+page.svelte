<script lang="ts">
  // import type { PageData } from './$types';
  // export let data: PageData;
  import { getRandomColor, shuffle } from "$lib/utils";
  import Avatar from 'svelte-boring-avatars';

  import { Drawer } from 'vaul-svelte';
  import Metahead from "$lib/components/Metahead.svelte";
  import { slide } from "svelte/transition";
  import ThemeBtn from "$lib/components/ThemeBtn.svelte";
  import * as Card from "$lib/components/ui/card";

  const user = {
    name: "Akagami",
    username: "roggeri",
    colors: Array.from({ length: 5 }, () => getRandomColor())
  }

</script>

<Metahead
  title={`${user.name.split(" ")[0]}'s Library`}
/>

<section transition:slide={{duration: 300}} class="w-full px-3 py-4 flex flex-col gap-7 snap snap-y snap-mandatory">
  <section class="flex items-center gap-3 py-3 px-4">
    <Avatar
      name={user.username}
      size={55}
      square={false}
      colors={user.colors}
      variant={"beam"}
    />

    <section class="flex flex-col -space-y-0.5">
      <h3 class="font-medium text-xl">{user.name}</h3>
      <h2 class="text-base text-main flex space-x-0">
        <span class="opacity-20">t/</span>
        <span class="font-semibold">{user.username}</span>
        <span class="opacity-40">.ni</span>
      </h2>
    </section>
  </section>

  <section class="w-full px-5">
    <hr class="border-zinc-200 dark:border-zinc-800 rounded-full">
  </section>
  
  <section class="w-full h-full flex flex-col gap-7 justify-between">
    <section class="w-full flex flex-col gap-1 border border-zinc-200 dark:border-zinc-900 rounded-lg p-1">
      <a href='/' class="py-1 px-2 flex items-center hover:bg-zinc-200 dark:hover:bg-zinc-900 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
        <i class="icon icon-ic_fluent_collections_20_regular flex text-3xl"/>
        <p class="text-">Readlist</p>
      </a>
      <a href='/' class="py-1 px-2 flex items-center hover:bg-zinc-200 dark:hover:bg-zinc-900 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
        <i class="icon icon-ic_fluent_star_20_regular flex text-3xl"/>
        <p class="text-">Favourites</p>
      </a>
      <ThemeBtn style="py-1 px-2 flex items-center ring-2 ring-transparent focus:ring-main/50 focus:outline-none rounded-lg gap-3 hover:bg-zinc-200 dark:hover:bg-zinc-900" bg={""} iconSize={"3xl"}>
        <p class="text-">Theme</p>
      </ThemeBtn>
    </section>
  
    <Drawer.Root>
      <Drawer.Trigger>
        <button class="w-full py-1 px-2 flex items-center hover:bg-zinc-200 dark:hover:bg-zinc-900 focus:ring-2 focus:ring-main/50 focus:outline-none rounded-lg gap-4">
          <i class="icon icon-ic_fluent_info_20_regular flex text-3xl"/>
          <p class="text-">About the app</p>
        </button>
      </Drawer.Trigger>
        <Drawer.Overlay class="fixed inset-0 bg-zinc-950/40" />
        <Drawer.Portal>
          <Drawer.Content class="w-full h-60 fixed flex flex-col bottom-0 left-0 p-1">
            <section class="w-full h-full bg-zinc-200 dark:bg-zinc-800 shadow-md rounded-t-lg p-3">
              Bling bang bang born
            </section>
          </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  </section>
  
</section>