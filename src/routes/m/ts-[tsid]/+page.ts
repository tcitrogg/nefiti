import type { PageLoad } from './$types';

import dgData from "$lib/dgData.json"

export const load = (async ({ params }) => {
    try{
      let tsid = params.tsid
      let thisBook = dgData.books.filter((book)=>book.id==tsid)
      return thisBook.length === 0 ? { bookNotExist: true } : thisBook[0];
    } catch (error) {
      console.error('Error loading manga data:', error);
      // throw error; // Rethrow error to be handled by the calling code
      return { error }
      }
}) satisfies PageLoad;