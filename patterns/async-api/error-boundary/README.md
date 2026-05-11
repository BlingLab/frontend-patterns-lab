# 에러 경계

영문명: Error Boundary
폴더: `async-api/error-boundary`

## 한 줄 요약

렌더링 중 발생한 오류를 화면 경계에서 잡아 대체 UI를 보여줍니다.

## 패턴 형태

- 분류: 비동기와 API 상태
- 형태: Server State / Query / Mutation / Boundary
- 핵심 질문: 원격 데이터의 생명주기와 실패 복구를 어디서 관리할 것인가

## 왜 필요한가

컴포넌트에서 throw된 에러가 잡히지 않으면 앱 전체가 빈 화면이 됩니다. ErrorBoundary는 해당 구역의 에러를 격리해 나머지 화면은 정상 동작하게 하고 대체 UI를 보여줍니다.

서버 상태는 클라이언트가 소유한 값이 아니라 원격 원본의 캐시입니다. TanStack Query는 query key로 캐시를 식별하고, mutation 이후 관련 query를 invalidate하거나 optimistic update로 먼저 반영한 뒤 실패 시 되돌리는 흐름을 제공합니다.

## 핵심 원리

- class 컴포넌트로만 구현 가능하지만 래퍼로 쉽게 쓸 수 있다
- 에러를 잡는 범위를 granular하게 나눌 수 있다
- react-error-boundary 라이브러리가 많이 사용된다

## 언제 사용하는가

- 위젯 단위로 실패를 격리하고 싶을 때
- 대시보드처럼 독립 영역이 많은 화면
- 복구 버튼이나 로그 전송이 필요한 경우

## 언제 피해야 하는가

- 이벤트 핸들러나 async 오류만 처리하려는 경우
- 오류를 숨기면 안 되는 핵심 플로우

## 어떻게 사용하는가

1. 경계 컴포넌트로 위험 영역을 감싼다
2. fallback UI와 retry 정책을 정한다
3. 로그/모니터링 연계를 추가한다

## 기본 코드 형태

```tsx
<ErrorBoundary fallback={<ErrorState onRetry={reload} />}>
  <DashboardWidget />
</ErrorBoundary>
```

## 실무 판단 기준

- 조회는 query hook으로 숨기고, 쓰기는 mutation hook으로 명령 경계를 분리합니다.
- mutation 성공 후 어떤 query가 stale해지는지 문서화합니다.
- 서버 응답 구조는 adapter에서 UI 모델로 변환해 컴포넌트가 API 스키마를 직접 알지 않게 합니다.
- 로딩, 에러, 빈 결과, 성공 상태는 서로 다른 상태로 모델링합니다.

## 코드 리뷰 체크리스트

- query key가 필터, 페이지, 상세 id를 안정적으로 포함하는가?
- mutation 이후 invalidate, 직접 cache update, optimistic update 중 하나의 정책이 명확한가?
- 실패 시 retry, rollback, inline error 표시가 어디서 처리되는가?
- 컴포넌트가 fetch URL, 응답 스키마, cache 정책을 동시에 알지 않는가?

## 흔한 실수

- mutation 성공 후 목록은 갱신하지만 상세 캐시는 오래된 값을 유지합니다.
- 서버 응답의 snake_case나 중첩 구조가 UI props까지 흘러갑니다.
- isLoading/isError/isSuccess boolean을 따로 두어 불가능한 요청 상태를 만듭니다.

## 테스트와 검증 포인트

- 생성/수정/삭제 후 목록과 상세 화면을 번갈아 보며 오래된 값이 남는지 확인합니다.
- 네트워크 실패, 느린 응답, 중복 클릭 상황에서 rollback과 pending UI가 맞는지 확인합니다.
- adapter 함수는 서버 응답 샘플을 넣어 순수 함수 테스트로 검증합니다.

## 예제 읽는 법

- `BadCase.tsx`에서 책임이 어디에 섞여 있는지 먼저 봅니다.
- `Example.tsx`에서 호출부 API, 상태 소유권, 변경 범위가 어떻게 줄었는지 비교합니다.
- 문서의 체크리스트를 기준으로 같은 패턴을 실제 코드 리뷰에 적용할 수 있는지 확인합니다.

## 관련 패턴

- [Error State](../../ui-state/error-state/README.md)
- [Suspense Boundary](../suspense-boundary/README.md)

## 참고 자료

- [React: Component - Catching rendering errors with an Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [TanStack Query: Query Keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- [TanStack Query: Invalidations from Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations)
- [TanStack Query: Optimistic Updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
