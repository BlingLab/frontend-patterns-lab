import { ReactNode } from 'react';

export function Card({ title, eyebrow, children }: { title: string; eyebrow?: string; children: ReactNode }) {
  return <article className="card">{eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}<h3>{title}</h3>{children}</article>;
}
