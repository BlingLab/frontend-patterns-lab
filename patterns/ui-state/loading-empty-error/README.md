# 로딩/빈 상태/에러

영문명: Loading / Empty / Error
폴더: `ui-state/loading-empty-error`

## 한 줄 요약

목록 화면의 loading, empty, error, success 상태를 일관되게 분기합니다.

## 패턴 형태

- 분류: UI 상태 표현
- 형태: Feedback State / Recovery Path
- 핵심 질문: 현재 상태와 다음 행동을 사용자가 바로 이해할 수 있는가

## 왜 필요한가

상태 분기를 빠뜨리면 로딩 중에 빈 목록이 보이거나 에러 시 아무것도 안 보입니다. 4가지 상태를 명시적으로 처리하면 어떤 상황에서도 적절한 UI를 보여줄 수 있습니다.

UI 상태 문서는 데이터 구조보다 사용자 피드백을 중심으로 봐야 합니다. 같은 실패라도 사용자가 고칠 수 있는 필드 오류, 일시적 시스템 오류, 복구 불가능한 오류는 표시 위치와 다음 행동이 다릅니다. 접근성 관점에서는 disabled, modal, error message가 focus와 보조 기술에 어떻게 전달되는지도 함께 봅니다.

## 핵심 원리

- loading, empty, error, data 4가지 상태를 모두 처리한다
- 각 상태는 다음 행동을 안내해야 한다
- 상태 순서: loading 먼저, 그 다음 error, 마지막에 empty/data

## 언제 사용하는가

- API 목록 화면
- 검색 결과와 빈 결과를 구분해야 할 때
- 상태별 공통 UI를 만들고 싶을 때

## 언제 피해야 하는가

- 상태가 하나뿐인 정적 영역
- Suspense 경계가 이미 로딩을 담당하는 경우

## 어떻게 사용하는가

1. 요청 상태 모델을 먼저 정한다
2. loading/error/empty/success 순서를 명확히 한다
3. 각 상태에 다음 행동을 제공한다

## 기본 코드 형태

```tsx
if (query.status === 'loading') return <LoadingState />;
if (query.status === 'error') return <ErrorState onRetry={query.refetch} />;
if (query.data.length === 0) return <EmptyState action={<CreateButton />} />;

return <ItemList items={query.data} />;
```

## 실무 판단 기준

- loading, empty, error, success를 한 목록 화면에서 모두 분기합니다.
- 사용자가 수정할 위치가 명확하면 inline 메시지를 쓰고, 전역 알림은 toast를 씁니다.
- 파괴적 행동은 confirm dialog로 한 번 더 확인하되 취소와 focus 흐름을 명확히 합니다.
- disabled 상태는 이유와 해결 방법을 가까운 위치에 설명합니다.

## 코드 리뷰 체크리스트

- 현재 상태를 한눈에 이해할 수 있는 시각적 신호가 있는가?
- 복구 가능한 상태에 retry, reset, create, edit 같은 다음 행동이 있는가?
- 비활성 컨트롤의 이유가 tooltip, helper text, aria 속성으로 전달되는가?
- modal/dialog는 focus 이동과 닫기 동작이 예측 가능한가?

## 흔한 실수

- 빈 결과를 에러처럼 보여주거나 에러를 빈 상태처럼 숨깁니다.
- 버튼을 disabled만 하고 처리 중인지, 권한이 없는지, 입력이 부족한지 설명하지 않습니다.
- toast로 폼 필드 오류를 보내 사용자가 화면에서 고칠 위치를 찾지 못합니다.

## 테스트와 검증 포인트

- 느린 응답, 빈 데이터, 서버 오류, 권한 없음, 입력 부족 상태를 각각 강제로 만들어 확인합니다.
- 키보드만으로 confirm dialog를 열고 닫고 취소할 수 있는지 확인합니다.
- 스크린 리더가 상태 메시지와 비활성 사유를 읽을 수 있는지 aria-describedby 같은 연결을 점검합니다.

## 예제 읽는 법

- `BadCase.tsx`에서 책임이 어디에 섞여 있는지 먼저 봅니다.
- `Example.tsx`에서 호출부 API, 상태 소유권, 변경 범위가 어떻게 줄었는지 비교합니다.
- 문서의 체크리스트를 기준으로 같은 패턴을 실제 코드 리뷰에 적용할 수 있는지 확인합니다.

## 관련 패턴

- [Request Status Model](../../async-api/request-status-model/README.md)
- [Empty State](../empty-state/README.md)

## 참고 자료

- [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [WAI-ARIA APG: Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [MDN: aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled)
