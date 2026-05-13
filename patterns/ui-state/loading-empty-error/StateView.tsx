import { ReactNode } from 'react';

export type ListState = 'loading' | 'error' | 'empty' | 'success';

export function StateView({
  state,
  errorMessage,
  onRetry,
  onCreate,
  children,
}: {
  state: ListState;
  errorMessage?: string;
  onRetry?: () => void;
  onCreate?: () => void;
  children: ReactNode;
}) {
  if (state === 'loading') {
    return (
      <div className="demo-box" role="status" aria-live="polite">
        <div className="skeleton" />
        <div className="skeleton mt-8" style={{ width: '72%' }} />
        <p className="mb-8">목록을 불러오는 중입니다.</p>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="demo-box" role="alert">
        <strong>목록을 불러오지 못했습니다.</strong>
        <p>{errorMessage ?? '잠시 후 다시 시도해 주세요.'}</p>
        {onRetry ? (
          <button className="button small" type="button" onClick={onRetry}>
            다시 시도
          </button>
        ) : null}
      </div>
    );
  }

  if (state === 'empty') {
    return (
      <div className="demo-box">
        <strong>등록된 항목이 없습니다.</strong>
        <p>첫 항목을 만들면 이 목록에서 바로 확인할 수 있습니다.</p>
        {onCreate ? (
          <button className="button small" type="button" onClick={onCreate}>
            항목 만들기
          </button>
        ) : null}
      </div>
    );
  }

  return <>{children}</>;
}
