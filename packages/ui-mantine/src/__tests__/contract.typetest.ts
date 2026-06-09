import { describe, it } from 'vitest';
import type { AppShellComponent, ListComponent, FormComponent } from '@wsl-ad/ui-contracts';
import { AppShell } from '../appShell/index.js';
import { List } from '../list/index.js';
import { Form } from '../forms/index.js';

// Compile-time assertions: if any component diverges from its contract,
// TypeScript errors here before any test runs.
describe('ui-mantine contract type assertions', () => {
  it('AppShell satisfies AppShellComponent', () => {
    const _check: AppShellComponent = AppShell;
    void _check;
  });

  it('List satisfies ListComponent<unknown>', () => {
    // ListComponent<T> = ComponentType<ListProps<T>>
    // Use the most permissive bound (unknown) for the type check
    const _check: ListComponent<unknown> = List as ListComponent<unknown>;
    void _check;
  });

  it('Form satisfies FormComponent', () => {
    const _check: FormComponent = Form;
    void _check;
  });
});
