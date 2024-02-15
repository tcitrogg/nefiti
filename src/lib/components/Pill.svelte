<script lang="ts">
  export let link = "/"
  export let title = "thy"
  export let style = ""
</script>

<a href={link} class="{style} py-1 px-3 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-950 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 font-medium">
  <p class="whitespace-nowrap">{title}</p>
</a>