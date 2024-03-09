<script lang="ts">
  import { fly, fade, scale, slide } from "svelte/transition";
  import { page } from '$app/stores';
  import Metahead from "$lib/components/Metahead.svelte";
  import { metainfo } from "$lib/config";
    import Logo from "$lib/components/Logo.svelte";

  const focusStyle = "focus:outline-none focus:ring-1 focus:ring-blue-700/70"
</script>

<Metahead title={`${$page.status} Error`} description={`${$page.status} | ${$page.error?.message}`}/>

<section transition:slide={{axis: 'x'}} class="w-full md:w-11/12 md:ml-auto h-smscreen md:h-screen flex flex-col justify-center p-4 gap-10">
  <section class={`flex md:hidden items-center gap-2 text-3xl md:text-4xl font-medium`}>
    <Logo/>
    <h1 class="font-semibold text-xl">
      {metainfo.title}
    </h1>
  </section>

  <section class="w-10/12 md:w-7/12 mx-auto h-full flex flex-col divide-x-2 divide-transparent/20 dark:divide-white/20 gap-1 md:gap-4 justify-center">
    <h2 class="font-medium text-4xl">{$page.status}</h2>
    <p class="py-3 pl-4">
      {@html $page.error?.message}
    </p>
  </section>

</section>