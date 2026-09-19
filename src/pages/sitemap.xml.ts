import type { APIRoute } from 'astro';
import { SITE_URL } from '../config';
import { directus, readItems } from '../lib/directus';
import { SUPPORTED_LANGS } from '../i18n/config';

type SitemapEntry = {
  path: string;
  lastmod?: Date;
};

const localizedStaticPaths: string[] = [
  '/',
  '/features/',
  '/wiki/',
  '/terms/',
  '/changelog/',
];

const unlocalizedStaticEntries: SitemapEntry[] = [
  { path: '/privacy/' },
  { path: '/imprint/' },
];

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const formatDate = (date: Date) => date.toISOString().split('T')[0];

const extractCatId = (catVal: any): string | null => {
  if (!catVal) return null;
  if (Array.isArray(catVal) && catVal.length > 0) {
    const first = catVal[0];
    return String(typeof first === 'object' && first !== null ? (first.id || first.doc_categories_id) : first);
  }
  if (typeof catVal === 'object' && catVal !== null) {
    return String(catVal.id || catVal.doc_categories_id);
  }
  return String(catVal);
};

export const GET: APIRoute = async () => {
  let wikiEntries: SitemapEntry[] = [];

  try {
    const [rawCategories, rawArticles] = await Promise.all([
      directus.request(readItems('doc_categories', {
        fields: ['id', 'slug']
      })),
      directus.request(readItems('doc_articles', {
        filter: { status: { _eq: 'published' } },
        // Nur noch id, slug und category abfragen:
        fields: ['id', 'slug', 'category']
      }))
    ]);

    const categoryMap = new Map<string, string>();
    for (const cat of rawCategories as any[]) {
      if (cat.id && cat.slug) {
        categoryMap.set(String(cat.id), String(cat.slug).trim());
      }
    }

    for (const art of rawArticles as any[]) {
      const artSlug = String(art.slug || '').trim();
      const catId = extractCatId(art.category);
      const catSlug = catId ? categoryMap.get(catId) : null;

      if (!artSlug || !catSlug) continue;

      for (const lang of SUPPORTED_LANGS) {
        wikiEntries.push({
          path: `/${lang}/wiki/${catSlug}/${artSlug}/`
        });
      }
    }
  } catch (error) {
    console.error("Sitemap Directus Fetch Error:", error);
  }

  const localizedEntries: SitemapEntry[] = SUPPORTED_LANGS.flatMap((lang) =>
    localizedStaticPaths.map((path) => ({
      path: path === '/' ? `/${lang}/` : `/${lang}${path}`,
    }))
  );

  const entries: SitemapEntry[] = [
    ...localizedEntries,
    ...unlocalizedStaticEntries,
    ...wikiEntries
  ];

  const urls = entries
    .map((entry) => {
      const loc = new URL(entry.path, SITE_URL).href;
      const lastmod = entry.lastmod ? `\n    <lastmod>${formatDate(entry.lastmod)}</lastmod>` : '';

      return `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmod}
  </url>`;
    })
    .join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};