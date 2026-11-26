// Läuft nur gegen den gebauten Server (npm run test:e2e:build) – im Dev-Modus setzt Astro keine CSP.
import { test, expect, type Page } from '@playwright/test';

// Sammelt CSP-Verstöße: Browser-Konsole ("Refused to …") und securitypolicyviolation-Events
function watchCsp(page: Page) {
  const violations: string[] = [];
  page.on('console', (m) => { if (/Content Security Policy|Refused to|violates/i.test(m.text())) violations.push(m.text()); });
  page.on('pageerror', (e) => violations.push(`pageerror: ${e.message}`));
  return violations;
}

const pages = ['/de/', '/en/', '/de/features/', '/de/premium/', '/de/changelog/', '/de/wiki/', '/de/wiki/dokumentation/stream-alerts/', '/de/privacy/', '/de/gibtsnicht/'];

test.describe('Strikte CSP', () => {
  test('CSP-Header ohne unsafe-inline bei Scripts', async ({ request }) => {
    const res = await request.get('/de/');
    const csp = res.headers()['content-security-policy'] ?? '';
    const scriptSrc = csp.split(';').find((d) => d.trim().startsWith('script-src')) ?? '';
    expect(scriptSrc).toContain('sha256-');
    expect(scriptSrc).not.toContain("'unsafe-inline'");
  });

  for (const path of pages) {
    test(`keine CSP-Verstöße auf ${path}`, async ({ page }) => {
      const violations = watchCsp(page);
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      expect(violations).toEqual([]);
    });
  }

  test('Suche, Menü und Seitenwechsel funktionieren unter CSP', async ({ page, isMobile }) => {
    const violations = watchCsp(page);
    await page.goto('/de/');
    const toggle = page.locator('[data-command-palette-toggle]:visible').first();
    await toggle.click();
    await expect(page.locator('#command-palette')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#command-palette')).toBeHidden();
    if (isMobile) {
      await page.locator('#mobile-menu-btn').click();
      await expect(page.locator('#mobile-menu')).toBeVisible();
    }
    // echter Seitenwechsel (ohne ClientRouter): Scripts der neuen Seite laufen wieder
    await page.goto('/de/features/');
    await page.locator('[data-command-palette-toggle]:visible').first().click();
    await expect(page.locator('#command-palette')).toBeVisible();
    expect(violations).toEqual([]);
  });

  test('Matomo lädt matomo.js und trackt den Seitenaufruf', async ({ page }) => {
    const violations = watchCsp(page);
    const loaded: string[] = [];
    await page.route('https://matomo.trynexus.de/**', (route) => {
      loaded.push(new URL(route.request().url()).pathname);
      return route.fulfill({ status: 200, contentType: 'application/javascript', body: 'window.__matomoLoaded = true;' });
    });
    await page.goto('/de/');
    await expect.poll(() => page.evaluate(() => (window as any).__matomoLoaded)).toBe(true);
    expect(loaded).toContain('/matomo.js');
    expect(await page.evaluate(() => JSON.stringify((window as any)._paq))).toContain('trackPageView');
    expect(violations).toEqual([]);
  });

  test('Gegenprobe: eingeschleustes Inline-Script wird blockiert', async ({ page }) => {
    const violations = watchCsp(page);
    await page.goto('/de/');
    await page.evaluate(() => {
      const s = document.createElement('script');
      s.textContent = 'window.__injected = true';
      document.body.appendChild(s);
    });
    expect(await page.evaluate(() => (window as any).__injected)).toBeUndefined();
    expect(violations.join('\n')).toMatch(/inline script/i);
  });
});
