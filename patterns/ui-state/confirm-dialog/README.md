# 확인 다이얼로그

영문명: Confirm Dialog
폴더: `ui-state/confirm-dialog`

## 한 줄 요약

파괴적 행동 전에 명확한 확인 단계를 둡니다.

## 패턴 형태

- 분류: UI 상태 표현
- 형태: Confirmation Flow
- 목적: 로딩, 빈 상태, 에러, pending을 어떻게 표현할 것인가

## 왜 필요한가

삭제나 권한 변경은 한 번의 실수로 되돌리기 어려운 결과를 만들 수 있습니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

## 언제 사용하는가

- 삭제, 탈퇴, 권한 회수처럼 되돌리기 어려운 액션
- 대량 작업이나 비용이 큰 변경
- 사용자가 결과를 다시 확인해야 하는 경우

## 언제 피해야 하는가

- 취소 가능한 사소한 액션
- undo가 더 빠르고 안전한 경우

## 어떻게 사용하는가

1. 대상과 결과를 명확히 보여준다
2. confirm/cancel focus와 키보드 동작을 보장한다
3. 확인 후 pending과 오류 상태를 처리한다

## 실무 예시

`Confirm Dialog`의 핵심은 파괴적 행동 전에 명확한 확인 단계를 둡니다. 사용자가 현재 화면 상태를 오해하지 않도록 로딩, 실패, 빈 결과, 처리 중 상태를 분리할 때 사용합니다.

## 기본 코드 형태

```tsx
if (state.status === 'loading') return <LoadingState />;
if (state.status === 'error') return <ErrorState onRetry={retry} />;
if (state.status === 'success' && state.data.length === 0) return <EmptyState />;
return <Content data={state.data} />;
```

## 구분 기준

이 패턴은 "지금 화면이 어떤 상태이고 사용자가 무엇을 할 수 있는가"를 표현하는 문제입니다. 데이터 구조보다 피드백과 다음 행동이 핵심이면 `Confirm Dialog` 패턴을 봅니다.

형태상으로는 `Confirmation Flow`에 속하므로, 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- 사용자가 현재 상태를 한눈에 이해할 수 있는가?
- 복구 가능한 상태에는 다음 행동이 제공되는가?
- loading, empty, error가 서로 잘못 대체되지 않는가?

## 흔한 실수

- 빈 결과를 오류처럼 보여주거나 오류를 빈 상태처럼 숨깁니다.
- pending 상태 없이 버튼만 disabled 처리합니다.
- 사용자가 할 수 있는 다음 행동을 제공하지 않습니다.

## 적용 흐름

1. 대상과 결과를 명확히 보여준다
2. confirm/cancel focus와 키보드 동작을 보장한다
3. 확인 후 pending과 오류 상태를 처리한다

## 적용하지 않을 신호

- 취소 가능한 사소한 액션
- undo가 더 빠르고 안전한 경우

## 예제 읽는 법

`Example.tsx`와 `BadCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Submit Lock](../../forms/submit-lock/README.md)
- [Pending State](../pending-state/README.md)

## 참고 자료

- [React: Conditional rendering](https://react.dev/learn/conditional-rendering)
- [WAI-ARIA APG: Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
