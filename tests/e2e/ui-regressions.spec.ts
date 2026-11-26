import { expect, test, type Page } from '@playwright/test';
import { de } from '../../src/i18n/de';
import { en } from '../../src/i18n/en';

async function useTheme(page: Page, theme: 'light' | 'dark') {
  await page.addInitScript((value) => localStorage.setItem('theme', value), theme);
}

test.describe('theme and navigation regressions', () => {
  // Die Seite hat nur ein dunkles Design — auch bei hellem System und altem Wert aus dem früheren Umschalter
  for (const scheme of ['light', 'dark'] as const) {
    test(`always dark, even with system color scheme ${scheme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await useTheme(page, 'light');
      for (const path of ['/de/', '/de/premium/']) {
        await page.goto(path);
        const look = await page.evaluate(() => ({
          body: getComputedStyle(document.body).backgroundColor,
          scheme: getComputedStyle(document.documentElement).colorScheme,
        }));
        expect(look, path).toEqual({ body: 'rgb(9, 9, 11)', scheme: 'dark' });
      }
    });
  }
});

test.describe('search modal regressions', () => {
  // Fester Suchindex: Der echte kommt aus Directus und ist ohne Verbindung leer
  const index = [
    { title: 'Stream-Alerts einrichten', description: 'Twitch, YouTube und Kick', slug: '/de/wiki/stream/alerts/', type: 'Wiki', lang: 'de' },
    { title: 'Setting up stream alerts', description: 'Twitch, YouTube and Kick', slug: '/en/wiki/stream/alerts/', type: 'Wiki', lang: 'en' },
  ];

  test('search results stay sharp and readable over blurred backdrop', async ({ page }) => {
    await page.route('**/search-index.json', (route) => route.fulfill({ json: index }));
    await page.goto('/de/');
    await page.locator('[data-command-palette-toggle]:visible').first().click();
    await page.locator('#search-input').fill('stream');

    const palette = page.locator('#command-palette > div').nth(1);
    const backdrop = page.locator('[data-command-backdrop]');
    const results = page.locator('#search-results li');

    // Nur der Treffer in der Seitensprache
    await expect(results).toHaveCount(1);
    await expect(results.first()).toContainText('Stream-Alerts einrichten');
    await expect(results.first().locator('a')).toHaveAttribute('href', '/de/wiki/stream/alerts/');
    await expect(backdrop).toHaveCSS('backdrop-filter', /blur/);
    await expect(palette).toHaveCSS('filter', 'none');
  });
});

test.describe('seo regressions', () => {
  for (const lang of ['de', 'en'] as const) {
    test(`/${lang}/ exposes canonical, robots, open graph, and twitter metadata`, async ({ page }) => {
      await page.goto(`/${lang}/`);

      const url = `https://trynexus.de/${lang}/`;
      const image = 'https://trynexus.de/og-image.png';
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', url);
      await expect(page.locator('link[rel="sitemap"]')).toHaveAttribute('href', '/sitemap.xml');
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', url);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', image);
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', lang === 'de' ? 'de_DE' : 'en_US');
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', image);
    });
  }

  // Titel und Beschreibung (auch für Link-Vorschauen) kommen aus den Übersetzungen der Seitensprache
  const pages = {
    '': 'siteDescription',
    'features/': 'features',
    'premium/': 'premium',
    'changelog/': 'changelog',
    'changelog/archive/': 'changelog',
    'wiki/': 'wiki',
    'privacy/': 'privacy',
    'terms/': 'terms',
    'imprint/': 'imprint',
  } as const;

  for (const [lang, dict] of Object.entries({ de, en })) {
    test(`/${lang}/ pages describe themselves in their own language`, async ({ page }) => {
      for (const [path, key] of Object.entries(pages)) {
        const text = dict.meta[key];
        await page.goto(`/${lang}/${path}`);
        for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
          await expect(page.locator(selector), `/${lang}/${path} ${selector}`).toHaveAttribute('content', text);
        }
      }

      await page.goto(`/${lang}/`);
      await expect(page).toHaveTitle(dict.meta.homeTitle);
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', dict.meta.homeTitle);
      await expect(page.locator('footer')).toContainText(dict.meta.siteDescription);
    });
  }

  test('translations differ between languages', () => {
    // Bewusst in beiden Sprachen gleich (die deutsche Beschreibung bleibt vorerst englisch)
    const sameOnPurpose: string[] = ['siteDescription'];
    for (const key of Object.keys(de.meta) as (keyof typeof de.meta)[]) {
      if (sameOnPurpose.includes(key)) continue;
      expect(en.meta[key], key).not.toBe(de.meta[key]);
    }
    for (const key of Object.keys(de.notFound) as (keyof typeof de.notFound)[]) {
      expect(en.notFound[key], key).not.toBe(de.notFound[key]);
    }
  });

  test('only the homepage declares the bot as SoftwareApplication', async ({ page }) => {
    const types = async (path: string) => {
      await page.goto(path);
      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      return blocks.map((block) => JSON.parse(block)['@type']);
    };
    for (const lang of ['de', 'en']) {
      expect(await types(`/${lang}/`), `/${lang}/`).toEqual(['WebSite', 'SoftwareApplication']);
      expect(await types(`/${lang}/features/`), `/${lang}/features/`).toEqual(['WebSite']);
    }
  });

  // Unbekannte Seiten: Sprache aus dem Pfad, ohne Sprachkürzel Deutsch
  for (const [path, dict, lang] of [
    ['/de/gibt-es-nicht/', de, 'de'],
    ['/en/does-not-exist/', en, 'en'],
    ['/gibt-es-nicht/', de, 'de'],
  ] as const) {
    test(`404 page speaks the language of ${path}`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page).toHaveTitle(`${dict.notFound.title} | Nexus Bot`);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', dict.notFound.description);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(dict.notFound.heading);
      await expect(page.locator('main, body').first()).toContainText(dict.notFound.text);
      await expect(page.getByRole('link', { name: dict.notFound.homeButton })).toHaveAttribute('href', `/${lang}/`);
      await expect(page.getByRole('link', { name: dict.notFound.docsButton })).toHaveAttribute('href', `/${lang}/wiki/`);
    });
  }

  test('sitemap and robots are crawlable', async ({ page }) => {
    const sitemap = await page.goto('/sitemap.xml');
    expect(sitemap?.ok()).toBe(true);
    for (const lang of ['de', 'en']) {
      for (const path of ['', 'features/', 'premium/']) {
        await expect(page.locator('body')).toContainText(`https://trynexus.de/${lang}/${path}`);
      }
    }

    const robots = await page.goto('/robots.txt');
    expect(robots?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('User-agent: *');
    await expect(page.locator('body')).toContainText('Allow: /');
    await expect(page.locator('body')).toContainText('Sitemap: https://trynexus.de/sitemap.xml');
  });
});

test.describe('layout regressions', () => {
  test('feature cards do not clip their text', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Feature clipping check targets tablet/desktop grid behavior.');

    await page.goto('/');

    for (const card of await page.locator('#features .glass-panel').all()) {
      const clipped = await card.evaluate((el) => el.scrollHeight > el.clientHeight + 1);
      expect(clipped).toBe(false);
    }
  });

  test('homepage feature cards do not overlap at iPad width', async ({ page, isMobile }) => {
    test.skip(isMobile, 'iPad layout check targets tablet/desktop grid behavior.');

    await page.goto('/');

    const cards = await page.locator('#features .glass-panel').all();
    const boxes = [];
    for (const card of cards) {
      const box = await card.boundingBox();
      expect(box).not.toBeNull();
      boxes.push(box!);
    }

    for (let i = 0; i < boxes.length; i += 1) {
      for (let j = i + 1; j < boxes.length; j += 1) {
        const a = boxes[i];
        const b = boxes[j];
        const overlapX = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
        const overlapY = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
        expect(overlapX * overlapY).toBe(0);
      }
    }
  });
});
