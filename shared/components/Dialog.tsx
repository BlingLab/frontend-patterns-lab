import { ReactNode } from 'react';

export function Dialog({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null;
  return <div role="dialog" aria-modal="true" className="card"><h3>{title}</h3>{children}<button className="button" onClick={onClose}>닫기</button></div>;
}
