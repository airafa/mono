import { Spinner, Text } from '@radix-ui/themes';
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
      <div role="status" aria-label={ariaLabel} aria-busy="true">
        <Spinner />
      </div>
    );
  }
  if (items.length === 0) {
    return <div aria-label={ariaLabel}>{emptyState ?? <Text color="gray">No items</Text>}</div>;
  }
  return (
    <ul aria-label={ariaLabel} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {items.map((item, i) => (
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

export { List };
export type { ListComponent };
