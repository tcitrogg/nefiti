<script lang="ts">
  import type { LayoutData } from './$types';

  import { appinfo, metainfo } from '$lib/config';
  import { page } from '$app/stores';
  import Image from '$lib/components/Image.svelte';
  import Metahead from '$lib/components/Metahead.svelte';
  import { slide } from 'svelte/transition';
  import { flyAndScale, getThumbnail, sortWithVolume, titleCase } from '$lib/utils';
  import CopyBtn from '$lib/components/CopyBtn.svelte';
  import Pill from '$lib/components/Pill.svelte';
  import * as Drawer from "$lib/components/ui/drawer";
  import { currentChapterData, nextChapterData, previousChapterData } from '../../../../stores/eachPage';
  
  export let data: LayoutData;
  let mangaData = data.mangaInfo

  $: nextChapter = null
  $: previousChapter = null
  $: currentChapter = null
  $: sortWithVolume(mangaData).forEach((eachVolume: any) => {
    eachVolume.chapters.find((eachChapter:any, index: number)=>{
      if ($page.params.chid===eachChapter.id){
        nextChapter = eachVolume.chapters[index+1] ?? null
        previousChapter = eachVolume.chapters[index-1] ?? null
        currentChapter = {volume: eachVolume.volume, ...eachChapter}
      }
    })
  });

  const mangaTitle = `${Object.values(mangaData?.attributes.title)[0]}`
  const mangaDescription = Object.values(mangaData.attributes.description)[0] ?? ""
  const mangaKeywords = mangaData.attributes.tags.map((eachTag:any)=>Object.values(eachTag.attributes.name)[0])
  // // const date = new Date($mangaData.attributes.createdAt)
  const mangaYear = mangaData.attributes.year ?? mangaData.attributes.createdAt.slice(0,4)
  const mangaStatus = titleCase(mangaData.attributes.status) ?? "Unknown"  
  let mangaThumbnail = getThumbnail(mangaData);

  let copyInfo = `Check out this chapter of **${mangaTitle}**
${$page.url}

_from ${metainfo.url}_`
  
  $: isAboutDialogMinimised = false
  const handleAboutDialog = ()=>{
    isAboutDialogMinimised = !isAboutDialogMinimised
  }
</script>


<Metahead
  title={`${mangaTitle} Ch. ${currentChapter?.chapter} Pg. ${Number($page.params.pgid)+1}`}
  description={`${mangaDescription}`}
  keywords={mangaKeywords}
  seoType="NewsArticle"
  createdAt={`${mangaData.attributes.createdAt}`}
  updatedAt={`${mangaData.attributes.updatedAt}`}
  image={mangaThumbnail}
/>

<section transition:slide={{duration:300}} class="w-full h-smscreen md:h-screen lg:px-10 md:px-4 flex relative gap-8">
  <section class="w-full lg:w-8/12 mx-auto h-full overflow-y-auto flex flex-col gap-4 md:gap-5 snap snap-y snap-mandatory md:px-3">
    <slot/>
  </section>
</section>

