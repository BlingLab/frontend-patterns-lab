import { RefObject, useEffect } from 'react';

export function useOutsideClick(ref: RefObject<HTMLElement>, onOutsideClick: () => void) {
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onOutsideClick();
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [ref, onOutsideClick]);
}
