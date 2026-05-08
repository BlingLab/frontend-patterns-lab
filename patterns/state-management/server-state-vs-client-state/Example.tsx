import { useState, useEffect } from 'react';
import { Card } from '../../../shared/components/Card';
import { delay } from '../../../shared/utils/delay';

type User = { id: string; name: string; email: string };

// ✅ 서버 상태: 원격 데이터 (캐시, refetch 관리)
function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetch() {
    setLoading(true);
    await delay(600);
    setUsers([
      { id: '1', name: '김철수', email: 'kim@example.com' },
      { id: '2', name: '이영희', email: 'lee@example.com' },
      { id: '3', name: '박민준', email: 'park@example.com' },
    ]);
    setLoading(false);
  }

  useEffect(() => { fetch(); }, []);
  return { users, loading, refetch: fetch };
}

export default function ServerStateVsClientStateExample() {
  const { users, loading, refetch } = useUsers();

  // ✅ 클라이언트 상태: UI 제어 값 (선택, 검색)
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = users.filter((u) => u.name.includes(search));
  const selected = users.find((u) => u.id === selectedId);

  return (
    <Card title="서버 상태와 클라이언트 상태" eyebrow="상태 관리 / 좋은 예">
      <p>
        <strong>서버 상태</strong>(users 목록)와 <strong>클라이언트 상태</strong>(selectedId, search)가 분리됩니다.
        Refetch해도 선택 상태는 초기화되지 않습니다.
      </p>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 16 }}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="검색..." style={{ flex: 1, padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: 6 }} />
        <button className="button secondary" onClick={refetch} disabled={loading}>새로고침</button>
      </div>
      {loading ? (
        <p style={{ color: '#6b7280', marginTop: 12 }}>로딩 중...</p>
      ) : (
        <div style={{ marginTop: 10 }}>
          {filtered.map((user) => (
            <div key={user.id} className="list-item" style={{ background: selectedId === user.id ? '#eff6ff' : 'white', cursor: 'pointer' }} onClick={() => setSelectedId(user.id)}>
              <span>{user.name}</span>
              <span style={{ fontSize: 13, color: '#6b7280' }}>{user.email}</span>
            </div>
          ))}
        </div>
      )}
      {selected && (
        <div style={{ marginTop: 12, padding: 12, background: '#f0fff4', border: '1px solid #bbf7d0', borderRadius: 8, fontSize: 14 }}>
          선택됨: <strong>{selected.name}</strong> — 새로고침해도 선택 유지됨
        </div>
      )}
    </Card>
  );
}
