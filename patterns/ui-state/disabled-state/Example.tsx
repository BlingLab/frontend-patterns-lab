import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

export default function DisabledStateExample() {
  const [selectedCount, setSelectedCount] = useState(0);
  const disabledReason = selectedCount === 0 ? '삭제할 항목을 먼저 선택하세요.' : undefined;

  return (
    <Card title="비활성 상태" eyebrow="UI 상태 표현 / 좋은 예">
      <p>액션이 비활성인 이유를 버튼 가까이에 설명하고, 같은 이유로 handler도 보호합니다.</p>
      <div className="demo-box">
        <div className="demo-row" role="group" aria-label="선택 상태 변경">
          <button className="button small secondary" type="button" onClick={() => setSelectedCount(0)}>
            선택 해제
          </button>
          <button className="button small secondary" type="button" onClick={() => setSelectedCount(3)}>
            3개 선택
          </button>
        </div>
        <div className="demo-row">
          <button
            className="button danger small"
            type="button"
            disabled={Boolean(disabledReason)}
            aria-describedby="bulk-delete-help"
            onClick={() => {
              if (disabledReason) return;
            }}
          >
            선택 항목 삭제
          </button>
          <span id="bulk-delete-help">{disabledReason ?? `${selectedCount}개 항목을 삭제할 수 있습니다.`}</span>
        </div>
      </div>
      <div className="example-surface">
        <div>
          <strong>이유 연결</strong>
          <span>버튼과 비활성 사유를 aria-describedby로 연결합니다.</span>
        </div>
        <div>
          <strong>같은 출처</strong>
          <span>UI disabled와 실제 handler guard가 같은 disabledReason을 사용합니다.</span>
        </div>
      </div>
    </Card>
  );
}
