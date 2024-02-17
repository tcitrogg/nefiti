<script>
  import { copy } from "svelte-copy";

  export let content = ""
</script>

<!-- <button use:copy={"Hello World"}> Click me! </button> -->
<button use:copy={content} class="py-1 px-1 rounded-full bg-zinc-950 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 text-sm font-semibold ring-2 ring-transparent focus:ring-main/50 focus:outline-none">
  <i class="icon icon-ic_fluent_link_20_regular flex text-2xl"/>
</button>
