# 비동기와 API 상태

영문명: Async API

React 화면에서 서버 상태, API 요청, 캐시, mutation, pagination, Suspense/Error Boundary를 다루는 방식을 정리합니다.

## 이 카테고리의 질문

서버 상태와 API 흐름을 어떻게 다룰 것인가

## 언제 이 카테고리로 들어오는가

- API 조회와 mutation 흐름이 화면마다 반복된다
- 캐시 무효화, 낙관적 업데이트, 요청 상태 모델이 필요하다
- 서버 응답 구조가 UI까지 새어 나온다

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

## 읽는 순서

1. 위 표에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. React 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.
