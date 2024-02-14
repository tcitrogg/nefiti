<script lang="ts">
    import { getThumbnail } from '$lib/utils';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  
    
  export let data: PageData;
  // import { data } from './+page';
  const ndata = data.data
  // console.log(ndata)


  // let imageUrl: any;

  // onMount(async () => {
  //   try {
  //     // Fetch the image using fetch API
  //     const response = await fetch(`https://uploads.mangadex.org/covers/${ndata[0].id}/${ndata[0].thumbnail?.attributes?.fileName}`);
      
  //     // Get the blob object from the response
  //     const blob = await response.blob();
      
  //     // Convert the blob object to a data URL
  //     imageUrl = URL.createObjectURL(blob);
  //   } catch (error) {
  //     console.error('Error fetching image:', error);
  //   }
  // });
</script>




<section class="w-full p-5 flex flex-col gap-5">
  <h1 class="text-xl font-bold">Welcome to Komiks</h1>
  <!-- {#if imageUrl} -->
    <section class="w-80 h-80 rounded-lg overflow-hidden">
      <img src="https://api.allorigins.win/raw?url={getThumbnail(ndata[0])}" alt="https://api.allorigins.win/raw?url={getThumbnail(ndata[0])}" srcset="" class="w-full h-full object-cover object-top" loading="lazy">
      <!-- <iframe title="{getThumbnail(ndata[0])}" src="https://api.allorigins.win/raw?url={getThumbnail(ndata[0])}" width="500" height="500"></iframe> -->
      <!-- <p>{}</p> -->
      <!-- <iframe src="https://api.allorigins.win/raw?url=https://mangadex.org/covers/d0fef7be-d7e7-4b1d-a30f-23702599bd05/a23d7a03-cf6c-4bf6-901d-2bb65a1e23cd.png" width="500" height="500"></iframe> -->

    </section>
  <!-- {:else} -->
    <!-- <p>Loading...</p> -->
  <!-- {/if} -->
  <p>{JSON.stringify(ndata[0])}</p>
</section>
<!-- <p>{JSON.stringify($data.data[0])}</p> -->
