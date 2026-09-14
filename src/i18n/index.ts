import { de } from './de';
import { en } from './en';
import type { Dictionary } from './types';
import { type Lang, DEFAULT_LANG } from './config';

const dictionaries: Record<Lang, Dictionary> = { de, en };

export function useTranslations(lang: string | undefined): Dictionary {
  return dictionaries[(lang as Lang) ?? DEFAULT_LANG] ?? dictionaries[DEFAULT_LANG];
}

export * from './config';
export type { Dictionary };
