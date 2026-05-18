# 메모이제이션 남용

영문명: Overuse Memoization
폴더: `anti-patterns/overuse-memoization`

## 한 줄 요약

측정 없이 memo/useMemo/useCallback을 남발하는 문제를 피합니다.

## 패턴 형태

- 분류: 안티패턴
- 형태: 문제 징후 / 리팩터링 가이드
- 핵심 질문: 지금 보이는 코드 냄새가 실제 버그와 변경 비용으로 이어지는가

## 왜 필요한가

모든 함수에 useCallback, 모든 값에 useMemo를 쓰면 코드가 복잡해지고 오히려 deps 비교 비용이 생깁니다. React 컴파일러가 없는 환경에서도 "필요한 곳에만 정확히"가 원칙입니다.

안티패턴은 금지 목록이 아니라 리팩터링 신호입니다. React 공식 문서의 상태 구조 원칙, effect 사용 기준, key/state 보존 규칙을 기준으로 “왜 처음에는 편해 보였고, 어떤 변경에서 깨지는지”까지 설명해야 팀 리뷰에서 설득력이 생깁니다.

## 핵심 원리

- 단순 원시값, 짧은 계산에는 useMemo가 불필요하다
- useCallback은 memo된 자식에 넘기는 함수에만 쓴다
- memo는 실제 렌더 비용이 클 때 의미있다

## 언제 사용하는가

- Profiler로 병목이 확인되지 않은 memo
- cheap calculation을 캐시하는 코드
- dependency를 맞추기 위해 로직이 꼬인 경우

## 언제 피해야 하는가

- 느린 하위 트리에 안정 props를 넘기는 경우
- 비싼 계산 결과를 반복 사용하는 경우

## 어떻게 사용하는가

1. 먼저 측정한다
2. 구조 분리로 해결 가능한지 본다
3. 필요한 경계에만 memoization을 둔다

## 기본 코드 형태

```tsx
const visibleItems = items.filter((item) => item.name.includes(query));

// 실제 병목이 확인된 뒤에만:
const visibleItems = useMemo(() => expensiveFilter(items, query), [items, query]);
```

## 실무 판단 기준

- memoization은 설계 도구가 아니라 비용 절감 도구입니다. 먼저 React DevTools Profiler나 간단한 측정으로 병목을 확인합니다.
- 값 계산이 싼데 `useMemo` deps가 복잡하다면 제거하는 편이 낫습니다.
- `useCallback`은 memo된 자식, effect deps, context value처럼 참조 안정성이 실제로 필요한 경계에서만 둡니다.
- 성능 문제가 상위 state 위치 때문에 생긴다면 memo보다 state colocation이나 component splitting이 먼저입니다.

## 코드 리뷰 체크리스트

- `useMemo` 안의 계산이 실제로 비싼가, 아니면 단순 filter/map인가?
- `useCallback`으로 감싼 함수가 memo된 자식이나 effect deps에 쓰이는가?
- deps 배열을 맞추기 위해 로직이 더 복잡해졌는가?
- memo를 추가하기 전에 렌더 범위를 줄일 수 있는 구조 변경을 검토했는가?

## 흔한 실수

- 모든 이벤트 핸들러를 습관적으로 `useCallback`으로 감쌉니다.
- 원시값 조합이나 짧은 배열 연산까지 `useMemo`로 감쌉니다.
- memo된 자식에 인라인 객체를 넘겨 놓고 `React.memo`만 추가합니다.
- stale closure를 피하려고 deps를 줄이는 대신 callback 안의 로직을 숨깁니다.

## 테스트와 검증 포인트

- memo 제거 전후로 실제 렌더 횟수나 interaction 시간이 의미 있게 달라지는지 확인합니다.
- deps 변경 후 오래된 값이 남는 stale closure가 없는지 이벤트를 반복 실행해 봅니다.
- memo를 없애도 사용자 입력, 필터, 제출 흐름이 동일하게 동작하는지 확인합니다.
- 병목이 남아 있으면 memo 대신 state 위치, 리스트 가상화, 코드 스플리팅을 다시 검토합니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 memoization이 어떤 실제 비용을 줄이는지 설명하지 못하는 지점을 찾습니다.
- `ImprovedCase.tsx`에서는 불필요한 memo를 제거했을 때 코드의 데이터 흐름이 더 직접적으로 읽히는지 확인합니다.
- 최적화가 필요한 예외 케이스는 `performance-rendering/usememo-usecallback` 문서의 기준과 함께 봅니다.

## 관련 패턴

- [Memoization Boundary](../../performance-rendering/memoization-boundary/README.md)
- [useMemo / useCallback](../../performance-rendering/usememo-usecallback/README.md)

## 참고 자료

- [React: memo](https://react.dev/reference/react/memo)
- [React: useMemo](https://react.dev/reference/react/useMemo)
- [React: useCallback](https://react.dev/reference/react/useCallback)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
