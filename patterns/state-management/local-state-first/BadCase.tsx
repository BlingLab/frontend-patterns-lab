import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

// 부모가 모든 항목의 열림 상태를 소유 — 항목이 늘면 부모 state도 늘어남
export default function LocalStateFirstBadCase() {
  const [open0, setOpen0] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const items = [
    { title: '배포 체크리스트', content: 'main 브랜치 PR 승인 → Staging 확인 → Production 배포', open: open0, setOpen: setOpen0 },
    { title: '온보딩 가이드', content: '개발 환경 세팅 → 코드 리뷰 참여 → 첫 번째 PR 작성', open: open1, setOpen: setOpen1 },
    { title: '장애 대응 절차', content: 'Slack #incident 알림 → 담당자 페이징 → 롤백 여부 판단', open: open2, setOpen: setOpen2 },
  ];

  return (
    <Card title="가까운 상태 우선" eyebrow="상태 관리 / 나쁜 예">
      <p>
        부모 컴포넌트가 <strong>모든 항목의 open 상태</strong>를 소유합니다.
        항목이 4개가 되면 open3도 추가해야 하고, 삭제하면 남은 state가 index와 어긋납니다.
      </p>
      <div style={{ marginTop: 16 }}>
        {items.map(({ title, content, open, setOpen }) => (
          <div key={title} style={{ border: '1px solid #fecaca', borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
            <button
              onClick={() => setOpen((v) => !v)}
              style={{ width: '100%', textAlign: 'left', padding: '12px 16px', background: open ? '#fff5f5' : 'white', border: 0, cursor: 'pointer', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}
            >
              {title} <span>{open ? '▲' : '▼'}</span>
            </button>
            {open && <div style={{ padding: '12px 16px', fontSize: 14, color: '#374151', borderTop: '1px solid #fecaca' }}>{content}</div>}
          </div>
        ))}
      </div>
      <p style={{ marginTop: 12, fontSize: 13, color: '#dc2626' }}>
        ⚠ open0, open1, open2가 부모에 분산되어 있습니다. 항목이 N개면 state도 N개입니다.
      </p>
    </Card>
  );
}
