# 합성 컴포넌트

영문명: Compound Component
폴더: `component-composition/compound-component`

## 한 줄 요약

서로 협력해야 하는 하위 컴포넌트를 하나의 컴포넌트 패밀리로 묶어, 호출부가 구조를 선언적으로 조합하게 만드는 패턴입니다.

## 패턴 형태

- 분류: 컴포넌트 조합
- 형태: Component Family
- 핵심 질문: 상태와 접근성 연결은 내부에서 관리하되, 화면 구조는 호출부가 조합할 수 있어야 하는가

## 왜 필요한가

Tabs, Accordion, Select, Menu처럼 여러 하위 요소가 함께 동작하는 UI가 있습니다. 예를 들어 Tabs는 root, tab list, trigger, panel이 서로 같은 `selectedValue`를 공유해야 합니다. trigger는 선택 상태를 바꿔야 하고, panel은 자신의 value가 선택되었는지 알아야 하며, 접근성 측면에서는 `tab`, `tabpanel`, `aria-selected`, `aria-controls` 같은 관계도 맞아야 합니다.

이 연결을 호출부 props로 모두 넘기게 만들면 사용자는 매번 상태, id, 이벤트 핸들러, 조건부 렌더링을 직접 맞춰야 합니다. 반대로 `tabs={[...]}` 같은 데이터 prop 하나로 전부 숨기면 구조를 바꾸기 어렵습니다. badge를 넣거나 특정 tab 옆에 액션 버튼을 붙이거나 panel 안에 복잡한 JSX를 넣는 요구가 생길 때 컴포넌트 내부를 계속 수정해야 합니다.

Compound component는 이 둘 사이의 균형입니다. Root가 상태와 context를 제공하고, Trigger와 Panel은 그 context를 읽어 협력합니다. 호출부는 `<Tabs.Trigger>`와 `<Tabs.Panel>`을 원하는 구조로 배치하면서도 상태 연결을 직접 구현하지 않습니다.

## 언제 사용하는가

- Tabs, Accordion, Dropdown Menu, Select처럼 여러 하위 컴포넌트가 같은 상태를 공유할 때
- 호출부에서 하위 요소의 배치와 마크업을 조합할 자유가 필요할 때
- 상태 연결, id 연결, 접근성 속성은 라이브러리/공통 컴포넌트가 책임져야 할 때
- 단일 컴포넌트에 `items`, `renderItem`, `showBadge`, `actionSlot` 같은 옵션이 계속 늘어날 때
- 디자인 시스템에서 "하나의 기능"을 여러 하위 컴포넌트 API로 제공하고 싶을 때

## 언제 피해야 하는가

- 하위 컴포넌트 간 공유 상태가 없고 단순 children composition으로 충분할 때
- 호출부가 구조를 조합할 필요 없이 데이터 배열만 넘기면 되는 단순 목록일 때
- Context value가 자주 바뀌고 소비 범위가 넓어 성능 문제가 예상될 때
- 하위 컴포넌트 조합 규칙이 너무 복잡해서 사용자가 올바른 구조를 만들기 어려울 때
- 접근성 구현을 충분히 검증하지 못한 상태에서 복잡한 상호작용 컴포넌트를 직접 만들 때

## 어떻게 사용하는가

1. Root 컴포넌트가 공유 상태와 변경 함수를 소유합니다.
2. Root 내부에 context provider를 둡니다.
3. Trigger, Panel 같은 하위 컴포넌트는 context를 읽어 자신의 상태를 계산합니다.
4. 하위 컴포넌트는 필요한 ARIA 속성과 이벤트 핸들러를 내부에서 제공합니다.
5. 사용자가 잘못된 위치에서 하위 컴포넌트를 쓰면 명확한 에러를 던지는 custom hook을 둡니다.

## 기본 코드 형태

```tsx
const TabsContext = createContext<TabsContextValue | null>(null);

function TabsRoot({ defaultValue, children }: TabsRootProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  );
}

function TabsTrigger({ value, children }: TabsTriggerProps) {
  const tabs = useTabsContext();
  const selected = tabs.value === value;

  return (
    <button role="tab" aria-selected={selected} onClick={() => tabs.setValue(value)}>
      {children}
    </button>
  );
}

function TabsPanel({ value, children }: TabsPanelProps) {
  const tabs = useTabsContext();
  if (tabs.value !== value) return null;

  return <div role="tabpanel">{children}</div>;
}
```

호출부는 이렇게 사용합니다.

```tsx
<Tabs.Root defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">요약</Tabs.Trigger>
    <Tabs.Trigger value="billing">결제</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="overview">요약 콘텐츠</Tabs.Panel>
  <Tabs.Panel value="billing">결제 콘텐츠</Tabs.Panel>
</Tabs.Root>
```

## 예제 읽는 법

- `Example.tsx`는 `Tabs.Root`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Panel`이 context로 협력하는 구조입니다.
- `BadCase.tsx`는 모든 tab 구조를 `items` 배열과 `render` 분기로 밀어 넣습니다. 간단한 화면에는 빠르지만, tab마다 다른 액션이나 복잡한 마크업이 필요해질수록 props 모델이 커집니다.

## 나쁜 예가 나빠지는 과정

처음에는 아래 API가 단순해 보입니다.

```tsx
<SettingsTabs
  tabs={[
    { value: 'profile', label: '프로필', content: <ProfilePanel /> },
    { value: 'billing', label: '결제', content: <BillingPanel /> },
  ]}
/>
```

하지만 요구사항이 늘면 `tabs` 항목에 계속 옵션이 붙습니다.

- 특정 tab에 badge를 붙여야 합니다.
- 특정 tab은 disabled 처리해야 합니다.
- tab list 오른쪽에 저장 버튼을 넣어야 합니다.
- panel마다 로딩, 빈 상태, 에러 UI가 다릅니다.
- trigger 내부에 아이콘, 보조 텍스트, 카운터가 필요합니다.

이때 compound component는 상태 연결은 유지하면서 JSX 구조는 호출부가 직접 조합하게 해줍니다.

## 실무 판단 기준

다음 조건이 동시에 보이면 compound component를 검토합니다.

- 하위 컴포넌트들이 같은 상태나 id 체계를 공유합니다.
- 호출부가 하위 구조를 조합할 자유가 필요합니다.
- 상태와 접근성 연결을 매번 호출부에서 구현하면 실수가 잦습니다.
- 단일 props object나 `items` 배열이 점점 UI DSL처럼 커지고 있습니다.

반대로 단순한 목록, 카드 묶음, 정적인 레이아웃이면 children composition이나 slot pattern이 더 가볍습니다.

## 코드 리뷰 체크리스트

- Root 없이 하위 컴포넌트를 사용했을 때 명확한 오류가 나는가?
- Trigger와 Panel의 value 연결이 타입과 런타임에서 추적 가능한가?
- 접근성 role과 ARIA 속성이 내부에서 일관되게 제공되는가?
- Context value가 매 렌더마다 불필요하게 새 객체가 되어 넓은 리렌더를 만들지 않는가?
- compound API가 실제 조합 자유도를 주는가, 아니면 이름만 여러 컴포넌트로 쪼갠 것인가?

## 흔한 실수

- 하위 컴포넌트를 많이 만들었지만 실제로는 모두 Root의 props만 전달합니다.
- Context에 모든 상태를 넣어 작은 변경에도 모든 하위 컴포넌트가 렌더됩니다.
- Trigger와 Panel 연결 규칙을 문서화하지 않아 호출부가 value를 틀리게 씁니다.
- 접근성 구현 없이 시각적 tab만 구현합니다.
- compound component가 필요 없는 단순 UI까지 과하게 패턴화합니다.

## 관련 패턴

- [Provider Pattern](../provider-pattern/README.md): context provider 자체의 책임과 사용 범위를 다룰 때
- [Headless Component](../headless-component/README.md): 상태와 동작만 제공하고 마크업은 완전히 호출부에 맡길 때
- [Slot Pattern](../slot-pattern/README.md): 공유 상태보다는 명명된 영역 주입이 핵심일 때

## 참고 자료

- [React: createContext](https://react.dev/reference/react/createContext)
- [React: useContext](https://react.dev/reference/react/useContext)
- [WAI-ARIA APG: Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
