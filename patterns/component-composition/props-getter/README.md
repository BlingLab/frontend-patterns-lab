# Props Getter

## 한 줄 요약

headless 로직이 DOM에 필요한 props를 `getButtonProps` 같은 함수로 제공하고, 호출부 props와 안전하게 합성하는 패턴입니다.

## 패턴 형태

- 분류: 컴포넌트 조합
- 형태: Prop Composition
- 핵심 질문: 접근성 속성, 이벤트 핸들러, ref를 호출부가 직접 합치다가 누락하거나 덮어쓰고 있지 않은가

## 왜 필요한가

Headless hook은 보통 상태만으로 충분하지 않습니다. DOM에 붙여야 하는 `aria-*`, `role`, `tabIndex`, `onClick`, `onKeyDown`, `ref` 같은 props도 함께 필요합니다. 호출부가 이 props를 직접 조립하면 내부 이벤트와 사용자 이벤트 중 하나가 덮어써지거나, 접근성 속성이 빠질 수 있습니다.

Props getter는 호출부가 자신의 props를 인자로 넘기면 내부 props와 합성한 결과를 돌려줍니다. 내부 이벤트는 사용자 이벤트를 먼저 실행할지, 나중에 실행할지, `event.defaultPrevented`를 존중할지 같은 정책을 한 곳에서 정할 수 있습니다.

## 언제 사용하는가

- headless hook이 DOM props를 제공해야 할 때
- 사용자 이벤트와 내부 이벤트를 함께 실행해야 할 때
- ARIA 속성, role, tabIndex를 누락 없이 붙이고 싶을 때
- 호출부가 className, onClick 같은 props를 추가할 수 있어야 할 때
- 같은 로직을 button, trigger, input 같은 DOM 요소에 반복해서 붙일 때

## 언제 피해야 하는가

- 단순히 `onClick` 하나만 넘기면 충분한 경우
- getter가 반환하는 props가 너무 많아 호출부가 무엇을 붙이는지 알기 어려울 때
- 여러 element 타입을 지원해야 해서 타입이 지나치게 복잡해질 때
- 호출부가 반드시 특정 마크업을 써야 한다면 완성형 컴포넌트가 더 적절할 때

## 어떻게 사용하는가

1. 내부에서 필요한 DOM props를 정의합니다.
2. getter 함수가 사용자 props를 인자로 받습니다.
3. 사용자 props와 내부 props를 병합합니다.
4. 이벤트 핸들러는 실행 순서와 `defaultPrevented` 정책을 정합니다.
5. 반환 props를 호출부가 spread로 붙입니다.

## 기본 코드 형태

```tsx
const { on, getToggleProps } = useToggle();

<button
  {...getToggleProps({
    className: 'favorite-button',
    onClick: () => track('favorite_clicked'),
  })}
>
  {on ? '해제' : '추가'}
</button>
```

## 예제 읽는 법

- `Example.tsx`는 `useToggle`의 `getToggleProps`가 `aria-pressed`와 내부 toggle 이벤트를 제공하면서 호출부의 `onClick`도 보존합니다.
- `BadCase.tsx`는 호출부가 `aria-pressed`와 상태 변경 이벤트를 직접 붙입니다. 여러 화면에서 반복하면 누락과 불일치가 생깁니다.

## 실무 판단 기준

Props getter는 "호출부에 자유를 주되, 필수 props는 빠지지 않게" 만드는 장치입니다. 단순 wrapper props와 다르게 이벤트 합성 정책이 핵심입니다. 사용자가 넘긴 `onClick`을 내부 `onClick`이 덮어쓰면 props getter의 의미가 없습니다.

## 코드 리뷰 체크리스트

- 사용자 이벤트가 내부 이벤트에 의해 덮어써지지 않는가?
- `defaultPrevented`를 존중해야 하는 이벤트인지 결정했는가?
- 접근성 props가 getter를 통해 일관되게 제공되는가?
- 호출부가 getter 반환값을 spread하지 않으면 문제가 되는지 문서화했는가?
- getter가 너무 많은 책임을 숨겨 디버깅이 어려운 상태는 아닌가?

## 흔한 실수

- `{ ...internalProps, ...userProps }` 순서 때문에 내부 이벤트가 사라집니다.
- 사용자 이벤트를 실행하지 않고 내부 이벤트만 실행합니다.
- `aria-*` 값이 상태와 동기화되지 않습니다.
- getter 이름은 있지만 사실상 단순 props object를 반환합니다.

## 관련 패턴

- [Headless Component](../headless-component/README.md): 동작과 표현을 분리할 때
- [Render Props](../render-props/README.md): getter를 render 함수 인자로 넘길 때
- [Polymorphic Component](../polymorphic-component/README.md): 다양한 element에 props를 합성할 때

## 참고 자료

- [React: Responding to Events](https://react.dev/learn/responding-to-events)
- [Radix UI: Composition](https://www.radix-ui.com/primitives/docs/guides/composition)
