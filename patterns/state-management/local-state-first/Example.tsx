import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{ width: '100%', textAlign: 'left', padding: '12px 16px', background: open ? '#f0f4ff' : 'white', border: 0, cursor: 'pointer', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}
      >
        {title} <span>{open ? '▲' : '▼'}</span>
      </button>
      {open && <div style={{ padding: '12px 16px', fontSize: 14, color: '#374151', borderTop: '1px solid #e5e7eb' }}>{children}</div>}
    </div>
  );
}

export default function LocalStateFirstExample() {
  return (
    <Card title="가까운 상태 우선" eyebrow="상태 관리 / 좋은 예">
      <p>
        열림/닫힘 상태는 <strong>각 AccordionItem 안에</strong> 있습니다.
        부모는 어떤 항목이 열렸는지 전혀 모릅니다. 항목을 추가해도 부모 코드를 건드리지 않습니다.
      </p>
      <div style={{ marginTop: 16 }}>
        <AccordionItem title="배포 체크리스트">
          main 브랜치 PR 승인 → Staging 확인 → Production 배포 → 모니터링 30분
        </AccordionItem>
        <AccordionItem title="온보딩 가이드">
          개발 환경 세팅 → 코드 리뷰 참여 → 첫 번째 PR 작성
        </AccordionItem>
        <AccordionItem title="장애 대응 절차">
          Slack #incident 채널 알림 → 담당자 페이징 → 롤백 여부 판단
        </AccordionItem>
      </div>
      <p style={{ marginTop: 12, fontSize: 13, color: '#6b7280' }}>
        각 항목의 <code>open</code> state는 AccordionItem 내부에만 존재합니다.
        삭제하면 state도 함께 사라집니다.
      </p>
    </Card>
  );
}
