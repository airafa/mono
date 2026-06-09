import MuiList from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { ListComponent, ListProps } from '@wsl-ad/ui-contracts';

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
        <CircularProgress size={24} />
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <div aria-label={ariaLabel}>
        {emptyState ?? <Typography color="text.secondary">No items</Typography>}
      </div>
    );
  }
  return (
    <MuiList aria-label={ariaLabel} disablePadding>
      {items.map((item, i) => (
        <ListItem key={i} disableGutters>
          {renderItem(item)}
        </ListItem>
      ))}
    </MuiList>
  );
}

export { List };
export type { ListComponent };
