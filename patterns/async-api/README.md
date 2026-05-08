# Async API

API 호출, 캐시, mutation, 페이지네이션, 에러 경계를 다루는 패턴입니다.

## 이 카테고리의 질문

서버 상태와 API 흐름을 어떻게 다룰 것인가

## 언제 이 카테고리로 들어오는가

- 서버 데이터의 로딩/에러/성공 상태가 화면에 영향을 준다
- 캐시와 무효화 기준이 필요하다
- API 응답 모델과 UI 모델을 분리해야 한다

## 빠른 선택 가이드

| 찾고 있는 문제 | 먼저 볼 패턴 | 패턴 형태 |
| --- | --- | --- |
| 조회 요청을 전용 훅으로 감싸 화면에서 요청 세부사항을 숨깁니다. | [Query Hook Pattern](./query-hook-pattern/README.md) | Query Hook |
| 쓰기 요청을 명령형 mutation 훅으로 분리합니다. | [Mutation Hook Pattern](./mutation-hook-pattern/README.md) | Mutation Hook |
| 쓰기 이후 영향을 받는 조회 캐시를 명시적으로 stale 처리합니다. | [Cache Invalidation](./cache-invalidation/README.md) | Cache Policy |
| 서버 응답 전에 캐시를 먼저 갱신하고 실패 시 롤백합니다. | [Optimistic Update](./optimistic-update/README.md) | Optimistic Cache |
| 페이지 번호와 pageSize 기준으로 목록 조회 상태를 관리합니다. | [Pagination](./pagination/README.md) | Paged Query |
| 커서나 페이지 묶음을 누적해 무한 스크롤 목록을 만듭니다. | [Infinite Query](./infinite-query/README.md) | Infinite Query |
| 서버 응답 구조를 UI 모델로 변환합니다. | [API Adapter](./api-adapter/README.md) | Adapter |
| 요청 상태를 여러 boolean 대신 하나의 명시적 union으로 표현합니다. | [Request Status Model](./request-status-model/README.md) | Discriminated State |
| 렌더링 중 발생한 오류를 경계에서 잡아 대체 UI를 보여줍니다. | [Error Boundary](./error-boundary/README.md) | Render Error Boundary |
| 비동기 로딩 경계를 선언적으로 나누고 fallback을 제공합니다. | [Suspense Boundary](./suspense-boundary/README.md) | Async Boundary |

## 읽는 순서

1. 위 표에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.

## 참고 자료

- [TanStack Query: Overview](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React: Conditional rendering](https://react.dev/learn/conditional-rendering)
