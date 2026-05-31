import { describe, it, expect } from 'vitest';
import { getDirection } from '../direction.js';

describe('getDirection', () => {
  it('returns rtl for Hebrew', () => {
    expect(getDirection('he')).toBe('rtl');
  });

  it('returns rtl for Arabic', () => {
    expect(getDirection('ar')).toBe('rtl');
  });

  it('returns ltr for English', () => {
    expect(getDirection('en')).toBe('ltr');
  });

  it('returns ltr for unknown locales', () => {
    expect(getDirection('fr')).toBe('ltr');
  });
});
