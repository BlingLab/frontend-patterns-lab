import { ButtonHTMLAttributes } from 'react';
export function PendingButton({ pending, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { pending?: boolean }) { return <button className="button" disabled={pending || props.disabled} {...props}>{pending ? '처리 중...' : children}</button>; }
