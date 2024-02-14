<script lang="ts">
    import { getThumbnail } from '$lib/utils';
  import type { PageData } from './$types';
    
  export let data: PageData;
  // import { data } from './+page';
  console.log($data[0])
</script>

<section class="w-full h-screen p-5 flex flex-col gap-5">
  <h1 class="text-xl font-bold">Welcome to Komiks</h1>
  <section class="w-80 h-80 rounded-lg overflow-hidden">
    <img src={getThumbnail($data[0])} alt="{getThumbnail($data[0])}" srcset="" class="w-full h-full object-cover object-top">
  </section>
  <p>{JSON.stringify($data[0])}</p>
</section>
<!-- <p>{JSON.stringify($data.data[0])}</p> -->
