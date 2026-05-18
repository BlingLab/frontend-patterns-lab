# 인라인 객체 props

영문명: Inline Object Props
폴더: `anti-patterns/inline-object-props`

## 한 줄 요약

매 렌더마다 새 객체 prop을 내려 memoization을 깨는 문제를 피합니다.

## 패턴 형태

- 분류: 안티패턴
- 형태: 문제 징후 / 리팩터링 가이드
- 핵심 질문: 지금 보이는 코드 냄새가 실제 버그와 변경 비용으로 이어지는가

## 왜 필요한가

<Child style={{ color: "red" }} />는 매 렌더마다 새 객체가 만들어집니다. Child가 React.memo로 감싸져 있어도 style prop이 항상 바뀌어 memo가 무효화됩니다. 객체는 컴포넌트 밖에 상수로 꺼내거나 useMemo를 써야 합니다.

안티패턴은 금지 목록이 아니라 리팩터링 신호입니다. React 공식 문서의 상태 구조 원칙, effect 사용 기준, key/state 보존 규칙을 기준으로 “왜 처음에는 편해 보였고, 어떤 변경에서 깨지는지”까지 설명해야 팀 리뷰에서 설득력이 생깁니다.

## 핵심 원리

- 객체, 배열, 함수 리터럴은 렌더마다 새 참조가 된다
- memo된 자식이나 effect deps에 넘길 때 참조 안정성이 중요하다
- 상수로 뺄 수 있으면 컴포넌트 밖으로, props/state에 의존하면 useMemo로 둔다

## 언제 사용하는가

- memo child에 객체/배열 prop을 넘길 때
- effect dependency에 inline object가 들어갈 때
- 테이블 columns/options가 매 렌더 재생성될 때

## 언제 피해야 하는가

- memoization이 필요 없는 cheap child
- 객체가 매번 달라져야 하는 명확한 이유가 있을 때

## 어떻게 사용하는가

1. 객체 생성을 컴포넌트 밖으로 옮긴다
2. props/state에 의존하면 useMemo를 검토한다
3. child API를 primitive 중심으로 단순화한다

## 기본 코드 형태

```tsx
const CARD_STYLE = { borderColor: '#d1d5db' };

function ProductCard() {
  return <MemoizedPanel style={CARD_STYLE} />;
}
```

## 실무 판단 기준

- 인라인 객체 자체가 항상 문제는 아닙니다. 문제는 참조 비교가 중요한 경계에 매번 새 객체를 넘기는 것입니다.
- `React.memo`, `useEffect` deps, table columns/options, context value는 참조 안정성이 실제 동작에 영향을 줍니다.
- 값이 props/state에 의존하지 않으면 컴포넌트 밖 상수로 빼는 것이 `useMemo`보다 단순합니다.
- 객체 prop을 없애고 `variant`, `size`, `disabled` 같은 primitive prop으로 API를 바꿀 수 있는지도 검토합니다.

## 코드 리뷰 체크리스트

- memo된 자식에 `style={{...}}`, `options={[...]}`, `columns={[...]}`를 바로 넘기고 있지 않은가?
- effect deps에 객체 리터럴이 들어가 effect가 매 렌더 다시 실행되지 않는가?
- context provider의 `value={{ state, actions }}`가 매 렌더 새 객체가 되어 소비자를 모두 리렌더하지 않는가?
- 객체를 안정화하는 대신 child API를 더 단순하게 만들 수 없는가?

## 흔한 실수

- `React.memo`를 추가했지만 부모가 매번 새 object prop을 내려 memo가 무효화됩니다.
- `useMemo` deps에 매번 새로 만들어지는 객체를 넣어 캐시가 항상 깨집니다.
- 정적인 style 객체도 컴포넌트 안에서 만들어 불필요한 리렌더 원인이 됩니다.
- 문제를 숨기려고 child 안에서 deep compare를 추가해 비용과 복잡도를 키웁니다.

## 테스트와 검증 포인트

- 부모의 unrelated state를 바꿨을 때 memo된 자식 렌더 횟수가 늘어나는지 확인합니다.
- effect가 실제 의존 값 변경 없이 반복 실행되는지 로그나 render tracking으로 봅니다.
- 상수 추출 또는 `useMemo` 적용 후 같은 조작에서 렌더 횟수가 줄어드는지 확인합니다.
- memo가 필요 없는 작은 컴포넌트라면 객체 안정화 자체를 하지 않는 선택도 기록합니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 부모 state만 바뀌어도 객체 prop 때문에 자식이 다시 렌더되는 흐름을 봅니다.
- `ImprovedCase.tsx`에서는 정적 객체를 컴포넌트 밖으로 빼거나 의존 값이 있는 객체만 `useMemo`로 감싼 기준을 확인합니다.
- 실제 리뷰에서는 객체를 안정화할지, child API를 primitive prop으로 바꿀지 함께 판단합니다.

## 관련 패턴

- [Memoization Boundary](../../performance-rendering/memoization-boundary/README.md)
- [useMemo / useCallback](../../performance-rendering/usememo-usecallback/README.md)

## 참고 자료

- [React: memo](https://react.dev/reference/react/memo)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
