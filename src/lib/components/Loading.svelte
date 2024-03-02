<script>
  import { fly, fade, scale, slide } from "svelte/transition";
  import { onMount } from "svelte";
    import { metainfo } from "$lib/config";
  let isReady = true;

  onMount(() => {
    isReady = false;
  });
</script>

<!-- Loading -->
{#if isReady}
  <section transition:slide class="absolute z-[70] w-full h-full bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 backdrop-blur-md flex flex-col items-center justify-center space-y-4">
    <section class={`flex items-center gap-2 text-3xl md:text-4xl font-medium`}>
      <img src="/favicon.svg" alt="[ni]" class="w-7 md:w-10 block dark:hidden">
      <img src="/favicon-light.svg" alt="[ni]" class="w-7 md:w-10 hidden dark:block">
      <h1 class="font-semibold">
        {metainfo.title}
      </h1>
    </section>

    <section class="loading-container w-32 h-0.5 bg-zinc-800 dark:bg-zinc-300 flex rounded-full overflow-hidden">
      <section class="loading-line w-6/12 h-full bg-main"/>
    </section>
  </section>
{/if}

<style>
  /* body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
} */

/* .loading-container { */
  /* width: 200px; Adjust the container width as needed */
  /* height: 4px; */
  /* background-color: #ccc; */
  /* border-radius: 2px; */
  /* overflow: hidden; */
/* } */

.loading-line {
  /* width: 100%;
  height: 100%; */
  /* background-color: #007bff; Change to your desired loading line color */
  animation: loading 2.5s linear infinite; /* Adjust animation duration and timing function */
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}

</style>