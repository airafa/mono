/**
 * Styles for the internal Lit custom element (app-shell.ts).
 * Not used by the React wrapper — see app-shell.ts header comment.
 */
import { css } from 'lit';

export const appShellStyles = css`
  :host {
    display: block;
    min-height: 100vh;
    --shell-topbar-height: 60px;
    --shell-sidebar-width: 60px;
  }

  :host([theme='dark']) {
    --shell-bg: #1a1a2e;
    --shell-surface: #16213e;
    --shell-border: #2a2a4a;
    --shell-text: #e0e0e0;
  }

  :host([theme='light']) {
    --shell-bg: #ffffff;
    --shell-surface: #f8f9fa;
    --shell-border: #dee2e6;
    --shell-text: #212529;
  }

  .shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--shell-bg);
    color: var(--shell-text);
  }

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    height: var(--shell-topbar-height);
    border-block-end: 1px solid var(--shell-border);
    background: var(--shell-surface);
  }

  .body {
    display: flex;
    flex: 1;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-block-start: 0.75rem;
    width: var(--shell-sidebar-width);
    border-inline-end: 1px solid var(--shell-border);
    background: var(--shell-surface);
  }

  .content {
    padding: 1.5rem;
    flex: 1;
  }

  .nav-button {
    margin-block-end: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    color: var(--shell-text);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-button:hover {
    background: var(--shell-border);
  }

  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    color: var(--shell-text);
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .theme-toggle:hover {
    background: var(--shell-border);
  }
`;
