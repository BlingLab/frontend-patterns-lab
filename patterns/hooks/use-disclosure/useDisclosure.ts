import { useCallback, useState } from 'react';

export function useDisclosure(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return { isOpen, open: useCallback(() => setIsOpen(true), []), close: useCallback(() => setIsOpen(false), []), toggle: useCallback(() => setIsOpen((value) => !value), []) };
}
