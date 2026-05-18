# 파생 상태를 effect로 만들기

영문명: useEffect For Derived State
폴더: `anti-patterns/use-effect-for-derived-state`

## 한 줄 요약

계산 가능한 값을 effect와 state로 중복 저장하는 문제를 피합니다.

## 패턴 형태

- 분류: 안티패턴
- 형태: 문제 징후 / 리팩터링 가이드
- 핵심 질문: 지금 보이는 코드 냄새가 실제 버그와 변경 비용으로 이어지는가

## 왜 필요한가

items 배열에서 계산되는 filteredItems를 state로 저장하면, items가 바뀔 때 동기화하는 useEffect가 필요합니다. 이 effect는 한 렌더 뒤에 실행되어 flickering을 유발하고 동기화 버그의 온상이 됩니다.

안티패턴은 금지 목록이 아니라 리팩터링 신호입니다. React 공식 문서의 상태 구조 원칙, effect 사용 기준, key/state 보존 규칙을 기준으로 “왜 처음에는 편해 보였고, 어떤 변경에서 깨지는지”까지 설명해야 팀 리뷰에서 설득력이 생깁니다.

## 핵심 원리

- 렌더 중 계산 가능한 값은 state로 저장하지 않는다
- useMemo로 충분하고, 렌더 중 동기적으로 계산된다
- 불필요한 effect가 보이면 derived state 안티패턴을 의심한다

## 언제 사용하는가

- 필터 결과, 총합, fullName처럼 원본에서 계산 가능한 값
- effect가 setState만 호출하는 코드
- 렌더 중 계산해도 충분한 값

## 언제 피해야 하는가

- 외부 시스템과 동기화하는 effect
- 사용자 입력으로 독립 변경되는 state

## 어떻게 사용하는가

1. 파생 state를 제거한다
2. 렌더 중 계산하거나 필요 시 useMemo를 쓴다
3. 원본 state의 단일 출처를 유지한다

## 기본 코드 형태

```tsx
const visibleItems = items.filter((item) => item.name.includes(query));
```

## 실무 판단 기준

- 값이 props나 state에서 순수하게 계산된다면 저장하지 않고 렌더 중 계산합니다.
- effect가 외부 시스템 동기화 없이 `setState`만 호출한다면 파생 상태 여부를 의심합니다.
- 계산이 비싸면 먼저 렌더 중 계산으로 단일 출처를 만든 뒤 `useMemo`로 비용만 줄입니다.
- 사용자가 직접 편집하는 draft처럼 원본과 독립적으로 변할 수 있는 값은 파생 상태가 아닙니다.

## 코드 리뷰 체크리스트

- effect 안에서 setState만 호출해 계산 결과를 복사하고 있지 않은가?
- 원본 state와 파생 state가 동시에 존재해 동기화 deps를 맞춰야 하는가?
- 검색어, 필터, 원본 목록 중 하나가 바뀌었을 때 결과가 같은 렌더에서 즉시 맞춰지는가?
- 계산이 실제로 비싸지 않다면 useMemo 없이 렌더 중 계산해도 충분한가?

## 흔한 실수

- 필터 결과, 정렬 결과, 총합처럼 계산 가능한 값을 state로 다시 저장합니다.
- deps 배열에 원본 목록이나 필터 조건을 빠뜨려 특정 버튼을 눌렀을 때만 결과가 stale해집니다.
- 깜빡임을 숨기려고 loading state나 memoization을 추가해 동기화 문제를 더 키웁니다.

## 테스트와 검증 포인트

- 원본 목록 변경, 검색어 변경, 필터 조건 변경을 각각 재현합니다.
- 필터 조건을 바꾸는 즉시 목록과 카운트가 함께 바뀌는지 확인합니다.
- useEffect를 제거해도 같은 UI가 유지되는지 작은 단위로 리팩터링해 봅니다.

## 예제 읽는 법

- `BadCase.tsx`에서 `품절 포함`이나 `마우스 입고`를 눌러 봅니다. effect deps가 검색어뿐이라 검색어를 바꾸기 전까지 저장된 결과가 갱신되지 않습니다.
- `Example.tsx`는 `products`, `query`, `availableOnly`에서 바로 `visibleProducts`를 계산해 별도 동기화가 필요 없습니다.
- 실제 리뷰에서는 "effect가 필요한가"보다 먼저 "이 값이 저장해야 하는 값인가, 계산 가능한 값인가"를 확인합니다.

## 관련 패턴

- [Derived State](../../state-management/derived-state/README.md)
- [Expensive Calculation](../../performance-rendering/expensive-calculation/README.md)

## 참고 자료

- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
