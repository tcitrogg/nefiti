import { appinfo } from '$lib/config';
import { getThumbnail } from '$lib/utils';
// import { mangaData } from '../../../stores/eachPage';
import type { PageServerLoad } from './$types';


import axios from 'axios';

export const load: PageServerLoad = async ({ params }:any) => {
  try {
    const dataResp = await axios({
      method: 'GET',
      url: `${appinfo.baseUrl}/manga/${params.id}`,
    });
    let data = dataResp.data.data;
  
    // Chapters
    const chaptersResp = await axios({
      method: 'GET',
      // &lang=en
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
  
    data = {
      thumbnail: thumbnailData?.data,
      chapters,
      ...data
    }
    // mangaData.set(data)

    return data

  } catch (error) {
    console.log(`(x) Error : ${error}`)
    return { error }
  }


};