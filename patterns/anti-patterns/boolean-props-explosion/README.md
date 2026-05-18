# boolean props 폭발

영문명: Boolean Props Explosion
폴더: `anti-patterns/boolean-props-explosion`

## 한 줄 요약

여러 boolean prop 조합으로 상태 공간이 커지는 문제를 피합니다.

## 패턴 형태

- 분류: 안티패턴
- 형태: 문제 징후 / 리팩터링 가이드
- 핵심 질문: 지금 보이는 코드 냄새가 실제 버그와 변경 비용으로 이어지는가

## 왜 필요한가

isWarning, isDanger, isSuccess, isLarge, isSmall 같은 boolean이 5개면 2^5=32가지 조합이 생깁니다. 대부분은 의미 없는 조합이고 테스트도 불가능합니다. variant="warning" | "danger"처럼 명시적 열거형으로 유효한 상태만 허용해야 합니다.

안티패턴은 금지 목록이 아니라 리팩터링 신호입니다. React 공식 문서의 상태 구조 원칙, effect 사용 기준, key/state 보존 규칙을 기준으로 “왜 처음에는 편해 보였고, 어떤 변경에서 깨지는지”까지 설명해야 팀 리뷰에서 설득력이 생깁니다.

## 핵심 원리

- variant union type으로 유효한 상태만 표현한다
- boolean은 "켜짐/꺼짐" 독립 개념에만 쓴다(isDisabled, isLoading)
- boolean 여러 개가 함께 다니면 variant로 통합을 검토한다

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

## 기본 코드 형태

```tsx
type AlertTone = 'info' | 'success' | 'warning' | 'danger';

function Alert({ tone }: { tone: AlertTone }) {
  return <div className={`alert alert-${tone}`} />;
}
```

## 실무 판단 기준

- 서로 배타적인 의미는 여러 boolean이 아니라 하나의 `variant`, `tone`, `status`, `size`로 표현합니다.
- boolean은 `disabled`, `checked`, `loading`처럼 독립적으로 켜지고 꺼지는 상태에만 둡니다.
- 디자인 시스템의 시각 상태 이름과 컴포넌트 API 이름이 다르면 호출부가 조합을 추측하게 됩니다.
- 기존 boolean API를 바꿀 때는 마이그레이션 비용을 보고 deprecated prop을 잠시 유지할 수 있습니다.

## 코드 리뷰 체크리스트

- `isPrimary`, `isSecondary`, `isDanger`처럼 동시에 true가 되면 안 되는 prop이 여러 개인가?
- 내부 코드가 boolean 우선순위를 정하느라 `if/else`가 길어지고 있지 않은가?
- 디자인 스펙에 없는 조합을 타입이 허용하고 있지 않은가?
- 호출부에서 prop 조합만 보고 실제 표시 상태를 예측할 수 있는가?

## 흔한 실수

- 새 상태가 필요할 때마다 boolean prop을 하나씩 추가해 조합 수를 폭발시킵니다.
- `isError`와 `isSuccess`가 동시에 true일 때 컴포넌트 내부 우선순위로 조용히 덮습니다.
- `variant`로 바꾼 뒤에도 기존 boolean prop을 계속 함께 받아 두 모델이 공존합니다.
- 독립적인 boolean까지 무리하게 variant에 넣어 API가 오히려 경직됩니다.

## 테스트와 검증 포인트

- 가능한 variant 목록이 디자인 스펙의 상태 목록과 일치하는지 확인합니다.
- 이전 boolean 조합 중 불가능했던 상태가 타입 수준에서 막히는지 확인합니다.
- snapshot이나 visual test는 모든 boolean 조합이 아니라 유효한 variant만 대상으로 삼습니다.
- `disabled + loading`처럼 독립 boolean과 variant가 함께 쓰이는 경우 조합 의미를 문서화합니다.

## 예제에서 확인할 것

- 좋은 예는 `tone` 하나로 알림의 의미를 표현해 동시에 두 상태가 켜질 수 없습니다.
- 나쁜 예는 `isSuccess`, `isWarning`, `isDanger`가 동시에 true가 될 수 있고, 컴포넌트 내부 우선순위가 실제 의미를 덮습니다.
- boolean은 `disabled`, `loading`처럼 독립적인 on/off 개념에만 쓰고, 서로 배타적인 상태는 union이나 variant로 모델링합니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 서로 배타적인 boolean이 동시에 true가 될 때 어떤 상태가 이기는지 확인합니다.
- `ImprovedCase.tsx`에서는 같은 의미가 `tone` 하나로 좁혀져 불가능한 조합이 사라지는지 봅니다.
- 실제 디자인 시스템 컴포넌트에서는 variant 축과 독립 boolean 축을 분리해 API 표를 작성합니다.

## 관련 패턴

- [Request Status Model](../../async-api/request-status-model/README.md)
- [Disabled State](../../ui-state/disabled-state/README.md)

## 참고 자료

- [TypeScript: Union Types](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
