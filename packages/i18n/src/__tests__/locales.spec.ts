import { describe, it, expect } from 'vitest';
import { en } from '../locales/en.js';
import { he } from '../locales/he.js';

describe('locale dictionaries', () => {
  it('en has ltr direction', () => {
    expect(en.direction).toBe('ltr');
    expect(en.locale).toBe('en');
  });

  it('he has rtl direction', () => {
    expect(he.direction).toBe('rtl');
    expect(he.locale).toBe('he');
  });

  it('en and he have the same message keys', () => {
    const enKeys = Object.keys(en.messages).sort();
    const heKeys = Object.keys(he.messages).sort();
    expect(enKeys).toEqual(heKeys);
  });
});
