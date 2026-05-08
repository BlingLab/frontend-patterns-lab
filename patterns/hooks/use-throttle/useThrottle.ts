import { useEffect, useRef, useState } from 'react';

export function useThrottle<T>(value: T, intervalMs: number) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdated = useRef(0);
  useEffect(() => {
    const now = Date.now();
    if (now - lastUpdated.current >= intervalMs) {
      lastUpdated.current = now;
      setThrottledValue(value);
    }
  }, [value, intervalMs]);
  return throttledValue;
}
