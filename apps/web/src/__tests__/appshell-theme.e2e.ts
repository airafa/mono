import { test, expect } from '@playwright/test';
import { AppShellPageObject } from '@wsl-ad/test-utils/page-objects';

test.describe('AppShell Theme Toggle', () => {
  const variants = ['mui', 'mantine', 'radix', 'lit'] as const;

  for (const variant of variants) {
    test(`${variant}: theme toggle button is visible`, async ({ page }) => {
      const appShell = new AppShellPageObject(page);
      await appShell.navigate(variant);
      await expect(appShell.getThemeToggle()).toBeVisible();
    });

    test(`${variant}: clicking theme toggle changes appearance`, async ({ page }) => {
      const appShell = new AppShellPageObject(page);
      await appShell.navigate(variant);

      const toggleButton = appShell.getThemeToggle();
      const initialText = await toggleButton.textContent();

      await appShell.toggleTheme();

      const newText = await toggleButton.textContent();
      expect(newText).not.toBe(initialText);
    });

    test(`${variant}: data-theme attribute updates on toggle`, async ({ page }) => {
      const appShell = new AppShellPageObject(page);
      await appShell.navigate(variant);

      const root = appShell.root;
      await expect(root).toHaveAttribute('data-theme', 'light');

      await appShell.toggleTheme();
      await expect(root).toHaveAttribute('data-theme', 'dark');

      await appShell.toggleTheme();
      await expect(root).toHaveAttribute('data-theme', 'light');
    });

    // MUI uses Emotion which injects <style> tags for new component states on toggle.
    // SC-003 exempts MUI's initial Emotion hydration — only non-MUI variants must be zero-runtime.
    if (variant !== 'mui') {
      test(`${variant}: no new style tags injected on theme toggle (SC-003)`, async ({ page }) => {
        const appShell = new AppShellPageObject(page);
        await appShell.navigate(variant);

        const styleCountBefore = await page.evaluate(
          () => document.querySelectorAll('style').length,
        );

        await appShell.toggleTheme();

        const styleCountAfter = await page.evaluate(
          () => document.querySelectorAll('style').length,
        );
        expect(styleCountAfter).toBeLessThanOrEqual(styleCountBefore);
      });
    }
  }
});

test.describe('AppShell Theme Performance (SC-002)', () => {
  const variants = ['mui', 'mantine', 'radix', 'lit'] as const;

  for (const variant of variants) {
    test(`${variant}: theme toggle completes under 100ms with no layout shift`, async ({
      page,
    }) => {
      const appShell = new AppShellPageObject(page);
      await appShell.navigate(variant);

      // Wait for initial render to settle
      await page.waitForLoadState('networkidle');

      // Start observing layout shifts before the toggle
      await page.evaluate(() => {
        (window as any).__cls = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              (window as any).__cls += (entry as any).value;
            }
          }
        });
        observer.observe({ type: 'layout-shift', buffered: false });
      });

      // Measure toggle duration
      const duration = await page.evaluate(async () => {
        const toggle = document.querySelector('[aria-label="Toggle theme"]') as HTMLElement;
        const start = performance.now();
        toggle.click();
        // Wait a frame for React to re-render
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        return performance.now() - start;
      });

      expect(duration).toBeLessThan(100);

      // Allow layout shift observer to collect entries
      await page.waitForTimeout(200);

      const cls = await page.evaluate(() => (window as any).__cls);
      expect(cls).toBe(0);
    });
  }
});
