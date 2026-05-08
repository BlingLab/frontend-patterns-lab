import { useState, useEffect } from 'react';
import { Card } from '../../../shared/components/Card';
import { delay } from '../../../shared/utils/delay';

// ❌ 데이터 로딩 로직이 컴포넌트 안에 직접 있음
export default function CustomHookBoundaryBadCase() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    delay(500)
      .then(() => {
        if (!cancelled) {
          setUser({ name: '김철수', role: '프론트엔드 개발자' });
          setLoading(false);
        }
      })
      .catch(() => { if (!cancelled) { setError('로드 실패'); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  return (
    <Card title="커스텀 훅 경계" eyebrow="훅과 로직 재사용 / 나쁜 예">
      <p>
        fetch, loading, error 로직이 <strong>컴포넌트 안에 직접</strong> 있습니다.
        이 화면 컴포넌트를 다른 곳에서 재사용하려면 fetch 로직도 함께 복사해야 합니다.
        훅으로 분리하면 로직과 UI를 독립적으로 재사용할 수 있습니다.
      </p>
      <div style={{ marginTop: 16 }}>
        {loading && <div style={{ color: '#6b7280' }}>로딩 중...</div>}
        {error && <div style={{ color: '#dc2626' }}>{error}</div>}
        {user && (
          <div style={{ padding: '14px 16px', border: '1px solid #fca5a5', borderRadius: 8, background: '#fff5f5' }}>
            <p style={{ margin: 0, fontWeight: 700 }}>{user.name}</p>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>{user.role}</p>
          </div>
        )}
      </div>
      <p style={{ marginTop: 12, fontSize: 13, color: '#dc2626' }}>
        ⚠ 이 컴포넌트는 "UserCard 렌더링"과 "유저 데이터 로딩"을 둘 다 담당합니다. 두 이유로 바뀔 수 있습니다.
      </p>
    </Card>
  );
}
