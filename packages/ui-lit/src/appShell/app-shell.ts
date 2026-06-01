/**
 * Internal Lit custom element — NOT exported from the package barrel.
 * Reserved for potential future non-React consumers (e.g. vanilla HTML, Angular).
 * The public API is the React wrapper in AppShellWrapper.tsx.
 */
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { appShellStyles } from './styles.js';

@customElement('wsl-app-shell')
export class WslAppShell extends LitElement {
  static override styles = appShellStyles;

  @property({ reflect: true })
  theme: 'light' | 'dark' = 'light';

  override render() {
    return html`
      <div class="shell">
        <header class="topbar">
          <slot name="logo"></slot>
          <slot name="theme-toggle"></slot>
        </header>
        <div class="body">
          <aside class="sidebar">
            <slot name="nav"></slot>
          </aside>
          <main class="content">
            <slot></slot>
          </main>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wsl-app-shell': WslAppShell;
  }
}
