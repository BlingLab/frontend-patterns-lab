# 서버/클라이언트 상태 혼합

영문명: Mixed Server / Client State
폴더: `anti-patterns/mixed-server-client-state`

## 한 줄 요약

서버 상태와 클라이언트 UI 상태의 소유권을 섞지 않습니다.

## 패턴 형태

- 분류: 안티패턴
- 형태: Ownership Smell
- 목적: 자주 하는 실수와 개선 방향은 무엇인가

## 왜 필요한가

서버 데이터 캐시와 modal open 같은 UI 상태를 같은 store에 넣으면 갱신 정책이 불명확해집니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

## 언제 사용하는가

- API 응답을 전역 UI store에 복사하는 경우
- 서버 재검증과 로컬 편집 상태가 섞인 경우
- 캐시 무효화 기준이 불분명한 경우

## 언제 피해야 하는가

- 오프라인 편집처럼 의도적으로 local draft가 필요한 경우
- 작은 앱에서 별도 캐시 도구가 과한 경우

## 어떻게 사용하는가

1. 상태 소유자를 분류한다
2. 서버 데이터는 query/cache 계층에 둔다
3. UI 상태는 가까운 React state에 둔다

## 실무 예시

`Mixed Server / Client State`의 핵심은 서버 상태와 클라이언트 UI 상태의 소유권을 섞는 문제를 피하는 것입니다. 코드 리뷰에서 반복되는 구조적 냄새를 설명하고 작은 리팩터링 단위로 쪼갤 때 사용합니다.

## 기본 코드 형태

```tsx
// BadCase.tsx에서 냄새를 확인한 뒤
// ImprovedCase.tsx에서 책임을 어디로 옮겼는지 비교한다.
```

## 구분 기준

이 문서는 금지 규칙이 아니라 리팩터링 신호입니다. `Mixed Server / Client State`가 보이면 왜 생겼는지 확인하고, 더 작은 책임 경계로 옮길 수 있는지 봅니다.

형태상으로는 `Ownership Smell`에 속하므로, 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- 문제가 실제 변경 비용이나 버그로 이어지고 있는가?
- 더 작은 리팩터링으로 책임을 분리할 수 있는가?
- 개선 후 호출부와 테스트 단위가 더 명확해졌는가?

## 흔한 실수

- 냄새를 발견하자마자 큰 리팩터링으로 번집니다.
- 예외적으로 괜찮은 단순 케이스까지 금지합니다.
- 개선 기준 없이 파일만 쪼갭니다.

## 적용 흐름

1. 상태 소유자를 분류한다
2. 서버 데이터는 query/cache 계층에 둔다
3. UI 상태는 가까운 React state에 둔다

## 적용하지 않을 신호

- 오프라인 편집처럼 의도적으로 local draft가 필요한 경우
- 작은 앱에서 별도 캐시 도구가 과한 경우

## 예제 읽는 법

`BadCase.tsx`와 `ImprovedCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Server State vs Client State](../../state-management/server-state-vs-client-state/README.md)
- [Query Hook Pattern](../../async-api/query-hook-pattern/README.md)

## 참고 자료

- [React: useEffect](https://react.dev/reference/react/useEffect)
- [React: Preserving and resetting state](https://react.dev/learn/preserving-and-resetting-state)
- [React: memo](https://react.dev/reference/react/memo)
