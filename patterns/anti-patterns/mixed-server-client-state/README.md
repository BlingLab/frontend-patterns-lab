# 서버/클라이언트 상태 혼합

영문명: Mixed Server / Client State
폴더: `anti-patterns/mixed-server-client-state`

## 한 줄 요약

서버 상태와 클라이언트 UI 상태의 소유권을 섞는 문제를 피합니다.

## 패턴 형태

- 분류: 안티패턴
- 형태: 문제 징후 / 리팩터링 가이드
- 핵심 질문: 지금 보이는 코드 냄새가 실제 버그와 변경 비용으로 이어지는가

## 왜 필요한가

서버 데이터(users 배열)와 UI 상태(selectedUserId)를 같은 Zustand store에 넣으면, users를 refetch할 때 selectedUserId가 리셋되거나, 반대로 캐시 무효화 로직이 복잡해집니다.

안티패턴은 금지 목록이 아니라 리팩터링 신호입니다. React 공식 문서의 상태 구조 원칙, effect 사용 기준, key/state 보존 규칙을 기준으로 “왜 처음에는 편해 보였고, 어떤 변경에서 깨지는지”까지 설명해야 팀 리뷰에서 설득력이 생깁니다.

## 핵심 원리

- 서버 상태는 TanStack Query, SWR처럼 캐시를 전담하는 도구에 맡긴다
- UI 상태(선택, 열림/닫힘)는 local state나 store에서 별도로 관리한다
- 두 종류의 상태가 같은 업데이트 주기를 갖는 경우는 드물다

## 언제 사용하는가

- API 응답을 전역 UI store에 복사하는 경우
- 서버 재검증과 로컬 편집 상태가 섞인 경우
- 캐시 무효화 기준이 불분명한 경우

## 언제 피해야 하는가

- 오프라인 편집처럼 의도적으로 local draft가 필요한 경우
- 작은 앱에서 별도 캐시 도구가 과한 경우

## 어떻게 사용하는가

1. 상태 소유자를 분류한다
2. 서버 데이터는 query/cache 계층에 둔다
3. UI 상태는 가까운 React state에 둔다

## 기본 코드 형태

```tsx
const usersQuery = useUsersQuery();
const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
```

## 실무 판단 기준

- 서버 상태는 원격 원본, stale/fresh, refetch, cache invalidation의 수명을 가집니다.
- 클라이언트 상태는 선택, 정렬, 모달 open, 입력 draft처럼 화면 조작의 수명을 가집니다.
- 서버 데이터를 refetch할 때 UI 선택이 반드시 초기화되어야 하는지 별도로 판단합니다.
- 로컬 draft가 필요한 경우에는 서버 데이터와 draft를 명시적으로 분리하고 저장/취소 경계를 둡니다.

## 코드 리뷰 체크리스트

- API 응답 배열을 UI store에 복사해 캐시처럼 쓰고 있지 않은가?
- refetch, invalidate, optimistic update가 UI 선택 상태까지 건드리지 않는가?
- selected id, modal open, filter 같은 UI 상태가 서버 데이터와 같은 액션에서 함께 리셋되지 않는가?
- query key와 UI state key가 서로 다른 변경 주기를 갖는다는 점이 코드에서 드러나는가?

## 흔한 실수

- 서버 목록을 Zustand store에 넣고 직접 갱신해 cache invalidation 기준을 잃습니다.
- refetch 액션에서 검색어, 선택 항목, 펼침 상태까지 함께 초기화합니다.
- 서버 응답 객체를 직접 수정해 optimistic UI와 실제 캐시의 차이를 추적하기 어렵게 만듭니다.

## 테스트와 검증 포인트

- refetch 후 사용자의 선택/필터가 유지되어야 하는지 초기화되어야 하는지 확인합니다.
- mutation 성공 후 서버 cache만 invalidation되고 UI state가 의도치 않게 바뀌지 않는지 봅니다.
- offline draft나 편집 중 상태는 저장/취소 시점에 서버 상태와 어떻게 합쳐지는지 검증합니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 서버 목록과 선택/검색 UI 상태가 같은 store와 같은 액션에 묶이는 흐름을 봅니다.
- `ImprovedCase.tsx`에서는 서버 데이터는 query/cache에, UI 선택은 local state에 남아 서로 다른 수명을 갖는지 확인합니다.
- 실제 코드에서는 query hook이 서버 상태를 반환하고 컴포넌트가 화면 제어 상태를 가까이 소유하게 두는 방식이 기본입니다.

## 관련 패턴

- [Server State vs Client State](../../state-management/server-state-vs-client-state/README.md)
- [Query Hook Pattern](../../async-api/query-hook-pattern/README.md)

## 참고 자료

- [TanStack Query: Overview](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
