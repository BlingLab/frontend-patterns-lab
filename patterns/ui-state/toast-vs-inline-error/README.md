# 토스트 vs 인라인 오류

영문명: Toast vs Inline Error
폴더: `ui-state/toast-vs-inline-error`

## 한 줄 요약

오류의 복구 위치에 따라 toast와 inline 메시지를 선택합니다.

## 패턴 형태

- 분류: UI 상태 표현
- 형태: Error Surface
- 목적: 로딩, 빈 상태, 에러, pending을 어떻게 표현할 것인가

## 왜 필요한가

필드 오류를 toast로만 보여주면 사용자는 어디를 고쳐야 하는지 찾기 어렵습니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

## 언제 사용하는가

- 사용자가 같은 위치에서 고칠 수 있으면 inline
- 작업 결과 알림이나 전역 실패는 toast
- 폼 오류는 field/global error로 분리

## 언제 피해야 하는가

- 중요 오류를 자동 사라지는 toast에만 두는 경우
- 동일 오류를 toast와 inline에 중복 노출하는 경우

## 어떻게 사용하는가

1. 오류 원인과 복구 위치를 분류한다
2. 복구 가능한 입력 오류는 inline으로 둔다
3. 전역 시스템 오류는 toast나 banner로 알린다

## 실무 예시

`Toast vs Inline Error`의 핵심은 오류의 복구 위치에 따라 toast와 inline 메시지를 선택하는 방식입니다. 사용자가 현재 화면 상태를 오해하지 않도록 로딩, 실패, 빈 결과, 처리 중 상태를 분리할 때 사용합니다.

## 기본 코드 형태

```tsx
if (state.status === 'loading') return <LoadingState />;
if (state.status === 'error') return <ErrorState onRetry={retry} />;
if (state.status === 'success' && state.data.length === 0) return <EmptyState />;
return <Content data={state.data} />;
```

## 구분 기준

이 패턴은 "지금 화면이 어떤 상태이고 사용자가 무엇을 할 수 있는가"를 표현하는 문제입니다. 데이터 구조보다 피드백과 다음 행동이 핵심이면 `Toast vs Inline Error` 패턴을 봅니다.

패턴 유형으로는 `Error Surface`에 가깝습니다. 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- 사용자가 현재 상태를 한눈에 이해할 수 있는가?
- 복구 가능한 상태에는 다음 행동이 제공되는가?
- loading, empty, error가 서로 잘못 대체되지 않는가?

## 흔한 실수

- 빈 결과를 오류처럼 보여주거나 오류를 빈 상태처럼 숨깁니다.
- pending 상태 없이 버튼만 disabled 처리합니다.
- 사용자가 할 수 있는 다음 행동을 제공하지 않습니다.

## 적용 흐름

1. 오류 원인과 복구 위치를 분류한다
2. 복구 가능한 입력 오류는 inline으로 둔다
3. 전역 시스템 오류는 toast나 banner로 알린다

## 적용하지 않을 신호

- 중요 오류를 자동 사라지는 toast에만 두는 경우
- 동일 오류를 toast와 inline에 중복 노출하는 경우

## 예제 읽는 법

`Example.tsx`와 `BadCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Server Error Mapping](../../forms/server-error-mapping/README.md)
- [Error State](../error-state/README.md)

## 참고 자료

- [React: Conditional rendering](https://react.dev/learn/conditional-rendering)
- [WAI-ARIA APG: Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
