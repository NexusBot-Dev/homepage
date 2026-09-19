import { defineMiddleware } from 'astro:middleware';
import { DEFAULT_LANG, isSupportedLang } from './i18n/config';

const UNPREFIXED_PASSTHROUGH = ['imprint', 'privacy', 'changelog', '404'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  if (pathname === '/') {
    return context.redirect(`/${DEFAULT_LANG}/`, 302);
  }

  if (pathname.includes('.') || pathname.startsWith('/_astro/')) {
    return next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];

  if (UNPREFIXED_PASSTHROUGH.includes(first)) {
    return next();
  }

  if (!isSupportedLang(first)) {
    return context.rewrite('/404');
  }

  context.locals.lang = first;
  return next();
});