import { appinfo } from '$lib/config';
// import { getCovertArt } from '$lib/utils';
import type { PageLoad } from './$types';


import axios from 'axios';
// import tags from "$lib/tags.json"

// export const load: PageLoad = async ({ event, url }: any) => {
export const load: PageLoad = async ({ url, fetch, setHeaders }: any) => {

  const tags = await axios(`${appinfo.baseUrl}/manga/tag`);

  // ['391b0423-d847-456f-aff0-8b0cfc03066b', '423e2eae-a7a2-4a8b-ac03-a8351462d71d']
  const includedTagIDs = tags.data.data
    .filter((tag: any) => appinfo.includedTagNames.includes(tag.attributes.name.en))
    .map((tag: any) => tag.id);

  // ['aafb99c1-7f60-43fa-b75f-fc9502ce29c7']
  const excludedTagIDs = tags.data.data
    .filter((tag: any) => appinfo.excludedTagNames.includes(tag.attributes.name.en))
    .map((tag: any) => tag.id);

  const resp = await axios({
    method: 'GET',
    url: `${appinfo.baseUrl}/manga`,
    params: {
      'includedTags': includedTagIDs,
      'excludedTags': excludedTagIDs
    }
  });

  // const cover_art_list: any[] = resp.data.data.map(async (eachData:any)=>await getCovertArt(eachData).then((res:any)=>res))
  let data: any[] = []
  // console.log(cover_art_list)
  // let data = resp.data.data.map(async (eachData: any)=>{
  //   const cover_artId = eachData.relationships?.filter((relationship:any) => relationship.type === 'cover_art')[0].id;
  //   const cover_art = await fetch(`https://api.mangadex.org/cover/${cover_artId}`)
  //   const cover_art_json = await cover_art.json()
  // //   // console.log("cover_art", cover_art)
  //   const imgSrc = `https://mangadex.org/covers/${eachData.id}/${cover_art_json?.data?.attributes?.fileName}`

  // //   // cover_art_list.push(imgSrc)
  //   return {cover_art: imgSrc, ...eachData}
  // //   // console.log("imgSrc", imgSrc)
  // })
  // console.log("cover_art_list", data)

  for (const eachData of resp.data.data) {
    const cover_artId = eachData.relationships?.filter((relationship:any) => relationship.type === 'cover_art')[0].id;
    const cover_art = await fetch(`https://api.mangadex.org/cover/${cover_artId}`)
    const cover_art_json = await cover_art.json()
    // console.log("cover_art", cover_art_json)
    // const imgSrc = `https://mangadex.org/covers/${eachData.id}/${cover_art_json?.data?.attributes?.fileName}`
    
    data.push({thumbnail:cover_art_json.data, ...eachData})
  }  
  // console.log("cover_art_list", cover_art_list)
  
  // resp.data.data.forEach((eachData: any) => {
  // });

  // {
  //   mode: 'no-cors'
  // }



  // return imgSrc
  // console.log("cover_art_list", cover_art_list)
  setHeaders({
		// age: resp.headers.get('content-type'),
		// 'cache-control': resp.headers.get('cache-control'),
		'Access-Control-Allow-Origin': true,
	});

  return {
    // title: url.searchParams.get("title"),
    // data: dataWithCoverart
    // data: resp.data.data,
    data,
    // cover_art_list
  };

};