import { appinfo } from '$lib/config';
import { getThumbnail } from '$lib/utils';
import type { PageLoad } from './$types';


import axios from 'axios';

// const chapterID = '27cd0902-ad4c-490a-b752-ae032f0503c9';

export const load: PageLoad = async ({ params, }:any) => {

  // console.log(params)

  try {
    const dataResp = await axios({
      method: 'GET',
      url: `${appinfo.baseUrl}/manga/${params.id}`,
    });
    let data = dataResp.data.data;
  
    // Chapters
    const chaptersResp = await axios({
      method: 'GET',
      url: `${appinfo.baseUrl}/manga/${params.id}/feed?includeFuturePublishAt=0`,
    });
    const chapters = chaptersResp.data.data;

    // Thumbnail
    const thumbnailId = data.relationships?.find((relationship: any) => relationship.type === 'cover_art')?.id;
      if (!thumbnailId) return data;

    // Fetch cover art
    const thumbnailResponse = await fetch(`https://api.mangadex.org/cover/${thumbnailId}`);
    const thumbnailData = await thumbnailResponse.json();
    // / Fetch the image using fetch API
    const thumbnailSrc = await fetch(`https://uploads.mangadex.org/covers/${data.id}/${thumbnailData?.attributes?.fileName}`);
    
    // Get the blob object from the response
    const blob = await thumbnailSrc.blob();
    
    // Convert the blob object to a data URL
    const thumbnailUrl = URL.createObjectURL(blob);
  
    const resp = await axios({
      method: 'GET',
      // url: `${appinfo.baseUrl}/at-home/server/${chapterID}`,
      url: `${appinfo.baseUrl}/at-home/server/${params.cid}`,
    }); 
  
  const baseUrl = resp.data.baseUrl;
  const chapterHash = resp.data.chapter.hash;
  const usingData = resp.data.chapter.data;
  const usingDataSaver = resp.data.chapter.dataSaver;
  
  const result = {
    id: params.cid,
    baseUrl, chapterHash, usingData, usingDataSaver,
    result: resp.data.result,
    mangaInfo: {
      thumbnail: thumbnailData?.data,
      chapters,
      ...data,
    }
  }
  // console.log(result)
  
  return result

  } catch (error) {
    console.log(`(x) Error : ${error}`)
    return { error }
  }

};