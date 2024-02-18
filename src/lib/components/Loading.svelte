<script>
  import { fly, fade, scale, slide } from "svelte/transition";
  import { onMount } from "svelte";
    import { metainfo } from "$lib/config";
  let isReady = true;

  onMount(() => {
    isReady = false;
  });
</script>

{#if isReady}
  <div transition:slide class="absolute z-50 w-full h-full bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 backdrop-blur-md flex flex-col items-center justify-center space-y-4">
    <!-- Loading -->
    <div class={`flex items-center space-x-2.5 text-3xl font-medium`}>
      <!-- <span class="mirrorAmpersand opacity- font-fira_code pt-0.5 text-4xl">&</span> -->
      <!-- <span class="opacity- font-fira_code pt-0.5 text-4xl">&</span> -->
      <p class="-space-x-0.5">
        <span class="opacity-40">t</span>
        <span class="opacity-40">/</span>
        <span class="">{metainfo.title}</span>
      </p>
    </div>

    <div class="loading-container w-32 h-0.5 bg-zinc-800 dark:bg-zinc-300 flex rounded-full overflow-hidden">
      <div class="loading-line w-full h-full dark:bg-zinc-900 bg-zinc-100"></div>
    </div>
  </div>
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
    transform: translateX(100%);
  }
}

</style>