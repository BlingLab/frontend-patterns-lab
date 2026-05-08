import { useCallback, useState } from 'react';

export function useControllableState<T>({ value, defaultValue, onChange }: { value?: T; defaultValue: T; onChange?: (value: T) => void }) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const setValue = useCallback((nextValue: T) => {
    if (!isControlled) setInternalValue(nextValue);
    onChange?.(nextValue);
  }, [isControlled, onChange]);
  return [currentValue, setValue] as const;
}
