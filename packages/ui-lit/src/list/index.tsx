import type { ReactElement } from 'react';
import type { ListComponent, ListProps } from '@mono/ui-contracts';

function List<T>({
  items,
  renderItem,
  'aria-label': ariaLabel,
  loading,
  emptyState,
}: ListProps<T>): ReactElement {
  if (loading) {
    return (
      <div
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        style={{ display: 'flex', justifyContent: 'center', padding: 'var(--spacing-md, 16px)' }}
      >
        <span aria-hidden="true" style={{ animation: 'spin 1s linear infinite' }}>
          ⟳
        </span>
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <div
        aria-label={ariaLabel}
        style={{
          padding: 'var(--spacing-md, 16px)',
          color: 'var(--color-onSurfaceVariant, #586e75)',
        }}
      >
        {emptyState ?? 'No items'}
      </div>
    );
  }
  return (
    <ul
      aria-label={ariaLabel}
      style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        fontFamily: 'var(--font-body-family, "Rubik", sans-serif)',
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            padding: 'var(--spacing-sm, 8px) var(--spacing-md, 16px)',
            borderBottom: '1px solid var(--color-outlineVariant, #93a1a1)',
          }}
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

export { List };
export type { ListComponent };
