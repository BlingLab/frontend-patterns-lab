import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type PolymorphicButtonProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export function PolymorphicButton<T extends ElementType = 'button'>({ as, children, className, ...props }: PolymorphicButtonProps<T>) {
  const Component = as ?? 'button';
  return <Component className={['button', className].filter(Boolean).join(' ')} {...props}>{children}</Component>;
}
