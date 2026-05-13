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
- error 상태에는 retry, 문의, 이전 화면 이동처럼 복구 경로를 둡니다.
- empty 상태에는 create, reset filter, invite처럼 빈 상태를 벗어나는 행동을 둡니다.
- loading은 기존 목록을 유지할지 skeleton으로 대체할지 화면의 안정성을 기준으로 결정합니다.

## 코드 리뷰 체크리스트

- 현재 상태를 한눈에 이해할 수 있는 시각적 신호가 있는가?
- 복구 가능한 상태에 retry, reset, create, edit 같은 다음 행동이 있는가?
- loading과 empty가 동시에 보이거나, error와 data가 동시에 보이는 불가능한 상태가 없는가?
- `role="status"`나 `role="alert"`처럼 상태 변화가 보조 기술에 전달되는가?

## 흔한 실수

- 빈 결과를 에러처럼 보여주거나 에러를 빈 상태처럼 숨깁니다.
- `isLoading`, `isError`, `items.length`를 따로 조합해 충돌 상태가 생깁니다.
- retry 없이 "오류가 발생했습니다"만 보여줘 사용자가 다음 행동을 알 수 없습니다.
- 필터 결과가 비어 있는 상황과 데이터 자체가 없는 상황을 같은 문구로 처리합니다.

## 테스트와 검증 포인트

- 느린 응답, 빈 데이터, 서버 오류, 필터 결과 없음 상태를 각각 강제로 만들어 확인합니다.
- 에러에서 retry를 눌렀을 때 loading을 거쳐 success나 error로 다시 전이되는지 봅니다.
- 빈 상태의 create/reset 액션이 실제로 다음 화면 상태를 바꾸는지 확인합니다.
- 스크린 리더가 loading/status와 error/alert 변화를 읽을 수 있는지 점검합니다.

## 예제 읽는 법

- `BadCase.tsx`에서 loading, error, data 토글을 동시에 켜 봅니다. 화면이 로딩, 에러, 빈 상태를 한꺼번에 말하는 충돌 상태가 됩니다.
- `Example.tsx`는 `loading | error | empty | success` 중 하나만 선택하게 해 현재 화면 상태를 하나로 고정합니다.
- `StateView.tsx`는 상태별 UI와 복구 행동을 한 경계에 모아 목록 컴포넌트가 success 렌더링에 집중하게 합니다.

## 관련 패턴

- [Request Status Model](../../async-api/request-status-model/README.md)
- [Empty State](../empty-state/README.md)

## 참고 자료

- [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [MDN: ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)
- [MDN: ARIA alert role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role)
