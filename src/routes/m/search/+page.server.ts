import { appinfo } from '$lib/config';
import type { Actions, PageServerLoad } from './$types';
// const axios = require('axios');
import axios from "axios";

export const load = (async ({ params, url }) => {
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    try {
      // Fetch tags
      const tagsResponse = await axios.get(`${appinfo.baseUrl}/manga/tag`);
      const tagsData = tagsResponse.data.data;

      const excludedTagIDs = tagsData
      .filter((tag: any) => appinfo.excludedTagNames.includes(tag.attributes.name.en))
      .map((tag: any) => tag.id);

      const data = await request.formData();
      const title = data.get('title');
      const mangaResponse = await axios({
        method: 'GET',
        url: `${appinfo.baseUrl}/manga`,
        params: {
          title: title,
          excludedTags: excludedTagIDs
        }
      });

      console.log(mangaResponse.data.data.map((manga: any) => manga.id));
      
      const mangaData = mangaResponse.data.data;

      const mangaWithThumbnail = await Promise.all(mangaData.map(async (manga: any) => {
        const thumbnailId = manga.relationships?.find((relationship: any) => relationship.type === 'cover_art')?.id;
        if (!thumbnailId) return manga;

        // Fetch cover art
        const thumbnailResponse = await fetch(`https://api.mangadex.org/cover/${thumbnailId}`);
        const thumbnailData = await thumbnailResponse.json();
        // / Fetch the image using fetch API
        const thumbnailSrc = await fetch(`https://uploads.mangadex.org/covers/${manga.id}/${thumbnailData?.attributes?.fileName}`);

        // Get the blob object from the response
        const blob = await thumbnailSrc.blob();

        // Convert the blob object to a data URL
        const thumbnailUrl = URL.createObjectURL(blob);

        // Return manga data with cover art
        return {
          ...manga,
          thumbnailUrl,
          thumbnail: thumbnailData?.data,
        };
      }));

      return mangaWithThumbnail

    } catch (error) {
      return { error };
    }
  }
} satisfies Actions;