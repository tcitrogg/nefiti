<script>
  import { copy } from "svelte-copy";
  import * as Popover from "$lib/components/ui/popover";
  import * as Card from "$lib/components/ui/card";
  import { toast } from "svelte-sonner";

  export let content = ""
  export let style = "py-1 px-1 rounded-full bg-zinc-950 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 ring-2 ring-transparent focus:ring-main/50 focus:outline-none flex items-center gap-3"
  export let classes = ""
  export let icon = "ic_fluent_share_20_regular"
  export let iconSize = "2xl"
</script>

<!-- <button use:copy={"Hello World"}> Click me! </button> -->
<!-- <Popover.Root>
  <Popover.Trigger> -->
<button use:copy={content} on:click={() => toast("Copied")} class="{style} {classes}">
  <i class="icon icon-{icon} flex text-{iconSize}"/>
  <slot/> 
</button>
  <!-- </Popover.Trigger>
  <Popover.Content class="w-auto py-1.5 rounded-lg text-sm">
    Copied link
  </Popover.Content>
</Popover.Root> -->