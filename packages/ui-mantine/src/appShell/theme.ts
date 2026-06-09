/**
 * Legacy re-export shim — kept for internal backward compatibility.
 * Prefer importing `buildMantineTheme` from `../token-adapter.js` directly.
 * TODO: remove after T034 (ui-contracts migration) completes.
 */
export { buildMantineTheme as buildTheme, getMantineColorScheme } from '../token-adapter.js';
