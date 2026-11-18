import { expect, test, type Page } from '@playwright/test';

// Kopfzeile: Sprachmenü (wie im Dashboard), Changelog-Link, Handy/Tablet mit Menü-Knopf.
// Die Tests setzen ihre Fenstergröße selbst und laufen deshalb nur im Desktop-Projekt.
test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-desktop', 'setzt die Fenstergröße selbst');
});

const langButton = (page: Page) => page.locator('#lang-switcher-btn');
const langMenu = (page: Page) => page.locator('#lang-dropdown');

async function headerOverflow(page: Page) {
  return page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    return [...document.querySelectorAll('header *')]
      .filter((el) => el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().right > width + 0.5)
      .map((el) => el.tagName);
  });
}

test.describe('Sprachmenü', () => {
  test('Dropdown wechselt die Sprache und bleibt auf derselben Seite', async ({ page }) => {
    await page.goto('/de/premium/');
    await expect(langButton(page)).toContainText('DE');
    await expect(langMenu(page)).toBeHidden();

    await langButton(page).click();
    await expect(langMenu(page)).toBeVisible();
    await expect(langButton(page)).toHaveAttribute('aria-expanded', 'true');
    await expect(langMenu(page).locator('a[aria-current="true"]')).toHaveText('Deutsch');

    await langMenu(page).getByRole('link', { name: 'English' }).click();
    await expect(page).toHaveURL(/\/en\/premium\/$/);
    await expect(langButton(page)).toContainText('EN');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('Flaggen als SVG: Button mit Kürzel, Menü mit ausgeschriebener Sprache', async ({ page }) => {
    // Emoji-Flaggen zeigt Chrome unter Windows nur als Buchstaben
    const loaded = (img: ReturnType<Page['locator']>) => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);
    await page.goto('/en/');
    await expect(langButton(page)).toHaveText('EN');
    await expect(langButton(page)).toHaveAttribute('aria-label', 'Language: English');
    await expect(langButton(page).locator('img')).toHaveAttribute('src', '/flags/gb.svg');
    expect(await loaded(langButton(page).locator('img'))).toBe(true);

    await langButton(page).click();
    const links = langMenu(page).getByRole('link');
    await expect(links).toHaveText(['Deutsch', 'English']);
    for (const [name, lang, flag] of [['Deutsch', 'de', 'de'], ['English', 'en', 'gb']]) {
      const link = langMenu(page).getByRole('link', { name });
      await expect(link).toHaveAttribute('lang', lang);
      await expect(link.locator('img')).toHaveAttribute('src', `/flags/${flag}.svg`);
      await expect.poll(() => loaded(link.locator('img'))).toBe(true);
    }
    expect(await page.locator('#lang-switcher').innerText()).not.toMatch(/[\u{1F1E6}-\u{1F1FF}]/u);
  });

  test('schließt bei Klick daneben und mit Escape', async ({ page }) => {
    await page.goto('/de/');
    await langButton(page).click();
    await expect(langMenu(page)).toBeVisible();
    await page.locator('main').click({ position: { x: 5, y: 5 } });
    await expect(langMenu(page)).toBeHidden();
    await expect(langButton(page)).toHaveAttribute('aria-expanded', 'false');

    await langButton(page).click();
    await page.keyboard.press('Escape');
    await expect(langMenu(page)).toBeHidden();
  });

  test('funktioniert nach einem Seitenwechsel ohne Neuladen weiter', async ({ page }) => {
    await page.goto('/de/');
    await page.locator('header nav').getByRole('link', { name: 'Changelog' }).click();
    await expect(page).toHaveURL(/\/de\/changelog\/$/);
    await langButton(page).click();
    await expect(langMenu(page)).toBeVisible();
  });
});

test.describe('Handy: Sprache direkt sichtbar', () => {
  test('ohne das Menü zu öffnen', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/de/');
    await expect(langButton(page)).toBeVisible();
    await expect(page.locator('#mobile-menu')).toBeHidden();

    await langButton(page).click();
    await langMenu(page).getByRole('link', { name: 'English' }).click();
    await expect(page).toHaveURL(/\/en\/$/);
  });

  test('das Menü enthält den Changelog, aber keinen zweiten Sprachumschalter', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/de/');
    await page.locator('#mobile-menu-btn').click();
    const menu = page.locator('#mobile-menu');
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('link', { name: 'Changelog' })).toBeVisible();
    await expect(menu.locator('a[href^="/en"]')).toHaveCount(0);
  });
});

test.describe('Navigation', () => {
  test('Desktop: fünf Links, Changelog als fünfter', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/en/');
    const links = page.locator('header nav a');
    await expect(links).toHaveText(['Features', 'Roadmap', 'Premium', 'Wiki', 'Changelog']);
    for (const link of await links.all()) {
      const href = (await link.getAttribute('href'))!;
      if (!href.includes('#')) expect(href, 'kein Umweg über eine Weiterleitung').toMatch(/\/$/);
    }
    await links.nth(4).click();
    await expect(page).toHaveURL(/\/en\/changelog\/$/);
    await expect(page.locator('#lang-switcher-btn')).toBeVisible(); // echte Seite, keine 404
  });

  for (const width of [360, 390, 768, 820, 1024, 1280]) {
    test(`Kopfzeile passt bei ${width} px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/de/');
      expect(await headerOverflow(page)).toEqual([]);
      // Unter 1024 px: Menü-Knopf statt Links (fünf Links passen erst ab da)
      await expect(page.locator('#mobile-menu-btn')).toBeVisible({ visible: width < 1024 });
      await expect(page.locator('header nav')).toBeVisible({ visible: width >= 1024 });
    });
  }
});

test.describe('Seite lässt sich nicht seitlich verschieben', () => {
  // Bei 1024 px stand früher die letzte Footer-Spalte 8 px über den Rand (zu große Mindestbreiten im Raster)
  for (const path of ['/de/', '/en/', '/de/premium/']) {
    for (const width of [360, 390, 768, 820, 1024, 1100, 1280]) {
      test(`${path} bei ${width} px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(path);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      });
    }
  }
});
