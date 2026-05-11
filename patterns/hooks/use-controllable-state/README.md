# 제어 가능 상태 훅

영문명: useControllableState
폴더: `hooks/use-controllable-state`

## 한 줄 요약

controlled/uncontrolled 상태 소유권 분기를 훅 하나로 표준화합니다.

## 패턴 형태

- 분류: 훅과 로직 재사용
- 형태: Custom Hook / Hook Composition
- 핵심 질문: 반복되는 동작 로직을 어떤 API로 캡슐화할 것인가

## 왜 필요한가

컴포넌트 라이브러리를 만들 때 controlled/uncontrolled를 각 컴포넌트마다 if문으로 처리하면 중복이 많고 실수가 생깁니다. useControllableState 하나로 이 분기를 중앙화하면 일관성이 보장됩니다.

React 공식 문서는 custom hook을 상태ful 로직을 컴포넌트 밖으로 추출하는 방법으로 설명합니다. 훅의 목적은 파일을 쪼개는 것이 아니라, 구독, 타이머, 비동기 상태, 폼 로직처럼 반복되는 생명주기 규칙을 한 API로 고정하는 것입니다.

## 핵심 원리

- value prop 유무로 자동으로 controlled/uncontrolled를 판단한다
- onChange는 항상 일관되게 호출된다
- Radix UI, Ark UI 등 컴포넌트 라이브러리가 이 패턴을 사용한다

## 언제 사용하는가

- 입력, 팝오버, 탭처럼 외부 제어와 내부 상태를 모두 지원할 때
- 디자인 시스템에서 같은 규칙을 반복할 때
- onChange 호출 순서를 통일하고 싶을 때

## 언제 피해야 하는가

- 런타임 중 controlled 여부가 바뀌어야 하는 요구
- 단순 내부 state만 필요한 컴포넌트

## 어떻게 사용하는가

1. value 존재 여부로 controlled를 판정한다
2. 내부 state는 uncontrolled일 때만 갱신한다
3. 변경 이벤트는 항상 onChange로 알린다

## 기본 코드 형태

```tsx
function useControllableState<T>({ value, defaultValue, onChange }: Options<T>) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  function setValue(next: T) {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }

  return [currentValue, setValue] as const;
}
```

## 실무 판단 기준

- 컴포넌트가 JSX보다 상태 전이와 effect cleanup으로 더 읽히기 어려워질 때 훅을 추출합니다.
- 훅은 UI를 반환하기보다 상태, 파생 값, 이벤트 핸들러, props getter처럼 호출부가 조합할 수 있는 값을 반환합니다.
- DOM 이벤트나 외부 구독을 다루는 훅은 cleanup과 stable callback 문제를 API 안에서 해결해야 합니다.
- 한 번만 쓰이고 정책이 아직 변하는 로직은 섣불리 공통 훅으로 만들지 않습니다.

## 코드 리뷰 체크리스트

- 훅 이름이 어떤 도메인 동작을 제공하는지 드러나는가?
- 반환 값이 너무 많아 호출부가 내부 구현을 다시 조립해야 하는 상태는 아닌가?
- effect 의존성과 cleanup이 훅 내부에서 일관되게 처리되는가?
- 테스트할 수 있는 순수 계산과 React 생명주기 의존 로직이 분리되어 있는가?

## 흔한 실수

- 중복 한 줄을 없애려고 훅을 만들고, 실제 정책은 호출부마다 다시 분기합니다.
- callback identity를 고려하지 않아 event listener cleanup이 실패합니다.
- 비동기 완료 후 unmount된 컴포넌트에 state update를 시도합니다.

## 테스트와 검증 포인트

- StrictMode에서 mount/unmount가 반복되어도 구독과 타이머가 중복되지 않는지 확인합니다.
- 훅을 두 컴포넌트에서 동시에 호출해도 상태가 공유되지 않는지 확인합니다.
- 입력 값이 빠르게 바뀌는 debounce/throttle 계열은 마지막 값, leading/trailing 동작, cleanup을 함께 봅니다.

## 예제 읽는 법

- `BadCase.tsx`에서 책임이 어디에 섞여 있는지 먼저 봅니다.
- `Example.tsx`에서 호출부 API, 상태 소유권, 변경 범위가 어떻게 줄었는지 비교합니다.
- 문서의 체크리스트를 기준으로 같은 패턴을 실제 코드 리뷰에 적용할 수 있는지 확인합니다.

## 관련 패턴

- [Controlled Uncontrolled](../../component-composition/controlled-uncontrolled/README.md)
- [Controlled Form](../../forms/controlled-form/README.md)

## 참고 자료

- [React: Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [React: useEffect](https://react.dev/reference/react/useEffect)
