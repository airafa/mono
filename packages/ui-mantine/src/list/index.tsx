import { List as MantineList, Loader, Text } from '@mantine/core';
import type { ReactElement } from 'react';
import type { ListComponent, ListProps } from '@mono/ui-contracts';
import { densityRecipe } from '@mono/ui-tokens';
import type { DensityVariant } from '@mono/ui-tokens';

type ListWithDensityProps<T> = ListProps<T> & { density?: DensityVariant };

function List<T>({
  items,
  renderItem,
  'aria-label': ariaLabel,
  loading,
  emptyState,
  density = 'comfortable',
}: ListWithDensityProps<T>): ReactElement {
  const densityClass = densityRecipe({ density });
  if (loading) {
    return (
      <div role="status" aria-label={ariaLabel} aria-busy="true" className={densityClass}>
        <Loader size="sm" />
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <div aria-label={ariaLabel} className={densityClass}>
        {emptyState ?? <Text c="dimmed">No items</Text>}
      </div>
    );
  }
  return (
    <MantineList
      aria-label={ariaLabel}
      listStyleType="none"
      style={{ padding: 0 }}
      className={densityClass}
    >
      {items.map((item, i) => (
        <MantineList.Item key={i}>{renderItem(item)}</MantineList.Item>
      ))}
    </MantineList>
  );
}

export { List };
// Satisfies ListComponent<T> contract
export type { ListComponent };
