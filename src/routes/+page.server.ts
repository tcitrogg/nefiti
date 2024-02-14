// Import necessary dependencies
import axios from 'axios';
import { writable } from 'svelte/store';
import { appinfo } from '$lib/config';
import type { PageLoad } from './$types';

// Define a writable store to hold the fetched data
const data = writable<any>(null);

export const load: PageLoad = async ({ url, fetch, setHeaders }: any) => {
  try {
    // Fetch tags
    const tagsResponse = await axios.get(`${appinfo.baseUrl}/manga/tag`);
    const tagsData = tagsResponse.data.data;

    // Extract included and excluded tag IDs
    const includedTagIDs = tagsData
      .filter((tag: any) => appinfo.includedTagNames.includes(tag.attributes.name.en))
      .map((tag: any) => tag.id);

    const excludedTagIDs = tagsData
      .filter((tag: any) => appinfo.excludedTagNames.includes(tag.attributes.name.en))
      .map((tag: any) => tag.id);

    // Fetch manga data
    const mangaResponse = await axios.get(`${appinfo.baseUrl}/manga`, {
      params: {
        includedTags: includedTagIDs,
        excludedTags: excludedTagIDs
      }
    });
    
    // Process manga data
    const mangaData = mangaResponse.data.data;
    const mangaWithThumbnail = await Promise.all(mangaData.map(async (manga: any) => {
      const thumbnailId = manga.relationships?.find((relationship: any) => relationship.type === 'cover_art')?.id;
      if (!thumbnailId) return manga;
      
      // Fetch cover art
      const thumbnailResponse = await fetch(`https://api.mangadex.org/cover/${thumbnailId}`);
      const thumbnailData = await thumbnailResponse.json();
      
      // Return manga data with cover art
      return {
        ...manga,
        thumbnail: thumbnailData?.data,
      };
    }));

    // Update data store
    data.set(mangaWithThumbnail);

    // Set headers
    setHeaders({
      'Access-Control-Allow-Origin': '*'
    });

    // Return data
    return {
      data: mangaWithThumbnail
    };
  } catch (error) {
    console.error('Error loading manga data:', error);
    throw error; // Rethrow error to be handled by the calling code
  }
};