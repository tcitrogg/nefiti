<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  import { appinfo, metainfo } from '$lib/config';
  import { page } from '$app/stores';
  
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { Progress } from "$lib/components/ui/progress";
  import Image from '$lib/components/Image.svelte';
  import Metahead from '$lib/components/Metahead.svelte';
  import { fade, slide } from 'svelte/transition';
  import * as Drawer from "$lib/components/ui/drawer";
	// import { Drawer } from 'vaul-svelte';
  // import { mangaData } from '../../../../../stores/eachPage';
  import { fetchImage, getThumbnail, shuffle, sortWithVolume, titleCase } from '$lib/utils';
  import CopyBtn from '$lib/components/CopyBtn.svelte';
  import Pill from '$lib/components/Pill.svelte';
  // import IntersectionObserver from '$lib/components/IntersectionObserver.svelte';

  import { Button } from '$lib/components/ui/button';
  // import sampleData from "$lib/sampleData.json";
  import Readotron from '@untemps/svelte-readotron'
  import { currentChapterData, nextChapterData, previousChapterData } from '../../../../../stores/eachPage';
  import { inview } from 'svelte-inview';
  import EachPage from '$lib/components/EachPage.svelte';

  let isInView: any;

  const listOfImages = [
    "/imgs/thumbnails/Demon slayer.jfif",
    "/imgs/thumbnails/eff205d1-fe91-4456-918d-44df256587a4.jpg",
    "/imgs/thumbnails/babe-cyberpunk.jfif",
    "/imgs/thumbnails/c02f8-tribe_village03.webp",
    "/imgs/thumbnails/extended-realm.jfif",
  ]

  // $: currentPageNumber = 1
  // $: prevPage = currentPageNumber == 0 ? 0 : currentPageNumber
  // $: nextPage = currentPageNumber + 1
  let chapterLength = data.usingData.length

  // $: isMenuVisible = false
  // const handleMenuVisible = ()=>{
  //   isMenuVisible = !isMenuVisible
  // }
  
  
  let mangaData = data.mangaInfo

  // console.log(sortWithVolume(mangaData))

  $: nextChapter = null
  $: previousChapter = null
  $: currentChapter = null
  $: sortWithVolume(mangaData).forEach((eachVolume: any) => {
    eachVolume.chapters.find((eachChapter:any, index: number)=>{
      if ($page.params.cid===eachChapter.id){
        nextChapter = eachVolume.chapters[index+1] ?? null
        previousChapter = eachVolume.chapters[index-1] ?? null
        currentChapter = {volume: eachVolume.volume, ...eachChapter}
      }
    })
  });

  // console.log(data.pageNumber)

  // $: ({nextChapter} = nextChapter);
  // $: ({currentChapter} = currentChapter);
  // $: ({previousChapter} = previousChapter);

  // console.log("$: nextChapter", nextChapter)
  // console.log("$: currentChapter", currentChapter)
  // console.log("$: previousChapter", previousChapter)

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


let thisPage = 0;

console.log(data)
</script>


<Metahead
  title={`${mangaTitle} Ch. ${currentChapter?.chapter} Pg. ${Number(data.pageNumber??0)+1}`}
  description={`${mangaDescription}`}
  keywords={mangaKeywords}
  seoType="NewsArticle"
  createdAt={`${mangaData.attributes.createdAt}`}
  updatedAt={`${mangaData.attributes.updatedAt}`}
  image={mangaThumbnail}
/>

<section class="displayBody w-full h-full">
  <EachPage imgSrc="blob:{fetchImage(`${data.baseUrl}/data-saver/${data.chapterHash}/${data.usingDataSaver[data.pageNumber]}`)}" chapterLength={data.usingDataSaver.length}/>
</section>