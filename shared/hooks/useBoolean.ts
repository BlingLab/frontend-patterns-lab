import { useCallback, useState } from 'react';
export function useBoolean(defaultValue = false) { const [value, setValue] = useState(defaultValue); return { value, setTrue: useCallback(() => setValue(true), []), setFalse: useCallback(() => setValue(false), []), toggle: useCallback(() => setValue((current) => !current), []) }; }
