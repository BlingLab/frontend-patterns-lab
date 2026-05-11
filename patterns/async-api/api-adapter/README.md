# API 어댑터

영문명: API Adapter
폴더: `async-api/api-adapter`

## 한 줄 요약

서버 응답 구조를 React UI 모델로 변환합니다.

## 패턴 형태

- 분류: 비동기와 API 상태
- 형태: Server State / Query / Mutation / Boundary
- 핵심 질문: 원격 데이터의 생명주기와 실패 복구를 어디서 관리할 것인가

## 왜 필요한가

서버 응답의 snake_case, 중첩 구조, 불필요한 필드가 컴포넌트 props까지 흘러들어오면 서버 스키마 변경이 UI 전체에 영향을 줍니다. adapter에서 한 번 변환하면 UI는 서버 구조와 독립됩니다.

서버 상태는 클라이언트가 소유한 값이 아니라 원격 원본의 캐시입니다. TanStack Query는 query key로 캐시를 식별하고, mutation 이후 관련 query를 invalidate하거나 optimistic update로 먼저 반영한 뒤 실패 시 되돌리는 흐름을 제공합니다.

## 핵심 원리

- 서버 타입과 UI 타입을 분리한다
- adapter 함수는 순수함수로 테스트하기 쉽다
- 서버 스키마가 바뀌어도 adapter만 수정하면 된다

## 언제 사용하는가

- 백엔드 응답이 화면 용어와 다를 때
- 여러 API 버전을 UI에서 하나의 모델로 보고 싶을 때
- 테스트용 mock과 실제 API 모델을 분리하고 싶을 때

## 언제 피해야 하는가

- 응답 모델과 UI 모델이 거의 같고 변환 비용만 생길 때
- 도메인 계층이 따로 있어 중복 adapter가 되는 경우

## 어떻게 사용하는가

1. API type과 UI type을 분리한다
2. adapter 함수에서 rename, format, default를 처리한다
3. 컴포넌트는 UI model만 받는다

## 기본 코드 형태

```ts
function adaptUser(response: ApiUser): UserViewModel {
  return {
    id: String(response.id),
    name: response.profile.name,
    email: response.email_address,
  };
}
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

- 좋은 예는 `adaptUsers`가 서버 응답을 `UserViewModel`로 바꾼 뒤 화면이 표시 모델만 사용합니다.
- 나쁜 예는 컴포넌트가 `email_address`, `profile.department_name`, `flags.email_verified` 같은 API 세부 구조를 직접 압니다.
- 날짜 포맷, status label, badge 색상처럼 표시 정책이 여러 화면에서 필요하면 adapter나 view model 계층으로 올립니다.

## 예제 읽는 법

- `BadCase.tsx`에서 책임이 어디에 섞여 있는지 먼저 봅니다.
- `Example.tsx`에서 호출부 API, 상태 소유권, 변경 범위가 어떻게 줄었는지 비교합니다.
- 문서의 체크리스트를 기준으로 같은 패턴을 실제 코드 리뷰에 적용할 수 있는지 확인합니다.

## 관련 패턴

- [API Response Leaking to UI](../../anti-patterns/api-response-leaking-to-ui/README.md)
- [Query Hook Pattern](../query-hook-pattern/README.md)

## 참고 자료

- [TanStack Query: Query Keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- [TanStack Query: Invalidations from Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations)
- [TanStack Query: Optimistic Updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
