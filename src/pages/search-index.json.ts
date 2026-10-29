import { SUPPORTED_LANGS } from '../i18n/config';
import { CHANGELOG_PAGE_SIZE, fetchReleases } from '../lib/changelog';

export async function GET() {
  const perLang = await Promise.all(
    SUPPORTED_LANGS.map(async (lang) => {
      const releases = await fetchReleases(lang, -1);
      // Neueste stehen auf der Hauptseite, alle älteren nur im Archiv
      return releases.map((item: any, index: number) => ({
        title: item.title ? `${item.version}: ${item.title}` : item.version,
        description: 'Product update and changelog entry.',
        slug: index < CHANGELOG_PAGE_SIZE ? `/${lang}/changelog/` : `/${lang}/changelog/archive/`,
        type: 'Changelog',
        lang,
      }));
    })
  );

  return new Response(JSON.stringify(perLang.flat()), {
    headers: { 'Content-Type': 'application/json' }
  });
}
