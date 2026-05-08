import { useCallback, useState } from 'react';

export function useToggle(defaultValue = false) {
  const [on, setOn] = useState(defaultValue);
  const toggle = useCallback(() => setOn((value) => !value), []);
  const getToggleProps = (props: React.ButtonHTMLAttributes<HTMLButtonElement> = {}) => ({
    ...props,
    'aria-pressed': on,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      props.onClick?.(event);
      if (!event.defaultPrevented) toggle();
    },
  });
  return { on, toggle, getToggleProps };
}
