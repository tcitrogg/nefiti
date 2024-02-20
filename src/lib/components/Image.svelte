<script>
	import { Image } from 'svelte-lazy-loader';
  export let src = ""
  export let alt = ""
  export let placeholder = ""
  export let classes = "w-full h-full object-cover object-top"
</script>

<Image
  {src}
  {alt} {placeholder}
  classes="--filter: blur(2px); --opacity:20 {classes}"
  loading="lazy" on:load />
