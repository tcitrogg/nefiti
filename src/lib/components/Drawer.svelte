<script>
	import { Drawer } from "vaul-svelte";
</script>

<Drawer.Root>
	<Drawer.Trigger>Open</Drawer.Trigger>
	<Drawer.Portal>
		<Drawer.Content>
			<p>Content</p>
		</Drawer.Content>
		<Drawer.Overlay />
	</Drawer.Portal>
</Drawer.Root>