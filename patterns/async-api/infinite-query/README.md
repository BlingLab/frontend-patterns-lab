# 무한 조회

영문명: Infinite Query
폴더: `async-api/infinite-query`

## 한 줄 요약

커서나 페이지 묶음을 누적해 무한 스크롤 목록을 만듭니다.

## 패턴 형태

- 분류: 비동기와 API 상태
- 형태: Server State / Query / Mutation / Boundary
- 핵심 질문: 원격 데이터의 생명주기와 실패 복구를 어디서 관리할 것인가

## 왜 필요한가

SNS 피드처럼 "더 보기"나 무한 스크롤을 구현할 때 이전 데이터를 유지하면서 새 페이지를 누적해야 합니다. 일반 페이지네이션은 페이지 전환 시 이전 데이터를 버립니다.

서버 상태는 클라이언트가 소유한 값이 아니라 원격 원본의 캐시입니다. TanStack Query는 query key로 캐시를 식별하고, mutation 이후 관련 query를 invalidate하거나 optimistic update로 먼저 반영한 뒤 실패 시 되돌리는 흐름을 제공합니다.

## 핵심 원리

- 페이지 데이터를 배열로 누적 관리한다
- 마지막 페이지의 커서로 다음 요청을 보낸다
- IntersectionObserver로 스크롤 끝 감지를 자동화한다

## 언제 사용하는가

- 뉴스피드, 알림, 검색 탐색처럼 계속 이어보는 UX
- 커서 기반 API를 사용할 때
- 이전 페이지 데이터를 유지한 채 다음 묶음을 붙여야 할 때

## 언제 피해야 하는가

- 정확한 페이지 이동과 총 페이지 수가 중요한 관리자 화면
- 목록 순서가 자주 바뀌어 커서 정합성이 어려울 때

## 어떻게 사용하는가

1. pages 배열로 응답을 누적한다
2. nextCursor 존재 여부를 관리한다
3. 관찰자나 버튼으로 다음 페이지를 요청한다

## 기본 코드 형태

```tsx
const query = useInfiniteQuery({
  queryKey: ['feed'],
  queryFn: ({ pageParam }) => fetchFeed(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});
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

- [Pagination](../pagination/README.md)
- [List Rendering](../../performance-rendering/list-rendering/README.md)

## 참고 자료

- [TanStack Query: Infinite Queries](https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries)
- [TanStack Query: Query Keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- [TanStack Query: Invalidations from Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations)
- [TanStack Query: Optimistic Updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
