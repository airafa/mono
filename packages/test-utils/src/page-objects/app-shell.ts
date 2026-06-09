import type { Page, Locator } from '@playwright/test';

/**
 * Page Object for the AppShell component.
 *
 * Provides selectors and interaction methods for all app shell elements
 * across all 4 UI variants (MUI, Mantine, Radix, Lit).
 *
 * ## Supported Interactions
 * - `navigate(url)` — Navigate to the app with optional variant query param
 * - `getTopbar()` — Get the topbar locator
 * - `getSidebar()` — Get the sidebar locator
 * - `getContent()` — Get the content area locator
 * - `getNavItem(label)` — Get a navigation item by its accessible label
 * - `toggleTheme()` — Click the theme toggle button
 * - `getThemeToggle()` — Get the theme toggle locator
 */
export class AppShellPageObject {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigate to the app with an optional variant query param */
  async navigate(variant?: string) {
    const url = variant ? `/?ui=${variant}` : '/';
    await this.page.goto(url);
    await this.page.waitForSelector('[data-testid="app-shell"]');
  }

  /** The root app shell container */
  get root(): Locator {
    return this.page.getByTestId('app-shell');
  }

  /** The top bar / header area */
  getTopbar(): Locator {
    return this.page.getByTestId('app-shell-topbar');
  }

  /** The sidebar navigation panel */
  getSidebar(): Locator {
    return this.page.getByTestId('app-shell-sidebar');
  }

  /** The main content area */
  getContent(): Locator {
    return this.page.getByTestId('app-shell-content');
  }

  /** Get a navigation item button by its accessible label */
  getNavItem(label: string): Locator {
    return this.page.getByLabel(label);
  }

  /** The theme toggle button */
  getThemeToggle(): Locator {
    return this.page.getByTestId('theme-toggle');
  }

  /** Click the theme toggle button */
  async toggleTheme() {
    await this.getThemeToggle().click();
  }

  /** Get the logo element */
  getLogo(): Locator {
    return this.page.getByLabel('WSL-AD Logo');
  }

  /** Get the main navigation landmark */
  getNavigation(): Locator {
    return this.page.getByRole('navigation', { name: 'Main navigation' });
  }
}
