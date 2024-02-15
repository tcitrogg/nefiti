<script lang="ts">
  import { fly, fade, scale, slide } from "svelte/transition";
  import { page } from '$app/stores';

  const focusStyle = "focus:outline-none focus:ring-1 focus:ring-blue-700/70"
</script>

<section class="w-full md:w-11/12 md:ml-auto h-smscreen md:h-screen flex flex-col justify-center">

  <!-- <div class="opacity-100md:opacity-0 w-11/12 md:w-7/12 mx-auto py-4 text-lg">
    <Bnapp name={"Wiki"}/>
  </div> -->
  <div class="w-10/12 md:w-7/12 mx-auto flex flex-col md:flex-row divide-x-2 divide-transparent/20 dark:divide-white/20 gap-1 md:gap-4">
    <h2 class="font-medium text-4xl">{$page.status}</h2>
    <p class="py-2 md:py-1 lg:py-0 pl-4">
      {@html $page.error?.message}
    </p>
  </div>
  <!-- <div class="w-11/12 md:w-7/12 mx-auto flex py-4">
    <div class="flex items-center gap-3">
      <p class="opacity-70">Go back</p>

      <a href="/" transition:scale class={`${focusStyle} w-32 absoluteright-0bottom-0 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-900 hover:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 px-2 py-1 rounded-full font-medium flex items-center justify-center space-x-2`}>
        <span class="">Home</span>
      </a>
    </div>
  </div> -->

</section>