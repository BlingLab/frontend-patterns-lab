import { useState, useEffect } from 'react';
import { Card } from '../../../shared/components/Card';
import { delay } from '../../../shared/utils/delay';

type User = { id: string; name: string; role: string };

// ✅ 도메인 로직을 커스텀 훅으로 분리
function useUserProfile(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    delay(500)
      .then(() => {
        if (!cancelled) {
          setUser({ id: userId, name: '김철수', role: '프론트엔드 개발자' });
          setLoading(false);
        }
      })
      .catch(() => { if (!cancelled) { setError('로드 실패'); setLoading(false); } });
    return () => { cancelled = true; };
  }, [userId]);

  return { user, loading, error };
}

// 컴포넌트는 렌더링에만 집중
function UserCard({ userId }: { userId: string }) {
  const { user, loading, error } = useUserProfile(userId);

  if (loading) return <div style={{ color: '#6b7280' }}>로딩 중...</div>;
  if (error) return <div style={{ color: '#dc2626' }}>{error}</div>;
  if (!user) return null;

  return (
    <div style={{ padding: '14px 16px', border: '1px solid #d1d5db', borderRadius: 8, background: '#f9fafb' }}>
      <p style={{ margin: 0, fontWeight: 700 }}>{user.name}</p>
      <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>{user.role}</p>
    </div>
  );
}

export default function CustomHookBoundaryExample() {
  return (
    <Card title="커스텀 훅 경계" eyebrow="훅과 로직 재사용 / 좋은 예">
      <p>
        <code>useUserProfile</code> 훅이 fetch, loading, error를 모두 처리합니다.
        컴포넌트는 <strong>어떻게 데이터를 가져오는지 모릅니다</strong>.
        같은 훅을 다른 화면에서도 재사용할 수 있습니다.
      </p>
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <UserCard userId="user-1" />
        <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>
          동일한 <code>UserCard</code> 컴포넌트 — API 로직은 훅 안에 있습니다.
        </p>
      </div>
    </Card>
  );
}
