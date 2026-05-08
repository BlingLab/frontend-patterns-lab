import { useState, useEffect, useRef } from 'react';
import { Card } from '../../../shared/components/Card';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

const PRODUCTS = ['React 완벽 가이드', 'TypeScript 핸드북', 'Node.js 실전', 'Next.js 마스터', 'CSS 모던 레이아웃', 'GraphQL 입문'];

export default function UseDebounceExample() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const requestCount = useRef(0);

  const results = PRODUCTS.filter((p) => p.includes(debouncedQuery));

  // debouncedQuery가 바뀔 때만 API 호출 (시뮬레이션)
  useEffect(() => {
    if (debouncedQuery) requestCount.current += 1;
  }, [debouncedQuery]);

  return (
    <Card title="debounce 훅" eyebrow="훅과 로직 재사용 / 좋은 예">
      <p>
        타이핑 후 <strong>400ms가 지난 뒤</strong>에 debounced 값이 업데이트됩니다.
        "React" 5글자를 빠르게 입력해도 API 요청은 <strong>1번</strong>만 발생합니다.
      </p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어 입력..."
        style={{ width: '100%', marginTop: 16, padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 6 }}
      />
      <div style={{ marginTop: 8, display: 'flex', gap: 16, fontSize: 13 }}>
        <span>입력값: <code className="code-value">{query || '—'}</code></span>
        <span>debounced: <code className="code-value">{debouncedQuery || '—'}</code></span>
        <span>API 호출: <strong>{requestCount.current}회</strong></span>
      </div>
      <div style={{ marginTop: 10 }}>
        {results.map((r) => <div key={r} className="list-item">{r}</div>)}
        {query && results.length === 0 && debouncedQuery && <p style={{ color: '#6b7280', fontSize: 14 }}>결과 없음</p>}
      </div>
    </Card>
  );
}
