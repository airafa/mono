import type { Page, Locator } from '@playwright/test';

export interface PageObject {
  readonly page: Page;
  readonly root: Locator;
}

export function createPageObject(page: Page, rootSelector: string): PageObject {
  return {
    page,
    root: page.locator(rootSelector),
  };
}
