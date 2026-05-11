# 렌더 프롭스

영문명: Render Props
폴더: `component-composition/render-props`

## 한 줄 요약

컴포넌트가 상태와 동작을 계산하고, 렌더링은 함수 prop 또는 함수형 `children`을 통해 호출부가 결정하게 만드는 패턴입니다.

## 패턴 형태

- 분류: 컴포넌트 조합
- 형태: Function as Child
- 핵심 질문: 로직은 재사용해야 하지만 렌더링 구조는 호출부마다 크게 달라져야 하는가

## 왜 필요한가

React의 render props 문서는 "무엇을 렌더링할지 알려주는 함수 prop"을 사용해 컴포넌트 간 코드를 공유하는 방법을 설명합니다. hooks가 일반화된 이후 render props의 사용 빈도는 줄었지만, 여전히 "상태와 렌더링을 강하게 분리해야 하는 컴포넌트 API"에서는 유효합니다.

예를 들어 mouse position, selection state, permission state, async state처럼 로직은 재사용하고 싶지만 화면은 호출부마다 완전히 다를 수 있습니다. 하나의 컴포넌트 안에 모든 UI 변형을 prop으로 넣으면 API가 커집니다. 반대로 상태 로직을 호출부마다 직접 구현하면 중복이 생깁니다.

Render props는 로직 컴포넌트가 현재 상태와 명령을 함수 인자로 넘기고, 호출부 함수가 그 값을 받아 원하는 JSX를 반환하게 합니다.

## 핵심 원리

- children을 함수로 받아 (state) => JSX 형태로 쓴다
- 상태를 JSX 트리 안에서 직접 소비할 수 있다
- hooks 이전에 로직 재사용의 주요 패턴이었고 지금도 특정 상황에 적합하다

## 언제 사용하는가

- 로직은 같지만 렌더링 구조가 화면마다 크게 다를 때
- 함수형 `children`으로 현재 상태를 명시적으로 받고 싶을 때
- hooks로 분리하기 어렵거나 컴포넌트 API 형태로 제공해야 할 때
- legacy class component와도 로직을 공유해야 할 때
- Provider를 쓰기에는 범위가 좁고, 단순 children으로는 상태를 전달할 수 없을 때

## 언제 피해야 하는가

- 정적인 콘텐츠를 넘기기만 하면 되는 경우
- custom hook으로 더 단순하게 표현할 수 있는 경우
- render prop 중첩이 깊어져 JSX가 오른쪽으로 밀릴 때
- 매 렌더마다 새 함수가 전달되어 memoization 경계를 깨는 것이 문제일 때
- 호출부가 상태를 조합할 필요 없이 완성형 UI만 쓰면 되는 경우

## 어떻게 사용하는가

1. 재사용할 상태와 명령을 컴포넌트 내부에서 계산합니다.
2. `children` 또는 `render` prop을 함수 타입으로 정의합니다.
3. 함수 인자로 노출할 값의 이름과 타입을 명확히 합니다.
4. 호출부는 전달받은 상태와 명령으로 원하는 JSX를 반환합니다.
5. 중첩이 깊어지면 custom hook이나 compound component로 바꿀 수 있는지 검토합니다.

## 기본 코드 형태

```tsx
type ToggleRenderProps = {
  on: boolean;
  toggle: () => void;
};

function Toggle({ children }: { children: (props: ToggleRenderProps) => React.ReactNode }) {
  const [on, setOn] = useState(false);
  return <>{children({ on, toggle: () => setOn((value) => !value) })}</>;
}

<Toggle>
  {({ on, toggle }) => (
    <button onClick={toggle}>{on ? '켜짐' : '꺼짐'}</button>
  )}
</Toggle>
```

## 예제 읽는 법

- `Example.tsx`는 `ToggleState`가 상태와 `toggle` 명령을 제공하고, 호출부가 카드형 UI와 버튼형 UI를 원하는 대로 렌더링합니다.
- `BadCase.tsx`는 같은 토글 로직을 서로 다른 UI 컴포넌트가 각자 복사합니다. UI가 다르다는 이유로 상태 로직까지 중복됩니다.

## 나쁜 예가 나빠지는 과정

처음에는 토글 UI가 하나뿐이라 컴포넌트 내부에 상태를 넣어도 괜찮습니다.

```tsx
function FavoriteButton() {
  const [on, setOn] = useState(false);
  return <button onClick={() => setOn(!on)}>{on ? 'On' : 'Off'}</button>;
}
```

하지만 같은 토글 상태를 카드, 메뉴 아이템, 테이블 행, 아이콘 버튼에서 모두 쓰게 되면 각 컴포넌트가 같은 로직을 반복합니다. 이때 render props를 쓰면 상태 로직은 한 곳에 두고 UI는 호출부가 바꿀 수 있습니다.

## 실무 판단 기준

새 코드에서는 custom hook이 더 간단한 경우가 많습니다. render props는 "컴포넌트로 감싼 범위 안에서만 상태를 제공하고 싶다"거나 "함수형 children API가 호출부에서 더 읽기 좋다"는 이유가 있을 때 선택합니다.

특히 라이브러리나 공통 컴포넌트에서 children 함수를 통해 로직을 노출하면 호출부가 상태 이름과 명령을 명시적으로 받기 때문에 의도가 잘 보입니다. 다만 중첩 render prop이 두 단계 이상 생기면 가독성이 빠르게 나빠집니다.

## 코드 리뷰 체크리스트

- render 함수 인자의 이름과 타입이 도메인 의미를 드러내는가?
- 호출부가 렌더링만 결정하고 상태 로직은 중복하지 않는가?
- render prop 중첩이 깊어져 읽기 어려워지지 않았는가?
- custom hook으로 더 단순하게 표현할 수 있는 상황은 아닌가?
- 함수가 매 렌더 새로 만들어지는 것이 성능 경계에 영향을 주지 않는가?

## 흔한 실수

- 단순 children으로 충분한데 render prop을 사용합니다.
- render prop 안에서 또 다른 render prop을 중첩해 JSX가 읽기 어려워집니다.
- render 함수 인자로 너무 많은 값을 넘겨 숨겨진 store처럼 만듭니다.
- 상태 로직 일부는 render prop 컴포넌트에, 일부는 호출부에 흩어집니다.

## 테스트와 검증 포인트

- render 함수가 받는 값의 이름과 타입이 호출부에서 명확한지 확인합니다.
- 불필요한 중첩 함수로 JSX 가독성이 떨어지지 않는지 봅니다.
- 같은 로직이 custom hook으로 더 단순해지는지 비교합니다.

## 관련 패턴

- [Headless Component](../headless-component/README.md): 훅이나 prop getter로 동작을 제공할 때
- [Props Getter](../props-getter/README.md): 렌더 함수에 DOM props 합성 함수를 넘길 때
- [Custom Hook Boundary](../../hooks/custom-hook-boundary/README.md): 같은 로직을 hook으로 분리하는 편이 더 단순할 때

## 참고 자료

- [React Legacy Docs: Render Props](https://legacy.reactjs.org/docs/render-props.html)
- [React: Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
