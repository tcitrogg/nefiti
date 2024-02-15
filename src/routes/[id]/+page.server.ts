import { appinfo } from '$lib/config';
import { getThumbnail } from '$lib/utils';
import type { PageLoad } from './$types';


import axios from 'axios';

export const load: PageLoad = async ({ params }:any) => {

  const dataResp = await axios({
    method: 'GET',
    url: `${appinfo.baseUrl}/manga/${params.id}`,
  });
  const data = dataResp.data.data;

  const chaptersResp = await axios({
    method: 'GET',
    url: `${appinfo.baseUrl}/manga/${params.id}/feed?includeFuturePublishAt=0`,
  });
  const chapters = chaptersResp.data.data;

  return {
    id: params.id,
    cover_art: getThumbnail(data),
    data,
    chapters
  };

};