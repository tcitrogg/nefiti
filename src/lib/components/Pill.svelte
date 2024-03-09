<script lang="ts">
  export let link = ""
  export let title = "thy"
  export let style = ""
  export let isActive = false
</script>

<a href={link} class="{style} py-1 px-3 rounded-lg {isActive ? 'bg-zinc-950 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950' : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-950 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100'} ring-2 ring-transparent focus:ring-main/50 focus:outline-none flex">
  <p class="whitespace-nowrap">{title}</p>
</a>