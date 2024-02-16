import {metainfo} from '$lib/config';
// import type RequestHandler from './$types';

export const prerender = true;

/** @type {import('./$types').RequestHandler} */
// export const GET = function get({ setHeaders }: RequestHandler) {
export const GET = function get({ setHeaders }: any) {
	// const { backgroundColor, description, siteShortTitle, siteTitle, themeColor } = website;

	const manifest = {
		name: metainfo.title,
		short_name: metainfo.short_name,
		description: metainfo.description,
		start_url: '/',
		background_color: metainfo.background_color,
		theme_color: metainfo.theme_color,
		display: 'standalone',
		icons: [
			{ src: '/favicon.svg', type: 'image/png', sizes: '512x512' },
			{ src: '/favicon-16x16.svg', type: 'image/png', sizes: '16x16' },
			{ src: '/favicon-32x32.svg', type: 'image/png', sizes: '32x32' },
		],
	};

	setHeaders({
		'content-type': 'application/json',
	});

	return new Response(JSON.stringify(manifest));
};