import { test, expect } from '@playwright/test';
import { AppShellPageObject } from '@wsl-ad/test-utils/page-objects';

test.describe('Variant Switching', () => {
  const variants = ['mui', 'mantine', 'radix', 'lit'] as const;

  for (const variant of variants) {
    test(`loads ${variant} variant via ?ui= param`, async ({ page }) => {
      const appShell = new AppShellPageObject(page);
      await appShell.navigate(variant);
      await expect(appShell.root).toBeVisible();
      await expect(appShell.getTopbar()).toBeVisible();
      await expect(appShell.getSidebar()).toBeVisible();
      await expect(appShell.getContent()).toBeVisible();
    });
  }

  test('defaults to mui when no ?ui= param', async ({ page }) => {
    const appShell = new AppShellPageObject(page);
    await appShell.navigate();
    await expect(appShell.root).toBeVisible();
    await expect(page.getByText('Active UI variant: mui')).toBeVisible();
  });

  test('defaults to env when ?ui= param is invalid', async ({ page }) => {
    const appShell = new AppShellPageObject(page);
    await page.goto('/?ui=invalid');
    await page.waitForSelector('[data-testid="app-shell"]');
    await expect(appShell.root).toBeVisible();
  });
});
