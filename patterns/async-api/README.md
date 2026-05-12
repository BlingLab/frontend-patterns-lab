# 비동기와 API 상태

영문명: Async API

서버 상태는 클라이언트가 소유한 값이 아니라 원격 원본의 캐시입니다. 이 카테고리는 query key, mutation, invalidation, optimistic update, adapter, boundary처럼 서버 데이터의 생명주기를 UI와 분리하는 기준을 다룹니다.

## 이 카테고리의 질문

서버 상태와 API 흐름을 어떻게 다룰 것인가

## 언제 이 카테고리로 들어오는가

- 컴포넌트가 fetch URL, loading, error, mapping을 모두 알고 있을 때
- mutation 이후 어떤 목록/상세가 갱신되어야 하는지 불명확할 때
- 서버 응답 구조가 UI props까지 흘러들어올 때
- 로딩과 에러 경계가 화면 곳곳에 흩어져 있을 때

## 먼저 판단할 순서

1. 조회는 query hook으로 감싸고 query key를 명확히 합니다.
2. 쓰기는 mutation hook으로 분리하고 성공/실패 정책을 정합니다.
3. 쓰기 이후에는 invalidation, 직접 cache update, optimistic update 중 하나를 선택합니다.
4. 서버 응답은 adapter에서 UI 모델로 변환합니다.
5. 로딩/에러 경계는 request status model, ErrorBoundary, Suspense와 함께 설계합니다.

## 빠른 선택 가이드

| 찾고 있는 문제 | 먼저 볼 패턴 | 영문명 |
| --- | --- | --- |
| 조회 요청을 전용 훅으로 감싸 화면에서 요청 세부사항을 숨깁니다. | [조회 훅 패턴](./query-hook-pattern/README.md) | Query Hook Pattern |
| 쓰기 요청을 명령형 mutation 훅으로 분리합니다. | [mutation 훅 패턴](./mutation-hook-pattern/README.md) | Mutation Hook Pattern |
| 쓰기 이후 영향을 받는 조회 캐시를 명시적으로 stale 처리합니다. | [캐시 무효화](./cache-invalidation/README.md) | Cache Invalidation |
| 서버 응답 전에 캐시를 먼저 갱신하고 실패 시 롤백합니다. | [낙관적 업데이트](./optimistic-update/README.md) | Optimistic Update |
| 페이지 번호와 pageSize 기준으로 목록 조회 상태를 관리합니다. | [페이지네이션](./pagination/README.md) | Pagination |
| 커서나 페이지 묶음을 누적해 무한 스크롤 목록을 만듭니다. | [무한 조회](./infinite-query/README.md) | Infinite Query |
| 서버 응답 구조를 React UI 모델로 변환합니다. | [API 어댑터](./api-adapter/README.md) | API Adapter |
| 요청 상태를 여러 boolean 대신 명시적 union으로 표현합니다. | [요청 상태 모델](./request-status-model/README.md) | Request Status Model |
| 렌더링 중 발생한 오류를 화면 경계에서 잡아 대체 UI를 보여줍니다. | [에러 경계](./error-boundary/README.md) | Error Boundary |
| 비동기 로딩 경계를 선언적으로 나누고 fallback을 제공합니다. | [Suspense 경계](./suspense-boundary/README.md) | Suspense Boundary |

## 선택 신호

| 코드에서 보이는 신호 | 우선 검토할 패턴 |
| --- | --- |
| 조회 요청 반복 | 조회 훅 패턴 |
| 쓰기 요청과 pending/error 분리 | mutation 훅 패턴 |
| 쓰기 후 오래된 캐시가 남음 | 캐시 무효화 |
| 즉각적인 UI 피드백 필요 | 낙관적 업데이트 |
| 서버 응답 구조가 UI에 노출됨 | API 어댑터 |
| 요청 boolean이 꼬임 | 요청 상태 모델 |

## 패턴별 핵심 메모

- [조회 훅 패턴](./query-hook-pattern/README.md) (Query Hook Pattern): 컴포넌트 안에 fetch URL, 파라미터, 에러 처리가 직접 있으면 API가 바뀔 때 모든 컴포넌트를 수정해야 합니다. query hook으로 감싸면 API 계약 변경이 훅 하나를 수정하는 것으로 끝납니다. 핵심: 컴포넌트는 "어떻게 가져오는지" 몰라도 된다.
- [mutation 훅 패턴](./mutation-hook-pattern/README.md) (Mutation Hook Pattern): 폼 제출 핸들러에 fetch 로직, 에러 처리, 상태 업데이트가 모두 들어 있으면 컴포넌트가 비대해지고 재사용이 어렵습니다. mutation hook으로 분리하면 컴포넌트는 "무엇을 제출할지"만 결정합니다. 핵심: mutate() 함수를 컴포넌트에 제공한다.
- [캐시 무효화](./cache-invalidation/README.md) (Cache Invalidation): 상품을 삭제했는데 목록 화면이 여전히 삭제된 상품을 보여주면 사용자가 혼란스럽습니다. mutation 후 관련 query cache를 무효화하면 다음 조회 시 최신 데이터를 가져옵니다. 핵심: mutation onSuccess에서 관련 queryKey를 invalidate한다.
- [낙관적 업데이트](./optimistic-update/README.md) (Optimistic Update): 할 일 완료 체크처럼 빠른 피드백이 중요한 UI에서 서버 응답을 기다리면 인터랙션이 느리게 느껴집니다. cache를 먼저 갱신하면 응답 전에도 UI가 반영되고, 실패 시 이전 캐시로 복원합니다. 핵심: onMutate에서 캐시를 먼저 업데이트하고 이전 값을 저장한다.
- [페이지네이션](./pagination/README.md) (Pagination): 모든 데이터를 한 번에 가져오면 초기 로딩이 오래 걸리고 서버 부하가 큽니다. 페이지 단위로 나누면 첫 화면이 빠르고 사용자가 필요한 만큼만 데이터를 불러옵니다. 핵심: 현재 page와 pageSize를 상태로 관리한다.
- [무한 조회](./infinite-query/README.md) (Infinite Query): SNS 피드처럼 "더 보기"나 무한 스크롤을 구현할 때 이전 데이터를 유지하면서 새 페이지를 누적해야 합니다. 일반 페이지네이션은 페이지 전환 시 이전 데이터를 버립니다. 핵심: 페이지 데이터를 배열로 누적 관리한다.
- [API 어댑터](./api-adapter/README.md) (API Adapter): 서버 응답의 snake_case, 중첩 구조, 불필요한 필드가 컴포넌트 props까지 흘러들어오면 서버 스키마 변경이 UI 전체에 영향을 줍니다. adapter에서 한 번 변환하면 UI는 서버 구조와 독립됩니다. 핵심: 서버 타입과 UI 타입을 분리한다.
- [요청 상태 모델](./request-status-model/README.md) (Request Status Model): isLoading, isSuccess, isError를 각각 boolean으로 가지면 isLoading && isSuccess가 동시에 true인 불가능한 상태가 생깁니다. union type으로 모델링하면 한 시점에 하나의 상태만 가능합니다. 핵심: 'idle' | 'loading' | 'success' | 'error' union이 불가능한 상태를 차단한다.
- [에러 경계](./error-boundary/README.md) (Error Boundary): 컴포넌트에서 throw된 에러가 잡히지 않으면 앱 전체가 빈 화면이 됩니다. ErrorBoundary는 해당 구역의 에러를 격리해 나머지 화면은 정상 동작하게 하고 대체 UI를 보여줍니다. 핵심: class 컴포넌트로만 구현 가능하지만 래퍼로 쉽게 쓸 수 있다.
- [Suspense 경계](./suspense-boundary/README.md) (Suspense Boundary): isLoading을 모든 컴포넌트에서 직접 처리하면 로딩 분기가 JSX 곳곳에 흩어집니다. Suspense는 "이 영역이 준비되면 보여준다"는 의도를 JSX 구조로 선언해 로딩 관심사를 상위로 올립니다. 핵심: 로딩 상태 분기를 JSX가 아닌 Suspense 경계로 처리한다.

## 코드 리뷰 질문

- query key가 필터, 페이지, 상세 id를 안정적으로 포함하는가?
- mutation 성공 후 영향을 받는 query 목록이 명시되어 있는가?
- 실패 시 rollback, retry, inline error 중 어떤 복구 경로를 쓰는가?
- 컴포넌트가 서버 응답의 raw shape를 직접 읽지 않는가?

## 같이 볼 카테고리

- [상태 관리](../state-management/README.md): 서버 상태와 클라이언트 상태 소유권을 나눌 때
- [UI 상태 표현](../ui-state/README.md): loading/empty/error/pending 표시를 설계할 때
- [폼과 검증](../forms/README.md): submit mutation과 서버 validation 오류를 연결할 때

## 읽는 순서

1. 빠른 선택 가이드에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. React 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 코드 리뷰 질문으로 실제 코드에 적용할 수 있는지 확인합니다.
5. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.

## 참고 자료

- [TanStack Query: Query Keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- [TanStack Query: Invalidations from Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations)
- [TanStack Query: Optimistic Updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
