import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

// 검색 state가 부모에 있어 타이핑마다 StaticHeader도 리렌더됨
function StaticHeader({ renderCount }: { renderCount: number }) {
  return (
    <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>
      팀원 목록{' '}
      <span style={{ fontSize: 12, color: '#dc2626', fontWeight: 400 }}>
        (리렌더 {renderCount}회)
      </span>
    </h3>
  );
}

function SearchResults({ items }: { items: string[] }) {
  return (
    <div>
      {items.map((name) => <div key={name} className="list-item">{name}</div>)}
      {items.length === 0 && <p style={{ color: '#6b7280', fontSize: 14 }}>검색 결과 없음</p>}
    </div>
  );
}

export default function StateColocationBadCase() {
  const [query, setQuery] = useState('');
  const renderCounters = globalThis as unknown as { __headerCount?: number };
  const headerRenderCount = (renderCounters.__headerCount = (renderCounters.__headerCount ?? 0) + 1);
  const names = ['김철수', '이영희', '박민준', '최수연', '정도현'];
  const filtered = names.filter((n) => n.includes(query));

  return (
    <Card title="상태 위치 맞추기" eyebrow="상태 관리 / 나쁜 예">
      <p>
        <code>query</code> state가 <strong>부모(페이지)</strong>에 있어
        타이핑할 때마다 StaticHeader도 함께 리렌더됩니다.
        state를 SearchBox 안으로 내리면 해결됩니다.
      </p>
      <div style={{ marginTop: 16 }}>
        <StaticHeader renderCount={headerRenderCount} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="이름 검색..."
          style={{ width: '100%', padding: '8px 10px', border: '1px solid #fca5a5', borderRadius: 6, marginBottom: 10 }}
        />
        <SearchResults items={filtered} />
      </div>
      <p style={{ marginTop: 12, fontSize: 13, color: '#dc2626' }}>
        ⚠ 타이핑할 때마다 StaticHeader도 리렌더됩니다 — state 위치가 너무 높습니다.
      </p>
    </Card>
  );
}
