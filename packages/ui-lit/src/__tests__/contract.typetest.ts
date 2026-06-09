import { describe, it } from 'vitest';
import type { AppShellComponent, ListComponent, FormComponent } from '@wsl-ad/ui-contracts';
import { AppShell } from '../appShell/index.js';
import { List } from '../list/index.js';
import { Form } from '../forms/index.js';

describe('ui-lit contract type assertions', () => {
  it('AppShell satisfies AppShellComponent', () => {
    const _check: AppShellComponent = AppShell;
    void _check;
  });

  it('List satisfies ListComponent<unknown>', () => {
    const _check: ListComponent<unknown> = List as ListComponent<unknown>;
    void _check;
  });

  it('Form satisfies FormComponent', () => {
    const _check: FormComponent = Form;
    void _check;
  });
});
