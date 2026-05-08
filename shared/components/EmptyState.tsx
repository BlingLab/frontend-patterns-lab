export function EmptyState({ title = '표시할 내용이 없습니다.', action }: { title?: string; action?: React.ReactNode }) { return <div className="card"><h3>{title}</h3>{action}</div>; }
