import { ReactNode, createContext, useContext, useState } from 'react';
import { Card } from '../../../shared/components/Card';

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used inside Tabs.Root');
  }
  return context;
}

function TabsRoot({ defaultValue, children }: { defaultValue: string; children: ReactNode }) {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ children }: { children: ReactNode }) {
  return (
    <div role="tablist" aria-label="설정 메뉴" style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
      {children}
    </div>
  );
}

function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  const tabs = useTabsContext();
  const selected = tabs.value === value;

  return (
    <button
      role="tab"
      aria-selected={selected}
      className="button"
      style={{ opacity: selected ? 1 : 0.55 }}
      onClick={() => tabs.setValue(value)}
    >
      {children}
    </button>
  );
}

function TabsPanel({ value, children }: { value: string; children: ReactNode }) {
  const tabs = useTabsContext();
  if (tabs.value !== value) return null;

  return (
    <div role="tabpanel" className="example-surface">
      {children}
    </div>
  );
}

const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Panel: TabsPanel,
};

export default function CompoundComponentExample() {
  return (
    <Card title="합성 컴포넌트" eyebrow="컴포넌트 조합 / 좋은 예">
      <p>Root가 선택 상태를 제공하고 Trigger와 Panel이 context를 통해 협력합니다.</p>

      <Tabs.Root defaultValue="profile">
        <Tabs.List>
          <Tabs.Trigger value="profile">프로필</Tabs.Trigger>
          <Tabs.Trigger value="billing">결제</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Panel value="profile">
          <div>
            <strong>프로필 설정</strong>
            <span>이름, 역할, 알림 수신 여부를 관리합니다.</span>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="billing">
          <div>
            <strong>결제 설정</strong>
            <span>청구 이메일과 결제 수단을 관리합니다.</span>
          </div>
        </Tabs.Panel>
      </Tabs.Root>
    </Card>
  );
}
