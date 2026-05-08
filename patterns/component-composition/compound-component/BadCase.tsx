import { ReactNode, useState } from 'react';
import { Card } from '../../../shared/components/Card';

type SettingsTab = {
  value: string;
  label: string;
  content: ReactNode;
};

function SettingsTabs({ tabs }: { tabs: SettingsTab[] }) {
  const [selectedValue, setSelectedValue] = useState(tabs[0]?.value ?? '');
  const selectedTab = tabs.find((tab) => tab.value === selectedValue);

  return (
    <Card title="Compound Component" eyebrow="컴포넌트 조합 / Bad Case">
      <p>상태 연결은 숨겼지만, 호출부는 tab 내부 구조를 배열 데이터 모델에 맞춰야 합니다.</p>
      <div role="tablist" aria-label="설정 메뉴" style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={tab.value === selectedValue}
            className="button"
            style={{ opacity: tab.value === selectedValue ? 1 : 0.55 }}
            onClick={() => setSelectedValue(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="example-surface">
        <div>
          <strong>{selectedTab?.label}</strong>
          <span>{selectedTab?.content}</span>
        </div>
      </div>
    </Card>
  );
}

export default function CompoundComponentBadCase() {
  return (
    <SettingsTabs
      tabs={[
        { value: 'profile', label: '프로필', content: '이름, 역할, 알림 수신 여부를 관리합니다.' },
        { value: 'billing', label: '결제', content: '청구 이메일과 결제 수단을 관리합니다.' },
      ]}
    />
  );
}
