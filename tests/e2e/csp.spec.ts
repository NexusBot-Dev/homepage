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
  // Keine echten Aufrufe an Matomo aus Tests (würde die Statistik verfälschen)
  test.beforeEach(async ({ page }) => {
    await page.route('https://matomo.trynexus.de/**', (route) =>
      route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  });

  test('CSP-Header ohne unsafe-inline bei Scripts', async ({ request }) => {
    const res = await request.get('/de/');
    const csp = res.headers()['content-security-policy'] ?? '';
    const scriptSrc = csp.split(';').find((d) => d.trim().startsWith('script-src')) ?? '';
    expect(scriptSrc).toContain("'self'");
    expect(scriptSrc).not.toContain("'unsafe-inline'");
  });

  // Scripts liegen als Datei unter /_astro/ – sonst bräuchte die nginx-CSP wieder 'unsafe-inline'
  for (const path of pages) {
    test(`kein ausführbares Inline-Script im HTML von ${path}`, async ({ request }) => {
      const html = await (await request.get(path)).text();
      const inline = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)]
        .filter(([, attrs]) => !/\bsrc=/.test(attrs) && !/application\/ld\+json/.test(attrs))
        .map(([, attrs, body]) => `${attrs.trim()} ${body.trim().slice(0, 60)}`);
      expect(inline).toEqual([]);
    });
  }

  test('läuft auch mit der strikten nginx-Richtlinie (ohne unsafe-inline)', async ({ page }) => {
    // Simuliert den zweiten CSP-Header aus nginx – komma-getrennt gelten beide Richtlinien
    const nginx = "default-src 'self'; img-src 'self' data: https:; script-src 'self' https://matomo.trynexus.de; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https://matomo.trynexus.de; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'";
    await page.route('**/*', async (route) => {
      if (route.request().resourceType() !== 'document') return route.continue();
      const response = await route.fetch();
      const headers = response.headers();
      headers['content-security-policy'] = [headers['content-security-policy'], nginx].filter(Boolean).join(', ');
      return route.fulfill({ response, headers });
    });
    const violations = watchCsp(page);
    for (const path of ['/de/', '/de/wiki/dokumentation/stream-alerts/']) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
    }
    await page.locator('[data-command-palette-toggle]:visible').first().click();
    await expect(page.locator('#command-palette')).toBeVisible();
    expect(violations).toEqual([]);
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
