import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

export default function LoadingEmptyErrorBadCase() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(true);
  const [items, setItems] = useState<string[]>([]);

  return (
    <Card title="로딩/빈 상태/에러" eyebrow="UI 상태 표현 / 나쁜 예">
      <p>상태를 여러 boolean과 배열 길이에 흩어두면 동시에 참인 상태가 생기고 다음 행동도 빠집니다.</p>
      <div className="demo-row" role="group" aria-label="상태 토글">
        <button className="button small secondary" type="button" onClick={() => setIsLoading((value) => !value)}>
          loading {isLoading ? 'on' : 'off'}
        </button>
        <button className="button small secondary" type="button" onClick={() => setHasError((value) => !value)}>
          error {hasError ? 'on' : 'off'}
        </button>
        <button
          className="button small secondary"
          type="button"
          onClick={() => setItems((current) => (current.length ? [] : ['INV-1024']))}
        >
          data {items.length ? 'on' : 'off'}
        </button>
      </div>
      <div className="demo-box">
        {isLoading && <p role="status">불러오는 중...</p>}
        {hasError && <p role="alert">오류가 발생했습니다.</p>}
        {items.length === 0 && <p>표시할 항목이 없습니다.</p>}
        {items.map((item) => (
          <div className="list-item" key={item}>
            <span>{item}</span>
            <span className="badge badge-gray">상태 불명</span>
          </div>
        ))}
      </div>
      <div className="example-surface">
        <div>
          <strong>충돌 상태</strong>
          <span>로딩, 에러, 빈 상태가 동시에 보일 수 있어 사용자가 현재 상태를 판단하기 어렵습니다.</span>
        </div>
        <div>
          <strong>복구 누락</strong>
          <span>에러와 빈 상태가 각각 무엇을 해야 하는지 알려주지 않습니다.</span>
        </div>
      </div>
    </Card>
  );
}
