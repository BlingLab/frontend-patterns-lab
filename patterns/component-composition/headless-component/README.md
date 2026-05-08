# Headless Component

## 한 줄 요약

상태, 이벤트, 접근성 규칙은 공통 로직이 제공하고, 실제 마크업과 스타일은 호출부가 결정하게 만드는 패턴입니다.

## 패턴 형태

- 분류: 컴포넌트 조합
- 형태: Behavior Only
- 핵심 질문: 동작은 재사용해야 하지만 UI 표현은 제품이나 화면마다 달라져야 하는가

## 왜 필요한가

많은 UI 로직은 시각적 모양보다 행동 규칙이 더 중요합니다. 토글 버튼은 눌릴 때 상태가 바뀌어야 하고 `aria-pressed`가 맞아야 합니다. 드롭다운은 열림 상태, 바깥 클릭, Escape 키, focus 이동을 처리해야 합니다. Combobox는 입력값, 선택값, active option, 키보드 탐색, ARIA 연결을 관리해야 합니다.

이 로직을 특정 마크업과 스타일에 묶으면 다른 디자인에서 재사용하기 어렵습니다. 반대로 화면마다 직접 구현하면 접근성 속성, 이벤트 순서, cleanup이 빠지기 쉽습니다.

Headless component는 이 둘을 분리합니다. 공통 계층은 상태와 동작, 접근성에 필요한 props를 제공합니다. 호출부는 그 props를 원하는 태그와 스타일에 붙입니다. Radix Primitives나 Headless UI 같은 라이브러리가 이 접근을 자주 사용합니다.

## 언제 사용하는가

- 동작은 같지만 제품, 브랜드, 화면마다 마크업과 스타일이 달라질 때
- 접근성 로직을 한 곳에서 검증하고 재사용하고 싶을 때
- 디자인 시스템이 "스타일 포함 컴포넌트"보다 "동작 primitive"를 제공해야 할 때
- 커스텀 디자인 자유도가 높지만 키보드/ARIA 규칙은 놓치면 안 될 때
- 컴포넌트가 `variant`와 CSS 옵션으로 점점 커지고 있을 때

## 언제 피해야 하는가

- 팀이 매번 마크업과 스타일을 직접 조립할 여력이 없을 때
- 시각적 일관성이 가장 중요한 제품이고 완성형 컴포넌트가 더 적합할 때
- 접근성 규칙을 headless 계층에서 제대로 보장할 수 없을 때
- 호출부가 매번 같은 마크업을 반복하게 되는 경우
- 단순 버튼이나 단순 카드처럼 동작 재사용이 거의 없는 경우

## 어떻게 사용하는가

1. 재사용할 동작과 상태를 훅 또는 headless component로 분리합니다.
2. 호출부가 DOM에 붙여야 하는 props를 getter 함수로 제공합니다.
3. 내부 이벤트와 사용자 이벤트가 함께 실행되는 순서를 정합니다.
4. ARIA 속성, keyboard interaction, focus 규칙은 headless 계층이 기본 제공하게 합니다.
5. 호출부는 태그, 레이아웃, 색상, 텍스트 표현만 결정합니다.

## 기본 코드 형태

```tsx
function useToggle(defaultPressed = false) {
  const [pressed, setPressed] = useState(defaultPressed);

  function getButtonProps(props: React.ButtonHTMLAttributes<HTMLButtonElement> = {}) {
    return {
      ...props,
      'aria-pressed': pressed,
      onClick(event: React.MouseEvent<HTMLButtonElement>) {
        props.onClick?.(event);
        if (!event.defaultPrevented) {
          setPressed((value) => !value);
        }
      },
    };
  }

  return { pressed, getButtonProps };
}

function FavoriteButton() {
  const toggle = useToggle();

  return (
    <button {...toggle.getButtonProps({ className: 'favorite-button' })}>
      {toggle.pressed ? '즐겨찾는 중' : '즐겨찾기'}
    </button>
  );
}
```

## 예제 읽는 법

- `Example.tsx`는 `useToggleButton`이 상태와 `aria-pressed`, 이벤트 합성 규칙을 제공하고 호출부가 버튼 UI를 직접 구성합니다.
- `BadCase.tsx`는 상태와 스타일, 텍스트, 이벤트 정책이 한 컴포넌트에 묶여 있어 다른 디자인으로 재사용하기 어렵습니다.

## 나쁜 예가 나빠지는 과정

완성형 컴포넌트 하나로 시작하면 사용은 쉽습니다.

```tsx
<FavoriteButton />
```

하지만 다른 화면에서 이런 요구가 생깁니다.

- 아이콘 버튼으로 보여야 합니다.
- 텍스트 버튼으로 보여야 합니다.
- 카드 전체를 누르면 토글되어야 합니다.
- `onClick`에서 analytics를 먼저 보내야 합니다.
- 눌림 상태는 같지만 색상과 레이아웃이 다릅니다.

완성형 컴포넌트가 모든 표현 변형을 prop으로 받기 시작하면 `variant`, `size`, `showIcon`, `labelWhenOn`, `labelWhenOff` 같은 API가 늘어납니다. Headless 방식이면 동작은 `useToggleButton`이 제공하고 표현은 호출부가 결정합니다.

## 실무 판단 기준

Headless component는 "로직 재사용 가치"가 "호출부 조립 비용"보다 클 때 적합합니다. 특히 접근성, 키보드 이벤트, focus 관리처럼 한 번만 제대로 구현해두는 이득이 큰 영역에 잘 맞습니다.

반대로 UI가 대부분 동일하고 스타일 옵션만 조금 바뀐다면 완성형 컴포넌트가 더 낫습니다. Headless는 자유도를 주는 대신 호출부가 더 많은 책임을 집니다.

## 코드 리뷰 체크리스트

- headless 계층이 상태, 이벤트, 접근성 props를 빠짐없이 제공하는가?
- 호출부가 내부 상태를 직접 복제하지 않는가?
- 사용자 이벤트와 내부 이벤트의 실행 순서가 명확한가?
- `defaultPrevented` 같은 escape hatch가 필요한지 검토했는가?
- 모든 화면이 같은 마크업을 반복한다면 완성형 컴포넌트로 감싸는 것이 더 낫지 않은가?

## 흔한 실수

- "headless"라고 부르지만 실제로는 className 몇 개만 외부에서 받습니다.
- ARIA와 keyboard interaction을 호출부에 떠넘겨 화면마다 구현 품질이 달라집니다.
- prop getter가 사용자 props를 덮어써서 호출부 이벤트가 사라집니다.
- 작은 토글 하나에도 과한 추상화를 만들어 사용법이 더 어려워집니다.

## 관련 패턴

- [Props Getter](../props-getter/README.md): 호출부에 붙일 DOM props를 안전하게 합성할 때
- [Render Props](../render-props/README.md): 상태를 함수 인자로 넘겨 렌더링을 호출부에 맡길 때
- [Polymorphic Component](../polymorphic-component/README.md): 같은 동작을 다른 HTML element로 렌더링해야 할 때

## 참고 자료

- [Radix UI: Composition](https://www.radix-ui.com/primitives/docs/guides/composition)
- [Radix UI: Slot](https://www.radix-ui.com/primitives/docs/utilities/slot)
- [React: Responding to Events](https://react.dev/learn/responding-to-events)
