<!-- <script lang="ts">
	import { Drawer } from 'vaul-svelte';
	import { clsx } from 'clsx'

	let activeSnapPoint = "148px"
</script>

<Drawer.Root>
	<Drawer.Trigger>Open Drawer</Drawer.Trigger>
		<Drawer.Overlay class="fixed inset-0 bg-zinc-950/40" />
		<Drawer.Portal>
			<Drawer.Content class="w-full h-60 fixed flex flex-col bottom-0 left-0 p-1">
				<section class="w-full h-full bg-zinc-200 dark:bg-zinc-800 shadow-md rounded-t-lg p-3">
          Bang
        </section>
			</Drawer.Content>
	</Drawer.Portal>
</Drawer.Root> -->


<script lang="ts">
	// import * as Dialog from "$lib/components/ui/dialog";
	import * as Drawer from "$lib/components/ui/drawer";
	// import { Input } from "$lib/components/ui/input";
	// import { Label } from "$lib/components/ui/label";
	import { Button } from "$lib/components/ui/button";
	import { mediaQuery } from "svelte-legos";
  
	let open = false;
	const isDesktop = mediaQuery("(min-width: 768px)");
  </script>
  
  {#if $isDesktop}
	<Dialog.Root bind:open>
	  <Dialog.Trigger asChild let:builder>
		<Button variant="outline" builders={[builder]}>Edit Profile</Button>
	  </Dialog.Trigger>
	  <Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
		  <Dialog.Title>Edit profile</Dialog.Title>
		  <Dialog.Description>
			Make changes to your profile here. Click save when you're done.
		  </Dialog.Description>
		</Dialog.Header>
		<form class="grid items-start gap-4">
		  <div class="grid gap-2">
			<Label for="email">Email</Label>
			<Input type="email" id="email" value="shadcn@example.com" />
		  </div>
		  <div class="grid gap-2">
			<Label for="username">Username</Label>
			<Input id="username" value="@shadcn" />
		  </div>
		  <Button type="submit">Save changes</Button>
		</form>
	  </Dialog.Content>
	</Dialog.Root>
  {:else}
	<Drawer.Root bind:open>
	  <Drawer.Trigger asChild let:builder>
		<Button variant="outline" builders={[builder]}>Edit Profile</Button>
	  </Drawer.Trigger>
	  <Drawer.Content>
		<Drawer.Header class="text-left">
		  <Drawer.Title>Edit profile</Drawer.Title>
		  <Drawer.Description>
			Make changes to your profile here. Click save when you're done.
		  </Drawer.Description>
		</Drawer.Header>
		<form class="grid items-start gap-4 px-4">
		  <div class="grid gap-2">
			<Label for="email">Email</Label>
			<Input type="email" id="email" value="shadcn@example.com" />
		  </div>
		  <div class="grid gap-2">
			<Label for="username">Username</Label>
			<Input id="username" value="@shadcn" />
		  </div>
		  <Button type="submit">Save changes</Button>
		</form>
		<Drawer.Footer class="pt-2">
		  <Drawer.Close asChild let:builder>
			<Button variant="outline" builders={[builder]}>Cancel</Button>
		  </Drawer.Close>
		</Drawer.Footer>
	  </Drawer.Content>
	</Drawer.Root>
  {/if}