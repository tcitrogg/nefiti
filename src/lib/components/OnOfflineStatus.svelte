<!-- <script lang="ts">
  let status = false
  // if (window) {
    // status = navigator.onLine
  // }
</script>

<div class="w-full py-1 {status ? '' : 'bg-zinc-900 dark:bg-zinc-100'} flex relative"/> -->

<!-- OnlineStatus.svelte -->

<script>

  let isOnline = navigator.onLine; // Initialize with the current online status

  // Add event listeners to detect changes in online status
  window.addEventListener('online', () => {
    isOnline = true;
  });

  window.addEventListener('offline', () => {
    isOnline = false;
  });
</script>

<!-- 
<section class="w-full rounded-full bg-zinc-300 dark:bg-zinc-800 h-1">
  <section class="bg-main ring-2 ring-main/20 py-0.5 rounded-full" style="width: {pageProgress}0%;"/>
</section> -->
<h1>
  {#if isOnline}
    You are online!

  {:else}
    You are offline.
  {/if}
</h1>
