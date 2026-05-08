import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

// 검색 상태가 SearchBox 안에 있어 부모는 리렌더되지 않는다
function SearchBox() {
  const [query, setQuery] = useState('');
  const names = ['김철수', '이영희', '박민준', '최수연', '정도현'];
  const filtered = names.filter((n) => n.includes(query));

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="이름 검색..."
        style={{ width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 6, marginBottom: 10 }}
      />
      {filtered.map((name) => (
        <div key={name} className="list-item">{name}</div>
      ))}
      {filtered.length === 0 && <p style={{ color: '#6b7280', fontSize: 14 }}>검색 결과 없음</p>}
    </div>
  );
}

function StaticHeader() {
  return <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>팀원 목록</h3>;
}

export default function StateColocationExample() {
  return (
    <Card title="상태 위치 맞추기" eyebrow="상태 관리 / 좋은 예">
      <p>
        검색어 <code>query</code> state는 <strong>SearchBox 안에</strong> 있습니다.
        타이핑할 때 StaticHeader는 전혀 리렌더되지 않습니다.
        state의 위치 = 리렌더 범위입니다.
      </p>
      <div style={{ marginTop: 16 }}>
        <StaticHeader />
        <SearchBox />
      </div>
    </Card>
  );
}
