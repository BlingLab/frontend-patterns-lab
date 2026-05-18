# 불안정한 콜백

영문명: Unstable Callbacks
폴더: `anti-patterns/unstable-callbacks`

## 한 줄 요약

불안정한 콜백 때문에 하위 컴포넌트 렌더가 퍼지는 문제를 피합니다.

## 패턴 형태

- 분류: 안티패턴
- 형태: 문제 징후 / 리팩터링 가이드
- 핵심 질문: 지금 보이는 코드 냄새가 실제 버그와 변경 비용으로 이어지는가

## 왜 필요한가

memo된 자식에 매 렌더마다 새로 만들어진 함수를 prop으로 내리면 memo가 의미없어집니다. useCallback으로 함수 참조를 안정화해야 자식의 불필요한 리렌더를 막을 수 있습니다.

안티패턴은 금지 목록이 아니라 리팩터링 신호입니다. React 공식 문서의 상태 구조 원칙, effect 사용 기준, key/state 보존 규칙을 기준으로 “왜 처음에는 편해 보였고, 어떤 변경에서 깨지는지”까지 설명해야 팀 리뷰에서 설득력이 생깁니다.

## 핵심 원리

- memo된 자식에 넘기는 함수는 useCallback으로 감싼다
- 함수가 매 렌더마다 새로 만들어지면 === 비교에서 false다
- useEffect deps에 넣는 함수도 useCallback이 필요하다

## 언제 사용하는가

- memoized child에 콜백을 넘길 때
- 이벤트 핸들러가 effect dependency로 쓰일 때
- 리스트 항목에 많은 inline callback이 생성될 때

## 언제 피해야 하는가

- 일반 DOM 이벤트처럼 identity가 중요하지 않은 경우
- 하위 렌더 비용이 작아 최적화가 불필요한 경우

## 어떻게 사용하는가

1. 필요한 곳에만 useCallback을 쓴다
2. 콜백이 의존하는 값을 줄인다
3. child 구조 분리나 이벤트 위임을 검토한다

## 기본 코드 형태

```tsx
const handleSelect = useCallback((id: string) => {
  setSelectedId(id);
}, []);

return <MemoizedRow onSelect={handleSelect} />;
```

## 실무 판단 기준

- 콜백 안정화는 memoized child, effect dependency, context value처럼 참조 비교가 실제 동작에 영향을 주는 경계에서만 필요합니다.
- 단순 DOM 이벤트 핸들러나 렌더 비용이 작은 자식에는 `useCallback`을 넣지 않아도 됩니다.
- 콜백 deps가 계속 늘어난다면 콜백을 안정화하기보다 상태 위치를 바꾸거나 이벤트를 더 가까운 컴포넌트로 옮깁니다.
- 리스트 항목마다 inline callback을 만드는 경우, 항목 컴포넌트 내부에서 id를 닫거나 이벤트 위임을 검토합니다.

## 코드 리뷰 체크리스트

- `React.memo`로 감싼 자식에 매 렌더 새 함수 prop을 넘기고 있지 않은가?
- effect deps에 들어가는 함수가 매 렌더 바뀌어 구독이 반복 재설정되지 않는가?
- `useCallback` deps를 줄이려고 필요한 값을 누락해 stale closure를 만들지 않았는가?
- 콜백 안정화보다 자식 분리나 state colocation이 더 단순한 해결책은 아닌가?

## 흔한 실수

- 모든 handler를 무조건 `useCallback`으로 감싸 코드만 복잡하게 만듭니다.
- deps를 비워 참조는 안정화했지만 오래된 state를 읽는 버그를 만듭니다.
- memo된 자식에 함수는 안정화했지만 객체/배열 prop은 여전히 매번 새로 내려 보냅니다.
- 자식 렌더 비용이 작은데 callback 안정화를 위해 더 큰 추상화를 추가합니다.

## 테스트와 검증 포인트

- 부모의 unrelated state를 바꿨을 때 memoized child가 다시 렌더되는지 render count로 확인합니다.
- 콜백이 최신 state를 읽는지 여러 번 선택, 삭제, 재시도를 반복해 봅니다.
- effect 구독 콜백은 dependency 변경 시 이전 구독이 정리되고 새 콜백이 연결되는지 확인합니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 부모 렌더마다 새 콜백이 만들어져 memo된 자식의 렌더가 퍼지는 지점을 봅니다.
- `ImprovedCase.tsx`에서는 필요한 콜백만 `useCallback`으로 안정화하고, deps가 실제로 필요한 값만 포함하는지 확인합니다.
- `overuse-memoization` 문서와 함께 보면서 안정화가 필요한 경계인지 먼저 판단합니다.

## 관련 패턴

- [useMemo / useCallback](../../performance-rendering/usememo-usecallback/README.md)
- [Overuse Memoization](../overuse-memoization/README.md)

## 참고 자료

- [React: useCallback](https://react.dev/reference/react/useCallback)
- [React: memo](https://react.dev/reference/react/memo)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
