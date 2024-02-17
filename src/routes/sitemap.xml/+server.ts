// export async function GET() {
//   return new Response(
//     `
// 		<?xml version="1.0" encoding="UTF-8" ?>
// 		<urlset
// 			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
// 			xmlns:xhtml="https://www.w3.org/1999/xhtml"
// 			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
// 			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
// 			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
// 			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
// 		>
//       <url>
//         <loc>https://bnierimi.vercel.app/</loc>
//         <lastmod>2023-11-02T10:00:00+00:00</lastmod>
//         <changefreq>weekly</changefreq>
//         <priority>1.0</priority>
//       </url>
//       <url>
//         <loc>https://bnierimi.vercel.app/profile</loc>
//         <lastmod>2023-11-02T14:30:00+00:00</lastmod>
//         <changefreq>monthly</changefreq>
//         <priority>0.8</priority>
//       </url>
    
//       <url>
//         <loc>https://bnierimi.vercel.app/wiki</loc>
//         <lastmod>2023-11-02T09:45:00+00:00</lastmod>
//         <changefreq>weekly</changefreq>
//         <priority>0.8</priority>
//       </url>
//       <url>
//         <loc>https://bnierimi.vercel.app/d/playg</loc>
//         <lastmod>2023-11-02T09:45:00+00:00</lastmod>
//         <changefreq>weekly</changefreq>
//         <priority>0.8</priority>
//       </url>
//       <url>
//         <loc>https://bnierimi.vercel.app/d/akada</loc>
//         <lastmod>2023-11-02T09:45:00+00:00</lastmod>
//         <changefreq>weekly</changefreq>
//         <priority>0.8</priority>
//       </url>
//       <url>
//         <loc>https://bnierimi.vercel.app/d/projects</loc>
//         <lastmod>2023-11-02T09:45:00+00:00</lastmod>
//         <changefreq>weekly</changefreq>
//         <priority>0.8</priority>
//       </url>
    
//       <url>
//         <loc>https://bnierimi.vercel.app/cagpa</loc>
//         <lastmod>2023-11-02T14:30:00+00:00</lastmod>
//         <changefreq>monthly</changefreq>
//         <priority>0.7</priority>
//       </url>
//       <url>
//         <loc>https://bnierimi.vercel.app/t2morse</loc>
//         <lastmod>2023-11-02T14:30:00+00:00</lastmod>
//         <changefreq>monthly</changefreq>
//         <priority>0.7</priority>
//       </url>
//       <url>
//         <loc>https://bnierimi.vercel.app/qanda</loc>
//         <lastmod>2023-11-02T14:30:00+00:00</lastmod>
//         <changefreq>monthly</changefreq>
//         <priority>0.7</priority>
//       </url>
//       <url>
//         <loc>https://bnierimi.vercel.app/quoter</loc>
//         <lastmod>2023-09-22T19:30:00+00:00</lastmod>
//         <changefreq>monthly</changefreq>
//         <priority>0.7</priority>
//       </url>
// 		</urlset>`.trim(),
//     {
//       headers: {
//         'Content-Type': 'application/xml'
//       }
//     }
//   );
// }


// src/routes/sitemap.xml.js

// import { url } from "$lib/config";

export async function GET({ url }: {url: URL}) {
  // const base_url = "https://villaxlnc.vercel.app"; // Replace with your website's base URL
  const pages = [
    { route: "/", changefreq: "daily", priority: 1.0 },
    { route: "/m", changefreq: "daily", priority: 0.9 },
    { route: "/g", changefreq: "weekly", priority: 0.8 },
    { route: "bnierimi.vercel.app/wiki", changefreq: "weekly", priority: 0.8 },
    { route: "bnierimi.vercel.app/d/playg", changefreq: "weekly", priority: 0.8 },
    { route: "bnierimi.vercel.app/d/akada", changefreq: "weekly", priority: 0.8 },
    { route: "bnierimi.vercel.app/d/projects", changefreq: "weekly", priority: 0.8 },
    { route: "bnierimi.vercel.app/cagpa", changefreq: "weekly", priority: 0.8 },
    { route: "bnierimi.vercel.app/t2morse", changefreq: "weekly", priority: 0.8 },
    { route: "bnierimi.vercel.app/qanda", changefreq: "weekly", priority: 0.8 },
    { route: "bnierimi.vercel.app/quoter", changefreq: "weekly", priority: 0.8 },
    // Add more routes here
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const page of pages) {
    const { route, changefreq, priority } = page;
    xml += `<url>`;
    xml += `<loc>${url.origin}${route}</loc>`;
    xml += `<lastmod>2023-11-02T03:38:00+00:00</lastmod>`;
    xml += `<changefreq>${changefreq}</changefreq>`;
    xml += `<priority>${priority}</priority>`;
    xml += `</url>`;
  }

  xml += `</urlset>`;

  const response = new Response(xml);

  response.headers.set("content-type", "application/xml");

  return response;
}
