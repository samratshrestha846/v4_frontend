import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * A generic hook that manages a filter (or query) object in the URL.
 * T must be an object type describing your query params (e.g., UserQueryParam).
 */
export default function useUrlFilters<T extends Record<string, any>>() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<T>(() => {
    return Object.fromEntries(searchParams.entries()) as T;
  });

  useEffect(() => {
    const newParams = new URLSearchParams();
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(filters) as Array<keyof T>) {
      const val = filters[key];
      if (val !== undefined && val !== null && val !== '') {
        newParams.set(String(key), String(val));
      }
    }

    if (newParams.toString() !== searchParams.toString()) {
      // Update searchParams only if they differ
      setSearchParams(newParams, { replace: true });
    }
  }, [filters, searchParams, setSearchParams]);

  return [filters, setFilters] as const;
}
