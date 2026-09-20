// Utility to resolve paths correctly regardless of whether the site is hosted 

export function resolvePath(path: string) {
  // If the path is an external link or an anchor link, leave it alone
  if (path.startsWith('http') || path.startsWith('#')) {
    return path;
  }

  // Get the base URL configured in astro.config.mjs
  let base = import.meta.env.BASE_URL;
  
  // Ensure the base URL does not have a trailing slash for consistent concatenation
  if (base.endsWith('/')) {
    base = base.slice(0, -1);
  }
  
  // If the path starts with a slash, simply append it to the base
  if (path.startsWith('/')) {
    return `${base}${path}`;
  }
  
  return path;
}

const UNPREFIXED_ROUTES: string[] = [];

export function localizedPath(lang: string, path: string) {
  if (path.startsWith('http') || path.startsWith('#')) {
    return path;
  }

  if (!path.startsWith('/')) {
    return resolvePath(path);
  }

  if (UNPREFIXED_ROUTES.some((route) => path === route || path.startsWith(`${route}/`))) {
    return resolvePath(path);
  }

  const suffix = path === '/' ? '/' : path;
  return resolvePath(`/${lang}${suffix}`);
}