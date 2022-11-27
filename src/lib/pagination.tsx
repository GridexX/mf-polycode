import React from 'react';
import { Pagination } from '@mui/material';

// Types
export interface PaginatedMeta {
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
}

export interface PaginatedFilter {
  page?: number;
  limit?: number;
}

// Utils
export const defaultPaginatedResponse = {
  data: [],
  page: 1,
  limit: 10,
  total: 0,
};

export function concatPaginatedResponse<T>(
  prev: PaginatedResponse<T>,
  next: PaginatedResponse<T>
): PaginatedResponse<T> {
  return {
    data: [...prev.data, ...next.data],
    page: next.page,
    limit: next.limit,
    total: next.total,
  };
}

export function buildPaginatedQuery(filter: PaginatedFilter) {
  let query = '';
  if (filter.page) {
    query += `page=${filter.page}&`;
  }
  if (filter.limit) {
    query += `limit=${filter.limit}&`;
  }
  return query.slice(0, -1);
}

// React hook and component
export function usePagination() {
  const [page, setPage] = React.useState(defaultPaginatedResponse.page);
  const [limit, setLimit] = React.useState(defaultPaginatedResponse.limit);
  const [total, setTotal] = React.useState(defaultPaginatedResponse.total);

  return {
    page,
    setPage,
    limit,
    setLimit,
    total,
    setTotal,
  };
}

interface PaginatorProps<T> {
  request: (page: number, limit: number) => Promise<PaginatedResponse<T>>;
  onChange: (data: T[]) => void;
  onError?: () => void;
  onDone?: () => void;
  props?: any;
}

export function Paginator<T>({
  request,
  onChange,
  onError,
  onDone,
  props,
}: PaginatorProps<T>) {
  const { page, setPage, limit, setLimit, total, setTotal } = usePagination();

  React.useEffect(() => {
    request(defaultPaginatedResponse.page, defaultPaginatedResponse.limit)
      .then((response) => {
        onChange(response.data);
        setLimit(response.limit);
        setTotal(response.total);
      })
      .catch(() => onError && onError())
      .finally(() => onDone && onDone());
  }, [onChange, onDone, onError, request, setLimit, setTotal]);

  return (
    <Pagination
      page={page}
      onChange={(_event, newPage) => {
        request(newPage, limit)
          .then((response) => onChange(response.data))
          .catch(() => onError && onError())
          .finally(() => onDone && onDone());
        setPage(newPage);
      }}
      count={Math.ceil(total / limit)}
      {...props}
    />
  );
}
