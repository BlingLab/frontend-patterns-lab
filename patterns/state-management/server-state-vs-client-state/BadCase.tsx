import { useState, useEffect } from 'react';
import { Card } from '../../../shared/components/Card';
import { delay } from '../../../shared/utils/delay';

type User = { id: string; name: string; email: string };
type StoreState = {
  users: User[];
  loading: boolean;
  selectedId: string | null;
  search: string;
};

// ❌ 서버 상태와 클라이언트 상태를 하나의 store에 섞음
function useMixedStore() {
  const [store, setStore] = useState<StoreState>({
    users: [], loading: true, selectedId: null, search: '',
  });

  async function fetchUsers() {
    setStore((s) => ({ ...s, loading: true, selectedId: null, search: '' })); // ← 리셋 실수!
    await delay(600);
    setStore((s) => ({
      ...s,
      loading: false,
      users: [
        { id: '1', name: '김철수', email: 'kim@example.com' },
        { id: '2', name: '이영희', email: 'lee@example.com' },
        { id: '3', name: '박민준', email: 'park@example.com' },
      ],
    }));
  }

  useEffect(() => { fetchUsers(); }, []);
  return { store, setStore, refetch: fetchUsers };
}

export default function ServerStateVsClientStateBadCase() {
  const { store, setStore, refetch } = useMixedStore();
  const filtered = store.users.filter((u) => u.name.includes(store.search));

  return (
    <Card title="서버 상태와 클라이언트 상태" eyebrow="상태 관리 / 나쁜 예">
      <p>
        서버 데이터와 UI 상태(selectedId, search)가 <strong>같은 store</strong>에 있습니다.
        새로고침 시 fetchUsers가 selectedId와 search를 함께 초기화합니다.
      </p>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 16 }}>
        <input
          value={store.search}
          onChange={(e) => setStore((s) => ({ ...s, search: e.target.value }))}
          placeholder="검색..."
          style={{ flex: 1, padding: '7px 10px', border: '1px solid #fca5a5', borderRadius: 6 }}
        />
        <button className="button secondary" onClick={refetch} disabled={store.loading}>새로고침</button>
      </div>
      {store.loading ? (
        <p style={{ color: '#6b7280', marginTop: 12 }}>로딩 중...</p>
      ) : (
        <div style={{ marginTop: 10 }}>
          {filtered.map((user) => (
            <div key={user.id} className="list-item" style={{ background: store.selectedId === user.id ? '#fff5f5' : 'white', cursor: 'pointer', border: '1px solid #fca5a5' }}
              onClick={() => setStore((s) => ({ ...s, selectedId: user.id }))}>
              <span>{user.name}</span>
              <span style={{ fontSize: 13, color: '#6b7280' }}>{user.email}</span>
            </div>
          ))}
        </div>
      )}
      <p style={{ marginTop: 12, fontSize: 13, color: '#dc2626' }}>
        ⚠ 사용자를 선택하고 새로고침을 누르면 선택이 초기화됩니다 — 서버/클라이언트 상태가 섞여있기 때문입니다.
      </p>
    </Card>
  );
}
