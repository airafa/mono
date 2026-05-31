import { describe, it, expect } from 'vitest';
import { App } from '../App.js';

describe('App', () => {
  it('is a function component', () => {
    expect(typeof App).toBe('function');
  });

  it('returns a valid React element', () => {
    const result = App();
    expect(result).toBeDefined();
    expect(result.props.id).toBe('app');
  });
});
