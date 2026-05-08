import { useMemo } from 'react';

export function useUrlState() {
  return useMemo(() => new URLSearchParams(window.location.search), []);
}
