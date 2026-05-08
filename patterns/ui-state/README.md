# UI State

사용자가 현재 상태와 다음 행동을 이해하도록 화면 상태를 설계하는 패턴입니다.

## 이 카테고리의 질문

로딩, 빈 상태, 에러, pending을 어떻게 표현할 것인가

## 언제 이 카테고리로 들어오는가

- 비동기 결과에 따라 화면이 바뀐다
- 실패와 빈 결과를 구분해야 한다
- 처리 중인 액션의 피드백이 필요하다

## 빠른 선택 가이드

| 찾고 있는 문제 | 먼저 볼 패턴 | 패턴 형태 |
| --- | --- | --- |
| 목록 화면의 loading, empty, error, success 상태를 일관되게 분기합니다. | [Loading / Empty / Error](./loading-empty-error/README.md) | State View |
| 대기 시간과 레이아웃 예측 가능성에 따라 skeleton과 spinner를 선택합니다. | [Skeleton vs Spinner](./skeleton-vs-spinner/README.md) | Loading Feedback |
| 오류의 복구 위치에 따라 toast와 inline 메시지를 선택합니다. | [Toast vs Inline Error](./toast-vs-inline-error/README.md) | Error Surface |
| 파괴적 행동 전에 명확한 확인 단계를 둡니다. | [Confirm Dialog](./confirm-dialog/README.md) | Confirmation Flow |
| 사용자 액션이 처리 중임을 버튼과 관련 영역에 표시합니다. | [Pending State](./pending-state/README.md) | Action Feedback |
| 액션이 불가능한 상태와 이유를 명확히 표현합니다. | [Disabled State](./disabled-state/README.md) | Availability State |
| 빈 결과를 막다른 화면이 아니라 다음 행동으로 연결합니다. | [Empty State](./empty-state/README.md) | Empty Feedback |
| 복구 가능한 오류를 명확한 메시지와 액션으로 보여줍니다. | [Error State](./error-state/README.md) | Recoverable Error UI |

## 읽는 순서

1. 위 표에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.

## 참고 자료

- [React: Conditional rendering](https://react.dev/learn/conditional-rendering)
- [WAI-ARIA APG: Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
