<script lang="ts">
	import { Drawer } from 'vaul-svelte';
	import { clsx } from 'clsx'

	let activeSnapPoint = "148px"
</script>

<Drawer.Root>
	<Drawer.Trigger>About the app</Drawer.Trigger>
		<Drawer.Overlay class="fixed inset-0 bg-zinc-950/40" />
		<Drawer.Portal>
			<Drawer.Content class="w-full h-60 fixed flex flex-col bottom-0 left-0 p-1">
				<section class="w-full h-full bg-zinc-200 dark:bg-zinc-800 shadow-md rounded-t-lg p-3">
          Bling bang bang born
        </section>
			</Drawer.Content>
	</Drawer.Portal>
</Drawer.Root>
