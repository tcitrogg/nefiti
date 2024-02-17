<script lang="ts">
  import { fly, fade, scale, slide } from "svelte/transition";
  import { page } from '$app/stores';
    import Metahead from "$lib/components/Metahead.svelte";

  const focusStyle = "focus:outline-none focus:ring-1 focus:ring-blue-700/70"
</script>

<Metahead title={`${$page.status} Error`} description={`${$page.status} | ${$page.error?.message}`}/>

<section class="w-full md:w-11/12 md:ml-auto h-smscreen md:h-screen flex flex-col justify-center">

  <div class="w-10/12 md:w-7/12 mx-auto flex flex-col md:flex-row divide-x-2 divide-transparent/20 dark:divide-white/20 gap-1 md:gap-4">
    <h2 class="font-medium text-4xl">{$page.status}</h2>
    <p class="py-2 md:py-1 lg:py-0 pl-4">
      {@html $page.error?.message}
    </p>
  </div>

</section>