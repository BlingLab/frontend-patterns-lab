import { useState, useEffect } from 'react';
import { Card } from '../../../shared/components/Card';

// ❌ useEffect로 이전 값을 state에 저장 — 불필요한 리렌더 발생
export default function UsePreviousBadCase() {
  const [score, setScore] = useState(1000);
  const [previousScore, setPreviousScore] = useState<number | undefined>(undefined);

  // score가 바뀔 때마다 실행 — 한 렌더 뒤에 previousScore가 업데이트됨
  useEffect(() => {
    setPreviousScore(score);
  }, [score]);

  const diff = previousScore !== undefined ? score - previousScore : 0;

  return (
    <Card title="이전 값 훅" eyebrow="훅과 로직 재사용 / 나쁜 예">
      <p>
        <code>previousScore</code>를 state로 저장하고 <code>useEffect</code>로 동기화합니다.
        이 방식은 <strong>두 가지 문제</strong>가 있습니다:
        (1) 렌더마다 setPreviousScore로 추가 리렌더 발생,
        (2) useEffect는 렌더 후 실행되므로 previousScore가 항상 <em>현재</em> score와 같아집니다.
      </p>
      <div style={{ marginTop: 16, padding: 20, background: '#fff5f5', borderRadius: 8, textAlign: 'center', border: '1px solid #fecaca' }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, color: '#6b7280' }}>이전 점수 (useEffect)</p>
        <p style={{ margin: '0 0 8px', fontSize: 24, color: '#9ca3af' }}>{previousScore ?? '—'}</p>
        <p style={{ margin: '0 0 4px', fontSize: 13, color: '#374151', fontWeight: 600 }}>현재 점수</p>
        <p style={{ margin: '0 0 8px', fontSize: 36, fontWeight: 700 }}>{score}</p>
        <p style={{ color: '#dc2626', fontSize: 14 }}>
          diff: {diff} (항상 0이 됩니다 — effect가 즉시 동기화하기 때문)
        </p>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'center' }}>
        <button className="button" onClick={() => setScore((s) => s + 100)}>+100</button>
        <button className="button secondary" onClick={() => setScore((s) => s - 150)}>-150</button>
      </div>
      <p style={{ marginTop: 12, fontSize: 13, color: '#dc2626' }}>
        ⚠ effect가 즉시 실행되므로 previousScore와 score가 항상 같습니다. ref를 쓰면 렌더 주기 내에서 정확히 "이전 값"을 가집니다.
      </p>
    </Card>
  );
}
