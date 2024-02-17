import { appinfo } from '$lib/config';
import { getCovertArt } from '$lib/utils';
import type { PageLoad } from './$types';


import axios from 'axios';

const chapterID = '27cd0902-ad4c-490a-b752-ae032f0503c9';

export const load: PageLoad = async ({ params }:any) => {

  const resp = await axios({
    method: 'GET',
    url: `${appinfo.baseUrl}/at-home/server/${chapterID}`,
  });

const host = resp.data.baseUrl;
const chapterHash = resp.data.chapter.hash;
const data = resp.data.chapter.data;
const dataSaver = resp.data.chapter.dataSaver;

return {
  host, chapterHash, data, dataSaver
}

};