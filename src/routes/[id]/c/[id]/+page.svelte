<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  import { appinfo } from '$lib/config';
  
</script>

<section class="w-full md:w-10/12 md:mx-auto h-full flex flex-col relative z-10">
  {#each data.data as eachData, index}
    <section class="">
      <!-- <p class="text-xs">#{index} | {eachData}</p> -->
      <img src={`${data.host}/data-saver/${data.chapterHash}/${eachData}`} alt={`#${index} | ${eachData}`} class="">
    </section>
  {/each}
</section>