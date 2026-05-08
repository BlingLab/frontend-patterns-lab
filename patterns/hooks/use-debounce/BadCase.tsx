import { useState, useRef } from 'react';
import { Card } from '../../../shared/components/Card';

const PRODUCTS = ['React 완벽 가이드', 'TypeScript 핸드북', 'Node.js 실전', 'Next.js 마스터', 'CSS 모던 레이아웃', 'GraphQL 입문'];

export default function UseDebounceBadCase() {
  const [query, setQuery] = useState('');
  const requestCount = useRef(0);

  // ❌ 입력할 때마다 즉시 필터링 (API 호출 시뮬레이션)
  const results = PRODUCTS.filter((p) => p.includes(query));

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    if (e.target.value) requestCount.current += 1; // 매 키 입력마다 "API 호출"
  }

  return (
    <Card title="debounce 훅" eyebrow="훅과 로직 재사용 / 나쁜 예">
      <p>
        키를 누를 때마다 <strong>즉시 필터링(API 호출)</strong>이 발생합니다.
        "React" 5글자를 입력하면 r, re, rea, reac, react — <strong>5번</strong>의 요청이 나갑니다.
        debounce를 적용하면 마지막 입력 후 한 번만 요청합니다.
      </p>
      <input
        value={query}
        onChange={handleChange}
        placeholder="검색어 입력..."
        style={{ width: '100%', marginTop: 16, padding: '8px 10px', border: '1px solid #fca5a5', borderRadius: 6 }}
      />
      <div style={{ marginTop: 8, fontSize: 13 }}>
        API 호출: <strong style={{ color: '#dc2626' }}>{requestCount.current}회</strong>
        <span style={{ color: '#6b7280', marginLeft: 8 }}>— 타이핑할수록 계속 증가합니다</span>
      </div>
      <div style={{ marginTop: 10 }}>
        {results.map((r) => <div key={r} className="list-item">{r}</div>)}
      </div>
      <p style={{ marginTop: 12, fontSize: 13, color: '#dc2626' }}>
        ⚠ 실제 API라면 "R" "Re" "Rea" "Reac" "React"에 대해 5번의 네트워크 요청이 나갑니다.
      </p>
    </Card>
  );
}
