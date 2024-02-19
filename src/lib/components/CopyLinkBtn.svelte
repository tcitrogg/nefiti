<script>
  import { copy } from "svelte-copy";
  import * as Popover from "$lib/components/ui/popover";
  import * as Card from "$lib/components/ui/card";

  export let content = ""
</script>

<!-- <button use:copy={"Hello World"}> Click me! </button> -->
<Popover.Root>
  <Popover.Trigger>
    <button use:copy={content} class="py-1 px-1 rounded-full bg-zinc-950 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 text-sm font-semibold ring-2 ring-transparent focus:ring-main/50 focus:outline-none flex items-center gap-3">
      <i class="icon icon-ic_fluent_share_20_regular flex text-2xl"/>
      <slot/> 
    </button>
  </Popover.Trigger>
  <Popover.Content class="w-auto py-1.5 rounded-lg text-sm">
    Copied link
  </Popover.Content>
</Popover.Root>