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

<h1>
  {#if isOnline}
    You are online!
  {:else}
    You are offline.
  {/if}
</h1>
