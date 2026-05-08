# UI 상태 표현

영문명: UI State

React 화면에서 로딩, 빈 상태, 에러, pending, disabled 같은 상태를 사용자에게 어떻게 보여줄지 다룹니다.

## 이 카테고리의 질문

로딩, 빈 상태, 에러, pending을 어떻게 표현할 것인가

## 언제 이 카테고리로 들어오는가

- 로딩, 빈 상태, 에러를 화면마다 다르게 처리한다
- pending, disabled, confirm 같은 사용자 피드백 기준이 필요하다
- 실패 후 사용자가 무엇을 해야 할지 화면에 드러나지 않는다

## 빠른 선택 가이드

| 찾고 있는 문제 | 먼저 볼 패턴 | 영문명 |
| --- | --- | --- |
| 목록 화면의 loading, empty, error, success 상태를 일관되게 분기합니다. | [로딩/빈 상태/에러](./loading-empty-error/README.md) | Loading / Empty / Error |
| 대기 시간과 레이아웃 예측 가능성에 따라 skeleton과 spinner를 선택합니다. | [스켈레톤 vs 스피너](./skeleton-vs-spinner/README.md) | Skeleton vs Spinner |
| 오류의 복구 위치에 따라 toast와 inline 메시지를 선택합니다. | [토스트 vs 인라인 오류](./toast-vs-inline-error/README.md) | Toast vs Inline Error |
| 파괴적 행동 전에 명확한 확인 단계를 둡니다. | [확인 다이얼로그](./confirm-dialog/README.md) | Confirm Dialog |
| 사용자 액션이 처리 중임을 버튼과 관련 영역에 표시합니다. | [처리 중 상태](./pending-state/README.md) | Pending State |
| 액션이 불가능한 상태와 이유를 명확히 표현합니다. | [비활성 상태](./disabled-state/README.md) | Disabled State |
| 빈 결과를 막다른 화면이 아니라 다음 행동으로 연결합니다. | [빈 상태](./empty-state/README.md) | Empty State |
| 복구 가능한 오류를 명확한 메시지와 액션으로 보여줍니다. | [에러 상태](./error-state/README.md) | Error State |

## 읽는 순서

1. 위 표에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. React 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.
