import { useState, useCallback } from 'react';
import { Card } from '../../../shared/components/Card';

const STATUSES = ['전체', '진행중', '완료', '대기'];

// URL param 없이 URLSearchParams를 시뮬레이션
function useUrlParam(key: string, defaultValue: string) {
  const [value, setValue] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get(key) ?? defaultValue;
  });

  const set = useCallback((next: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, next);
    window.history.replaceState(null, '', `?${params.toString()}`);
    setValue(next);
  }, [key]);

  return [value, set] as const;
}

const TASKS = [
  { id: 1, name: '디자인 검토', status: '완료' },
  { id: 2, name: '백엔드 API 연동', status: '진행중' },
  { id: 3, name: 'QA 테스트', status: '대기' },
  { id: 4, name: '배포 준비', status: '진행중' },
  { id: 5, name: '문서화', status: '완료' },
];

export default function UrlStateExample() {
  const [status, setStatus] = useUrlParam('status', '전체');
  const [search, setSearch] = useUrlParam('q', '');

  const filtered = TASKS.filter(
    (t) => (status === '전체' || t.status === status) && t.name.includes(search),
  );

  return (
    <Card title="URL 상태" eyebrow="상태 관리 / 좋은 예">
      <p>
        필터와 검색어가 <strong>URL 파라미터</strong>에 저장됩니다.
        새로고침해도 상태가 유지되고, URL을 복사해 팀원과 공유할 수 있습니다.
      </p>
      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
        {STATUSES.map((s) => (
          <button
            key={s}
            className={`button${status === s ? '' : ' secondary'}`}
            style={{ padding: '6px 12px' }}
            onClick={() => setStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="검색..."
        style={{ width: '100%', marginTop: 10, padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 6 }}
      />
      <div style={{ marginTop: 12 }}>
        {filtered.map((t) => (
          <div key={t.id} className="list-item">
            <span>{t.name}</span>
            <span className={`badge ${t.status === '완료' ? 'badge-green' : t.status === '진행중' ? 'badge-blue' : 'badge-gray'}`}>{t.status}</span>
          </div>
        ))}
        {filtered.length === 0 && <p style={{ color: '#6b7280', fontSize: 14 }}>결과 없음</p>}
      </div>
      <p style={{ marginTop: 12, fontSize: 13, color: '#6b7280' }}>
        현재 URL: <code style={{ fontSize: 12 }}>?status={status}&amp;q={search}</code> — 새로고침해도 유지됩니다.
      </p>
    </Card>
  );
}
