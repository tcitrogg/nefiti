<script>
	import { Image } from 'svelte-lazy-loader';
  export let src = ""
  export let alt = ""
  export let placeholder = ""
</script>

<Image
  {src}
  {alt} {placeholder}
  classes={"--filter: blur(2px); --opacity:20 w-full h-full object-cover object-top"}
  loading="lazy" on:load />
