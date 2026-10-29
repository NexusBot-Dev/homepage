import { SUPPORTED_LANGS } from '../i18n/config';
import { CHANGELOG_PAGE_SIZE, fetchReleases } from '../lib/changelog';
import { directus, readItems } from '../lib/directus';

// Gleiche Logik wie in wiki/[category]/[slug].astro
const getTranslation = (item: any, targetLang: string) => {
  const translations = Array.isArray(item.translations) ? item.translations : [];

  const matched = translations.find((tr: any) => {
    const rawCode = typeof tr.languages_code === 'object' && tr.languages_code !== null
      ? (tr.languages_code.code || tr.languages_code.id)
      : tr.languages_code;

    const code = String(rawCode || '').toLowerCase();
    const target = targetLang.toLowerCase();

    return code === target || code.startsWith(`${target}-`) || target.startsWith(`${code}-`);
  });

  return {
    ...item,
    title: (matched && matched.title) ? matched.title : item.title || '',
    description: (matched && matched.description) ? matched.description : item.description || '',
    content: (matched && matched.content) ? matched.content : item.content || '',
  };
};

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

// HTML aus dem WYSIWYG-Inhalt entfernen, damit nur Fließtext durchsucht wird
const toPlainText = (html: string) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

const changelogEntries = async (lang: string) => {
  const releases = await fetchReleases(lang, -1);
  // Neueste stehen auf der Hauptseite, alle älteren nur im Archiv
  return releases.map((item: any, index: number) => ({
    title: item.title ? `${item.version}: ${item.title}` : item.version,
    description: 'Product update and changelog entry.',
    slug: index < CHANGELOG_PAGE_SIZE ? `/${lang}/changelog/` : `/${lang}/changelog/archive/`,
    type: 'Changelog',
    lang,
  }));
};

const wikiEntries = async () => {
  try {
    const [rawCategories, rawArticles] = await Promise.all([
      directus.request(readItems('doc_categories', {
        fields: ['*', 'translations.*', 'translations.languages_code.*']
      })),
      directus.request(readItems('doc_articles', {
        filter: { status: { _eq: 'published' } },
        sort: ['sort'],
        fields: ['*', 'translations.*', 'translations.languages_code.*']
      }))
    ]);

    return SUPPORTED_LANGS.flatMap((lang) => {
      const categories = new Map<string, any>(
        (rawCategories as any[]).map((c) => [String(c.id), getTranslation(c, lang)])
      );

      return (rawArticles as any[]).flatMap((raw) => {
        const art = getTranslation(raw, lang);
        const cat = categories.get(extractCatId(art.category) ?? '');
        const artSlug = String(art.slug || '').trim();
        const catSlug = String(cat?.slug || '').trim();
        if (!artSlug || !catSlug) return [];

        return [{
          title: art.title,
          description: art.description || cat.title || '',
          content: toPlainText(art.content),
          slug: `/${lang}/wiki/${catSlug}/${artSlug}/`,
          type: 'Wiki',
          lang,
        }];
      });
    });
  } catch (error) {
    console.warn("Wiki-Suchindex konnte nicht geladen werden:", error);
    return [];
  }
};

export async function GET() {
  const [wiki, ...changelog] = await Promise.all([
    wikiEntries(),
    ...SUPPORTED_LANGS.map(changelogEntries),
  ]);

  return new Response(JSON.stringify([...wiki, ...changelog.flat()]), {
    headers: { 'Content-Type': 'application/json' }
  });
}
