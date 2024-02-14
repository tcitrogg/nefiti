<script lang="ts">
    import { getThumbnail } from '$lib/utils';
  import type { PageData } from './$types';
    
  export let data: PageData;
</script>

<h1 class="text-xl font-bold">Welcome to Komiks</h1>
<!-- <p>{JSON.stringify(data.cover_art_list[0])}</p> -->
<section class="w-80 h-80 rounded-lg">
  <img src={getThumbnail(data.data[0])} alt="{getThumbnail(data.data[0])}" srcset="" class="w-full h-full object-cover object-top">
</section>
<p>{JSON.stringify(data.data[0])}</p>
