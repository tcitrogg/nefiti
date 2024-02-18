<script>
	import { browser } from "$app/environment";
    // import { text } from "@sveltejs/kit";
	import { fly, fade, scale, slide } from "svelte/transition";

	export let bg = "bg-zinc-300 dark:bg-zinc-950 hover:bg-transparent/10 dark:hover:bg-zinc-800/70"
	export let style = ""
	// export let text = ""
	export let iconSize = "xl"

	let isDarkMode;

	if (browser) {
		if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
			document.documentElement.classList.add("dark");
			isDarkMode = true;
		} else {
			document.documentElement.classList.remove("dark");
			isDarkMode = false;
		}
	} else {
		isDarkMode = true;
	}
	
	const handleMode = () => {
		isDarkMode = !isDarkMode;
    localStorage.setItem('theme', isDarkMode ? "dark" : "light");
      // localStorage.setItem('color-theme', isDarkMode ? "dark" : "light");

		isDarkMode
			? document.documentElement.classList.add("dark")
			: document.documentElement.classList.remove("dark");
		// alert(`it is dark ${localStorage.getItem('color-theme')}`);
	}
</script>

<!-- <input type="checkbox" checked={isDarkMode} on:click={handleMode} name="theme-toggle" id="theme-toggle"/> -->
<button type="button" title="Theme" on:click={handleMode} class={`${style} ${bg} p-1 relative rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 overflow-hidden text-lg`}>
{#if isDarkMode}
	<!-- <svg transition:slide xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-{iconSize} h-{iconSize} rounded-full">
		<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
	</svg> -->

	<i transition:slide class="relative icon icon-ic_fluent_weather_sunny_20_regular flex rounded-full p-0.5 text-{iconSize}"/>
{:else}
	<!-- <svg transition:slide xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-{iconSize} h-{iconSize} rounded-full">
		<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
	</svg> -->
  
	<i transition:slide class="relative icon icon-ic_fluent_weather_moon_20_regular flex rounded-full p-0.5 text-{iconSize}"/>
{/if}

<slot/>

	<!-- {#if text}
		<p class="text-">{text}</p>
	{:else}
		{""}
	{/if} -->
</button>