# Boolean Props Explosion

## 한 줄 요약

여러 boolean prop 조합으로 컴포넌트 상태 공간을 폭발시키지 않습니다.

## 패턴 형태

- 분류: Anti Patterns
- 형태: API Smell
- 목적: 자주 하는 실수와 개선 방향은 무엇인가

## 왜 필요한가

primary, danger, loading, disabled, ghost가 독립 boolean이면 불가능한 조합이 쉽게 만들어집니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

## 언제 사용하는가

- variant, size, status처럼 enum으로 표현 가능한 옵션
- boolean 조합이 디자인 스펙에 없는 상태를 만들 때
- 조건문이 prop 조합으로 커질 때

## 언제 피해야 하는가

- 진짜 독립적인 on/off 옵션
- HTML boolean attribute를 그대로 전달하는 경우

## 어떻게 사용하는가

1. boolean 묶음을 variant/status union으로 바꾼다
2. 불가능한 조합을 타입에서 막는다
3. 디자인 토큰과 API를 맞춘다

## 실무 예시

`Boolean Props Explosion`의 핵심은 여러 boolean prop 조합으로 컴포넌트 상태 공간을 키우는 문제를 피하는 것입니다. 코드 리뷰에서 반복되는 구조적 냄새를 설명하고 작은 리팩터링 단위로 쪼갤 때 사용합니다.

## 기본 코드 형태

```tsx
// BadCase.tsx에서 냄새를 확인한 뒤
// ImprovedCase.tsx에서 책임을 어디로 옮겼는지 비교한다.
```

## 구분 기준

이 문서는 금지 규칙이 아니라 리팩터링 신호입니다. `Boolean Props Explosion`가 보이면 왜 생겼는지 확인하고, 더 작은 책임 경계로 옮길 수 있는지 봅니다.

형태상으로는 `API Smell`에 속하므로, 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- 문제가 실제 변경 비용이나 버그로 이어지고 있는가?
- 더 작은 리팩터링으로 책임을 분리할 수 있는가?
- 개선 후 호출부와 테스트 단위가 더 명확해졌는가?

## 흔한 실수

- 냄새를 발견하자마자 큰 리팩터링으로 번집니다.
- 예외적으로 괜찮은 단순 케이스까지 금지합니다.
- 개선 기준 없이 파일만 쪼갭니다.

## 적용 흐름

1. boolean 묶음을 variant/status union으로 바꾼다
2. 불가능한 조합을 타입에서 막는다
3. 디자인 토큰과 API를 맞춘다

## 적용하지 않을 신호

- 진짜 독립적인 on/off 옵션
- HTML boolean attribute를 그대로 전달하는 경우

## 예제 읽는 법

`BadCase.tsx`와 `ImprovedCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Request Status Model](../../async-api/request-status-model/README.md)
- [Disabled State](../../ui-state/disabled-state/README.md)

## 참고 자료

- [React: useEffect](https://react.dev/reference/react/useEffect)
- [React: Preserving and resetting state](https://react.dev/learn/preserving-and-resetting-state)
- [React: memo](https://react.dev/reference/react/memo)
