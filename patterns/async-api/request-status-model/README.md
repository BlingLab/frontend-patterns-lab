# 요청 상태 모델

영문명: Request Status Model
폴더: `async-api/request-status-model`

## 한 줄 요약

요청 상태를 여러 boolean 대신 명시적 union으로 표현합니다.

## 패턴 형태

- 분류: 비동기와 API 상태
- 형태: Server State / Query / Mutation / Boundary
- 핵심 질문: 원격 데이터의 생명주기와 실패 복구를 어디서 관리할 것인가

## 왜 필요한가

isLoading, isSuccess, isError를 각각 boolean으로 가지면 isLoading && isSuccess가 동시에 true인 불가능한 상태가 생깁니다. union type으로 모델링하면 한 시점에 하나의 상태만 가능합니다.

서버 상태는 클라이언트가 소유한 값이 아니라 원격 원본의 캐시입니다. TanStack Query는 query key로 캐시를 식별하고, mutation 이후 관련 query를 invalidate하거나 optimistic update로 먼저 반영한 뒤 실패 시 되돌리는 흐름을 제공합니다.

## 핵심 원리

- 'idle' | 'loading' | 'success' | 'error' union이 불가능한 상태를 차단한다
- 타입스크립트 exhaustive check로 모든 케이스를 처리했는지 확인할 수 있다
- 렌더링 분기가 switch/if로 명확해진다

## 언제 사용하는가

- 요청 상태 분기가 복잡할 때
- 타입으로 불가능한 조합을 막고 싶을 때
- loading/empty/error/success 화면을 일관되게 처리할 때

## 언제 피해야 하는가

- 단순 로딩 boolean 하나로 충분한 경우
- 서버 상태 라이브러리가 이미 상태 모델을 제공할 때

## 어떻게 사용하는가

1. idle/loading/success/error union을 정의한다
2. 각 상태에 필요한 데이터만 담는다
3. switch로 화면을 분기한다

## 기본 코드 형태

```ts
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
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

## 예제에서 확인할 것

- 좋은 예는 `status` union 하나가 요청 상태를 대표하고, `success`일 때만 `data`에 접근합니다.
- 나쁜 예는 `isLoading`, `isSuccess`, `isError`가 동시에 true인 불가능한 상태를 만들 수 있습니다.
- 요청 상태가 늘어날수록 boolean 조합보다 `idle | loading | success | error` 같은 명시적 상태 모델이 리뷰와 테스트에 유리합니다.

## 예제 읽는 법

- `BadCase.tsx`에서 책임이 어디에 섞여 있는지 먼저 봅니다.
- `Example.tsx`에서 호출부 API, 상태 소유권, 변경 범위가 어떻게 줄었는지 비교합니다.
- 문서의 체크리스트를 기준으로 같은 패턴을 실제 코드 리뷰에 적용할 수 있는지 확인합니다.

## 관련 패턴

- [Loading / Empty / Error](../../ui-state/loading-empty-error/README.md)
- [State Machine](../../state-management/state-machine/README.md)

## 참고 자료

- [TanStack Query: Query Keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- [TanStack Query: Invalidations from Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations)
- [TanStack Query: Optimistic Updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
