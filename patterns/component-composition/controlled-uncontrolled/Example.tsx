import { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { useControllableState } from './useControllableState';

type ToggleSwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

function ToggleSwitch({ checked, defaultChecked = false, onCheckedChange }: ToggleSwitchProps) {
  const [isChecked, setChecked] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  return (
    <button className="button" aria-pressed={isChecked} onClick={() => setChecked(!isChecked)}>
      {isChecked ? '켜짐' : '꺼짐'}
    </button>
  );
}

export default function ControlledUncontrolledExample() {
  const [emailEnabled, setEmailEnabled] = useState(true);

  return (
    <Card title="제어/비제어 컴포넌트" eyebrow="컴포넌트 조합 / 좋은 예">
      <p>같은 Switch가 내부 상태 사용과 외부 상태 제어를 모두 지원합니다.</p>
      <div className="example-surface">
        <div>
          <strong>Uncontrolled</strong>
          <span>초기값만 넘기고 이후 상태는 Switch 내부가 관리합니다.</span>
          <ToggleSwitch defaultChecked />
        </div>
        <div>
          <strong>Controlled</strong>
          <span>부모가 checked 값을 소유하고 onCheckedChange로 갱신합니다.</span>
          <ToggleSwitch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
        </div>
      </div>
    </Card>
  );
}
