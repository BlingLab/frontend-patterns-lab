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
// BadCase.tsx에서 문제 지점을 확인한 뒤
// ImprovedCase.tsx에서 책임을 어디로 옮겼는지 비교한다.
```

## 실무 판단 기준

- 먼저 버그가 나는 사용자 흐름이나 변경 요구를 찾습니다.
- 문제를 만든 책임 경계를 좁혀 최소 리팩터링 단위로 나눕니다.
- 개선 후에는 불가능한 상태, 중복 소스, 불안정한 identity가 줄었는지 확인합니다.
- 예외적으로 괜찮은 단순 케이스까지 금지 규칙으로 만들지 않습니다.

## 코드 리뷰 체크리스트

- 문제 징후가 실제 변경 비용이나 사용자 버그로 이어지는가?
- 개선안이 책임을 더 명확히 만들고 테스트 단위를 좁히는가?
- 새 abstraction이 기존 코드보다 더 읽기 쉬운 API를 제공하는가?
- 예외 케이스와 적용하지 않을 신호가 문서화되어 있는가?

## 흔한 실수

- 문제 징후를 발견하자마자 큰 구조 개편으로 번집니다.
- 성능 문제와 가독성 문제를 구분하지 않고 memoization으로 가립니다.
- 개선 기준 없이 파일만 쪼개거나 store만 추가합니다.

## 테스트와 검증 포인트

- BadCase에서 어떤 변경이 깨지는지 먼저 재현합니다.
- ImprovedCase에서 같은 변경을 적용했을 때 수정 범위가 줄었는지 확인합니다.
- 정적 목록, 작은 컴포넌트, 임시 코드처럼 예외가 되는 상황을 리뷰에서 분리합니다.

## 예제 읽는 법

- `BadCase.tsx`에서 문제가 되는 흐름을 먼저 재현합니다.
- `ImprovedCase.tsx`에서 책임이 어디로 이동했는지 확인합니다.
- `Example.tsx`는 개선안을 더 작은 화면 맥락에서 실행해 보는 기준으로 읽습니다.

## 관련 패턴

- [Memoization Boundary](../../performance-rendering/memoization-boundary/README.md)
- [useMemo / useCallback](../../performance-rendering/usememo-usecallback/README.md)

## 참고 자료

- [React: memo](https://react.dev/reference/react/memo)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
