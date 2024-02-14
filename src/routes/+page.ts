import { appinfo } from '$lib/config';
import { onMount } from 'svelte';
import { writable } from 'svelte/store';
import axios from 'axios';

// Define a writable store to hold the fetched data
const data = writable<any>([]);

export async function load() {
  try {
    const tagsResponse = await axios.get(`${appinfo.baseUrl}/manga/tag`);

    const includedTagIDs = tagsResponse.data.data
      .filter((tag: any) => appinfo.includedTagNames.includes(tag.attributes.name.en))
      .map((tag: any) => tag.id);

    const excludedTagIDs = tagsResponse.data.data
      .filter((tag: any) => appinfo.excludedTagNames.includes(tag.attributes.name.en))
      .map((tag: any) => tag.id);

    const mangaResponse = await axios.get(`${appinfo.baseUrl}/manga`, {
      params: {
        includedTags: includedTagIDs,
        excludedTags: excludedTagIDs
      }
    });

    for (const eachManga of mangaResponse.data.data) {
      const thumbnailId = eachManga.relationships?.find((relationship: any) => relationship.type === 'cover_art')?.id;
      if (thumbnailId) {
        const thumbnailResponse = await axios.get(`https://api.mangadex.org/cover/${thumbnailId}`);
        if (thumbnailResponse.data) {
          data.update(value => [...value, {thumbnail: thumbnailResponse.data.data, ...eachManga}]);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return data
}

// Call the loadData function when the component is mounted
// onMount(loadData);

// Export the data store for use in the component template
// export { data };
