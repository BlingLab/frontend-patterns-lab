import { useMemo } from 'react';
export function useDirtyState<T>(initialValue: T, value: T) { return useMemo(() => JSON.stringify(initialValue) !== JSON.stringify(value), [initialValue, value]); }
