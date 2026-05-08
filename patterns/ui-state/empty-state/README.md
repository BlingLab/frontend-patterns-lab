# Empty State

## 한 줄 요약

빈 결과를 막다른 화면이 아니라 다음 행동으로 연결합니다.

## 패턴 형태

- 분류: UI State
- 형태: Empty Feedback
- 목적: 로딩, 빈 상태, 에러, pending을 어떻게 표현할 것인가

## 왜 필요한가

데이터가 없다는 사실만 보여주면 사용자는 무엇을 해야 할지 모릅니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

## 언제 사용하는가

- 첫 사용 상태
- 검색 결과 없음
- 필터 조건 때문에 목록이 비었을 때

## 언제 피해야 하는가

- 로딩 중인 상태를 empty로 오해하게 만드는 경우
- 권한 오류를 empty로 숨기는 경우

## 어떻게 사용하는가

1. 원인을 구분한다
2. 생성, 필터 초기화, 도움말 같은 다음 행동을 제공한다
3. 공간을 과하게 쓰지 않는다

## 실무 예시

`Empty State`의 핵심은 빈 결과를 막다른 화면이 아니라 다음 행동으로 연결하는 방식입니다. 사용자가 현재 화면 상태를 오해하지 않도록 로딩, 실패, 빈 결과, 처리 중 상태를 분리할 때 사용합니다.

## 기본 코드 형태

```tsx
if (state.status === 'loading') return <LoadingState />;
if (state.status === 'error') return <ErrorState onRetry={retry} />;
if (state.status === 'success' && state.data.length === 0) return <EmptyState />;
return <Content data={state.data} />;
```

## 구분 기준

이 패턴은 "지금 화면이 어떤 상태이고 사용자가 무엇을 할 수 있는가"를 표현하는 문제입니다. 데이터 구조보다 피드백과 다음 행동이 핵심이면 `Empty State` 패턴을 봅니다.

형태상으로는 `Empty Feedback`에 속하므로, 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- 사용자가 현재 상태를 한눈에 이해할 수 있는가?
- 복구 가능한 상태에는 다음 행동이 제공되는가?
- loading, empty, error가 서로 잘못 대체되지 않는가?

## 흔한 실수

- 빈 결과를 오류처럼 보여주거나 오류를 빈 상태처럼 숨깁니다.
- pending 상태 없이 버튼만 disabled 처리합니다.
- 사용자가 할 수 있는 다음 행동을 제공하지 않습니다.

## 적용 흐름

1. 원인을 구분한다
2. 생성, 필터 초기화, 도움말 같은 다음 행동을 제공한다
3. 공간을 과하게 쓰지 않는다

## 적용하지 않을 신호

- 로딩 중인 상태를 empty로 오해하게 만드는 경우
- 권한 오류를 empty로 숨기는 경우

## 예제 읽는 법

`Example.tsx`와 `BadCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Loading / Empty / Error](../loading-empty-error/README.md)
- [Error State](../error-state/README.md)

## 참고 자료

- [React: Conditional rendering](https://react.dev/learn/conditional-rendering)
- [WAI-ARIA APG: Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
