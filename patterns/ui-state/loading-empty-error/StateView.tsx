import { ReactNode } from 'react';

export function StateView({ loading, error, empty, children }: { loading?: boolean; error?: string | null; empty?: boolean; children: ReactNode }) {
  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (empty) return <p>표시할 항목이 없습니다.</p>;
  return <>{children}</>;
}
