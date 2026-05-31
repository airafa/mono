export type LayoutDirection = 'ltr' | 'rtl';

const RTL_LOCALES = new Set(['he', 'ar']);

export function getDirection(locale: string): LayoutDirection {
  return RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';
}
