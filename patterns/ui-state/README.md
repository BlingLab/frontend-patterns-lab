# UI 상태 표현

영문명: UI State

UI 상태 표현은 현재 화면이 어떤 상태인지, 사용자가 다음에 무엇을 할 수 있는지를 명확히 전달하는 문제입니다. 같은 데이터 상태라도 loading, empty, error, disabled, pending, confirm은 서로 다른 복구 경로를 갖습니다.

## 이 카테고리의 질문

로딩, 빈 상태, 에러, pending을 어떻게 표현할 것인가

## 언제 이 카테고리로 들어오는가

- 로딩 중 빈 화면이 보이거나 에러가 조용히 사라질 때
- 버튼이 disabled인데 이유를 알 수 없을 때
- 폼 필드 오류를 toast로만 보여줘 복구 위치가 흐릴 때
- 삭제 같은 파괴적 행동이 클릭 한 번으로 실행될 때

## 먼저 판단할 순서

1. 목록 화면은 loading, error, empty, data 순서로 상태를 분리합니다.
2. 대기 UI는 skeleton과 spinner 중 레이아웃 예측 가능성에 맞게 고릅니다.
3. 오류는 복구 위치에 따라 inline, toast, page error로 나눕니다.
4. 사용자 액션 중에는 pending과 disabled 이유를 가까이 보여줍니다.
5. 파괴적 행동은 confirm dialog와 focus 흐름을 함께 설계합니다.

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

## 선택 신호

| 코드에서 보이는 신호 | 우선 검토할 패턴 |
| --- | --- |
| 목록의 상태 분기가 섞임 | 로딩/빈 상태/에러 |
| 레이아웃을 예측할 수 있는 대기 | 스켈레톤 vs 스피너 |
| 복구 위치가 특정 필드/영역 | 토스트 vs 인라인 오류 |
| 파괴적 행동 | 확인 다이얼로그 |
| 중복 클릭 방지 | 처리 중 상태 |
| 왜 못 누르는지 설명 필요 | 비활성 상태 |

## 패턴별 핵심 메모

- [로딩/빈 상태/에러](./loading-empty-error/README.md) (Loading / Empty / Error): 상태 분기를 빠뜨리면 로딩 중에 빈 목록이 보이거나 에러 시 아무것도 안 보입니다. 4가지 상태를 명시적으로 처리하면 어떤 상황에서도 적절한 UI를 보여줄 수 있습니다. 핵심: loading, empty, error, data 4가지 상태를 모두 처리한다.
- [스켈레톤 vs 스피너](./skeleton-vs-spinner/README.md) (Skeleton vs Spinner): skeleton은 "여기에 무언가 올 것이다"라는 예측을 줘 체감 대기 시간을 줄이고 레이아웃 시프트를 방지합니다. 반면 전체 페이지 전환처럼 최종 레이아웃을 예측할 수 없으면 spinner가 맞습니다. 핵심: skeleton: 내용 레이아웃이 예측 가능한 카드, 목록에 사용한다.
- [토스트 vs 인라인 오류](./toast-vs-inline-error/README.md) (Toast vs Inline Error): 폼 필드 오류를 toast로 보내면 사용자가 어떤 필드를 고쳐야 하는지 모릅니다. 반대로 전역 시스템 오류를 모든 폼 필드 아래 표시하면 연관성이 없습니다. 오류 위치와 복구 행동이 맞아야 합니다. 핵심: inline: 특정 필드/영역과 직접 연관된 오류.
- [확인 다이얼로그](./confirm-dialog/README.md) (Confirm Dialog): 삭제, 영구 취소처럼 되돌릴 수 없는 행동을 클릭 한 번에 실행하면 실수가 발생합니다. 확인 다이얼로그는 의도를 다시 확인하고 실수를 방지하는 안전장치입니다. 핵심: 파괴적 행동에 명확한 경고 문구를 쓴다.
- [처리 중 상태](./pending-state/README.md) (Pending State): 버튼을 누른 뒤 화면이 아무 반응이 없으면 사용자는 "제출이 됐나?" 하고 다시 누릅니다. 처리 중 상태를 즉시 보여주면 불안감을 줄이고 중복 제출을 방지합니다. 핵심: 버튼을 disabled + 로딩 스피너로 즉각 피드백을 준다.
- [비활성 상태](./disabled-state/README.md) (Disabled State): 버튼이 왜 비활성 상태인지 모르면 사용자가 좌절합니다. 비활성 버튼에 tooltip이나 도움말을 붙여 "무엇을 해야 활성화되는지" 알려주면 UX가 크게 개선됩니다. 핵심: 단순 disabled 속성만으론 이유를 전달하지 못한다.
- [빈 상태](./empty-state/README.md) (Empty State): "결과가 없습니다" 텍스트만 있으면 사용자는 다음에 무엇을 해야 할지 모릅니다. 일러스트, 설명, 액션 버튼을 함께 제공하면 빈 상태가 전환점이 됩니다. 핵심: 검색 결과 없음: 다른 검색어 시도, 필터 초기화 CTA를 제공한다.
- [에러 상태](./error-state/README.md) (Error State): 오류 코드만 보여주거나 아무것도 안 보여주면 사용자가 무엇을 해야 하는지 모릅니다. 무슨 문제인지, 어떻게 해결할 수 있는지를 명확히 하면 사용자 이탈을 줄일 수 있습니다. 핵심: 다시 시도 버튼으로 복구 경로를 제공한다.

## 코드 리뷰 질문

- 사용자가 현재 상태와 다음 행동을 한눈에 이해할 수 있는가?
- 복구 가능한 오류에 retry, reset, edit 같은 액션이 있는가?
- disabled 이유가 helper text, tooltip, aria 속성으로 전달되는가?
- dialog는 keyboard와 focus 흐름이 예측 가능한가?

## 같이 볼 카테고리

- [비동기와 API 상태](../async-api/README.md): request status와 서버 오류를 화면에 연결할 때
- [폼과 검증](../forms/README.md): field error와 submit pending을 다룰 때
- [컴포넌트 조합](../component-composition/README.md): Dialog/EmptyState 같은 재사용 UI를 만들 때

## 읽는 순서

1. 빠른 선택 가이드에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. React 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 코드 리뷰 질문으로 실제 코드에 적용할 수 있는지 확인합니다.
5. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.

## 참고 자료

- [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [WAI-ARIA APG: Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [MDN: aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled)
