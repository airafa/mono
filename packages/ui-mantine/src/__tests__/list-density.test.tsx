import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { List } from '../list/index.js';

const items = ['Alpha', 'Beta', 'Gamma'];

function renderList(density?: 'compact' | 'comfortable' | 'spacious') {
  return render(
    <MantineProvider>
      {/* @ts-expect-error density is an extension prop not in base ListProps */}
      <List items={items} renderItem={(i) => i} aria-label="Test list" density={density} />
    </MantineProvider>,
  );
}

describe('Mantine List — densityRecipe integration', () => {
  it('renders all items in comfortable (default) density', () => {
    renderList();
    items.forEach((label) => expect(screen.getByText(label)).toBeInTheDocument());
  });

  it('renders all items in compact density', () => {
    renderList('compact');
    items.forEach((label) => expect(screen.getByText(label)).toBeInTheDocument());
  });

  it('renders all items in spacious density', () => {
    renderList('spacious');
    items.forEach((label) => expect(screen.getByText(label)).toBeInTheDocument());
  });

  it('shows loading state with aria-busy', () => {
    render(
      <MantineProvider>
        <List items={[]} renderItem={(i) => i} aria-label="Loading list" loading />
      </MantineProvider>,
    );
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
  });

  it('shows empty state', () => {
    render(
      <MantineProvider>
        <List
          items={[]}
          renderItem={(i) => i}
          aria-label="Empty list"
          emptyState={<span>Nothing here</span>}
        />
      </MantineProvider>,
    );
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });
});
