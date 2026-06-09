import type { ComponentType, ReactNode } from 'react';

export interface ListSortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

export interface ListFilterConfig {
  key: string;
  value: unknown;
}

export interface ListPaginationConfig {
  page: number;
  pageSize: number;
  total: number;
}

export interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  /** REQUIRED — accessible name for the list */
  'aria-label': string;
  sort?: ListSortConfig<T>;
  onSortChange?: (sort: ListSortConfig<T>) => void;
  filter?: ListFilterConfig[];
  onFilterChange?: (filter: ListFilterConfig[]) => void;
  pagination?: ListPaginationConfig;
  onPageChange?: (page: number) => void;
  loading?: boolean;
  emptyState?: ReactNode;
}

export type ListComponent<T> = ComponentType<ListProps<T>>;
