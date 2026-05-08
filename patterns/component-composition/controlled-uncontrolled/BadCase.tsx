import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

function ConfusedSwitch({ checked }: { checked: boolean }) {
  const [internalChecked, setInternalChecked] = useState(checked);

  return (
    <button
      className="button"
      aria-pressed={internalChecked}
      onClick={() => setInternalChecked((value) => !value)}
    >
      {internalChecked ? '켜짐' : '꺼짐'}
    </button>
  );
}

export default function ControlledUncontrolledBadCase() {
  const [checked, setChecked] = useState(true);

  return (
    <Card title="제어/비제어 컴포넌트" eyebrow="컴포넌트 조합 / 나쁜 예">
      <p>부모 prop을 내부 state의 초기값으로만 사용해 외부 상태와 실제 UI가 어긋날 수 있습니다.</p>
      <div className="example-surface">
        <div>
          <strong>부모 상태</strong>
          <span>{checked ? '켜짐' : '꺼짐'}</span>
          <button className="button" onClick={() => setChecked((value) => !value)}>
            부모 상태 변경
          </button>
        </div>
        <div>
          <strong>자식 UI</strong>
          <ConfusedSwitch checked={checked} />
        </div>
      </div>
    </Card>
  );
}
