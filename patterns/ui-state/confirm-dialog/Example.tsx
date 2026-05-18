import { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { ConfirmDialog } from './ConfirmDialog';

export default function ConfirmDialogExample() {
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  return (
    <Card title="확인 다이얼로그" eyebrow="UI 상태 표현 / 좋은 예">
      <p>파괴적 행동은 대상, 결과, 취소 경로가 보이는 확인 단계를 둡니다.</p>
      <div className="demo-box">
        <strong>2026 Q2 캠페인</strong>
        <p>{deleted ? '삭제 처리됨' : '캠페인 초안과 예약 발송 설정이 포함되어 있습니다.'}</p>
        <button className="button danger small" type="button" disabled={deleted} onClick={() => setOpen(true)}>
          캠페인 삭제
        </button>
        <ConfirmDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => {
            setDeleted(true);
            setOpen(false);
          }}
        />
      </div>
      <div className="example-surface">
        <div>
          <strong>대상 명시</strong>
          <span>삭제할 항목을 화면에 남겨 사용자가 의도를 다시 확인할 수 있습니다.</span>
        </div>
        <div>
          <strong>취소 가능</strong>
          <span>확정 전에는 닫기와 취소 경로를 제공해 실수를 되돌릴 수 있게 합니다.</span>
        </div>
      </div>
    </Card>
  );
}
