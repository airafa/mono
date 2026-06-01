import { test, expect } from '@playwright/test';
import { AppShellPageObject } from '@wsl-ad/test-utils/page-objects';

test.describe('AppShell Layout', () => {
  const variants = ['mui', 'mantine', 'radix', 'lit'] as const;

  for (const variant of variants) {
    test.describe(`${variant} variant`, () => {
      test('renders top bar with logo', async ({ page }) => {
        const appShell = new AppShellPageObject(page);
        await appShell.navigate(variant);

        await expect(appShell.getTopbar()).toBeVisible();
        await expect(appShell.getLogo()).toBeVisible();
      });

      test('renders sidebar with navigation items', async ({ page }) => {
        const appShell = new AppShellPageObject(page);
        await appShell.navigate(variant);

        await expect(appShell.getSidebar()).toBeVisible();
        await expect(appShell.getNavigation()).toBeVisible();
        await expect(appShell.getNavItem('Flight Infrastructures')).toBeVisible();
        await expect(appShell.getNavItem('Missions')).toBeVisible();
      });

      test('renders main content area', async ({ page }) => {
        const appShell = new AppShellPageObject(page);
        await appShell.navigate(variant);

        await expect(appShell.getContent()).toBeVisible();
      });

      test('sidebar is at inline-start in LTR', async ({ page }) => {
        const appShell = new AppShellPageObject(page);
        await appShell.navigate(variant);

        const sidebar = appShell.getSidebar();
        const content = appShell.getContent();

        const sidebarBox = await sidebar.boundingBox();
        const contentBox = await content.boundingBox();

        expect(sidebarBox).not.toBeNull();
        expect(contentBox).not.toBeNull();
        expect(sidebarBox!.x).toBeLessThan(contentBox!.x);
      });

      test('sidebar is at inline-end in RTL', async ({ page }) => {
        const appShell = new AppShellPageObject(page);
        await page.goto(`/?ui=${variant}`);
        await page.evaluate(() => {
          document.documentElement.setAttribute('dir', 'rtl');
        });
        await page.waitForSelector('[data-testid="app-shell"]');

        const sidebar = appShell.getSidebar();
        const content = appShell.getContent();

        const sidebarBox = await sidebar.boundingBox();
        const contentBox = await content.boundingBox();

        expect(sidebarBox).not.toBeNull();
        expect(contentBox).not.toBeNull();
        expect(sidebarBox!.x).toBeGreaterThan(contentBox!.x);
      });
    });
  }
});
