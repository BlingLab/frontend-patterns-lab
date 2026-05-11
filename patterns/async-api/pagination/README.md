# 페이지네이션

영문명: Pagination
폴더: `async-api/pagination`

## 한 줄 요약

페이지 번호와 pageSize 기준으로 목록 조회 상태를 관리합니다.

## 패턴 형태

- 분류: 비동기와 API 상태
- 형태: Server State / Query / Mutation / Boundary
- 핵심 질문: 원격 데이터의 생명주기와 실패 복구를 어디서 관리할 것인가

## 왜 필요한가

모든 데이터를 한 번에 가져오면 초기 로딩이 오래 걸리고 서버 부하가 큽니다. 페이지 단위로 나누면 첫 화면이 빠르고 사용자가 필요한 만큼만 데이터를 불러옵니다.

서버 상태는 클라이언트가 소유한 값이 아니라 원격 원본의 캐시입니다. TanStack Query는 query key로 캐시를 식별하고, mutation 이후 관련 query를 invalidate하거나 optimistic update로 먼저 반영한 뒤 실패 시 되돌리는 흐름을 제공합니다.

## 핵심 원리

- 현재 page와 pageSize를 상태로 관리한다
- page가 바뀔 때 새 데이터를 요청한다
- 전체 개수(total)로 페이지 수를 계산한다

## 언제 사용하는가

- 관리자 테이블, 검색 결과처럼 특정 페이지로 이동해야 할 때
- 총 개수와 페이지 번호가 UX에 중요할 때
- URL state와 함께 공유 가능한 목록을 만들 때

## 언제 피해야 하는가

- 사용자가 자연스럽게 이어서 소비하는 피드
- 전체 데이터가 작아 페이지 분리가 불필요할 때

## 어떻게 사용하는가

1. page와 pageSize를 상태나 URL에 둔다
2. query key에 페이지 조건을 포함한다
3. 이전/다음/빈 페이지 상태를 처리한다

## 기본 코드 형태

```tsx
const [page, setPage] = useState(1);
const query = useQuery({
  queryKey: ['users', { page }],
  queryFn: () => fetchUsersPage(page),
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

- [URL State](../../state-management/url-state/README.md)
- [Infinite Query](../infinite-query/README.md)

## 참고 자료

- [TanStack Query: Paginated Queries](https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries)
- [TanStack Query: Query Keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- [TanStack Query: Invalidations from Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations)
- [TanStack Query: Optimistic Updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
