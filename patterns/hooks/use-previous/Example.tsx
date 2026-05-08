import { useState, useRef, useEffect } from 'react';
import { Card } from '../../../shared/components/Card';

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function UsePreviousExample() {
  const [score, setScore] = useState(1000);
  const previousScore = usePrevious(score);

  const diff = previousScore !== undefined ? score - previousScore : 0;
  const trend = diff > 0 ? '📈' : diff < 0 ? '📉' : '—';
  const trendColor = diff > 0 ? '#16a34a' : diff < 0 ? '#dc2626' : '#6b7280';

  return (
    <Card title="이전 값 훅" eyebrow="훅과 로직 재사용 / 좋은 예">
      <p>
        현재 값과 이전 렌더의 값을 비교해 <strong>변화 방향</strong>을 표시합니다.
        <code>usePrevious</code>는 ref에 값을 보관하므로 리렌더를 유발하지 않습니다.
      </p>
      <div style={{ marginTop: 16, padding: 20, background: '#f9fafb', borderRadius: 8, textAlign: 'center' }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, color: '#6b7280' }}>이전 점수</p>
        <p style={{ margin: '0 0 8px', fontSize: 24, color: '#9ca3af' }}>{previousScore ?? '—'}</p>
        <p style={{ margin: '0 0 4px', fontSize: 13, color: '#374151', fontWeight: 600 }}>현재 점수</p>
        <p style={{ margin: '0 0 8px', fontSize: 36, fontWeight: 700 }}>{score}</p>
        {diff !== 0 && (
          <p style={{ margin: 0, fontSize: 18, color: trendColor, fontWeight: 600 }}>
            {trend} {diff > 0 ? '+' : ''}{diff}점
          </p>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'center' }}>
        <button className="button" onClick={() => setScore((s) => s + 100)}>+100</button>
        <button className="button secondary" onClick={() => setScore((s) => s - 150)}>-150</button>
        <button className="button secondary" onClick={() => setScore(1000)}>리셋</button>
      </div>
    </Card>
  );
}
