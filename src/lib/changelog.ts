import { directus, readItems } from './directus';

// Gleiche Mapping-Logik wie im Wiki/Terms: title & content pro Sprache aus
// der translations-Relation, alles andere (version, badge, release_date)
// ist sprachneutral und bleibt unverändert.
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
    content: (matched && matched.content) ? matched.content : item.content || '',
  };
};

// Anzahl Releases auf der Changelog-Hauptseite, ältere stehen nur im Archiv
export const CHANGELOG_PAGE_SIZE = 10;

// limit: -1 lädt alle Releases (Directus-Konvention)
export const fetchReleases = async (lang: string, limit: number): Promise<any[]> => {
  try {
    const rawReleases = await directus.request(
      readItems('changelog', {
        filter: { status: { _eq: 'published' } },
        sort: ['-release_date'],
        limit,
        fields: ['*', 'translations.*', 'translations.languages_code.*']
      })
    );
    return rawReleases.map((item: any) => getTranslation(item, lang));
  } catch (error) {
    console.warn("Directus Changelog konnte nicht geladen werden:", error);
    return [];
  }
};

const locale = (lang: string) => (lang === 'en' ? 'en-US' : 'de-DE');

export const formatDate = (dateStr: string, lang: string) =>
  new Date(dateStr).toLocaleDateString(locale(lang), {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

// Releases nach Monat gruppieren, Reihenfolge der Eingabe bleibt erhalten
export const groupByMonth = (releases: any[], lang: string) => {
  const groups: { label: string; releases: any[] }[] = [];
  for (const item of releases) {
    const label = item.release_date
      ? new Date(item.release_date).toLocaleDateString(locale(lang), { month: 'long', year: 'numeric' })
      : '—';
    const last = groups[groups.length - 1];
    if (last && last.label === label) {
      last.releases.push(item);
    } else {
      groups.push({ label, releases: [item] });
    }
  }
  return groups;
};

// Badges sauber in eine Liste aufteilen
export const parseBadges = (badgeField: any): string[] => {
  if (Array.isArray(badgeField)) return badgeField;
  if (typeof badgeField === 'string' && badgeField.trim().length > 0) {
    try {
      const parsed = JSON.parse(badgeField);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return badgeField.split(',').map((b) => b.trim());
  }
  return [];
};

export const badgeConfig: Record<string, { label: string; class: string }> = {
  feature: {
    label: "🚀 Feature",
    class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
  },
  fix: {
    label: "🛠️ Bugfix",
    class: "bg-amber-500/10 text-amber-400 border-amber-500/30"
  },
  security: {
    label: "🛡️ Security",
    class: "bg-rose-500/10 text-rose-400 border-rose-500/30"
  },
  major: {
    label: "🌟 Major",
    class: "bg-purple-500/10 text-purple-400 border-purple-500/30"
  }
};
