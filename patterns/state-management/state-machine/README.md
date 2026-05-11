# 상태 머신

영문명: State Machine
폴더: `state-management/state-machine`

## 한 줄 요약

허용 가능한 상태와 전이만 명시해 복잡한 UI 흐름을 안정화합니다.

## 패턴 형태

- 분류: 상태 관리
- 형태: State Ownership / State Model
- 핵심 질문: 이 값의 단일 출처와 수명은 어디인가

## 왜 필요한가

isLoading, isSuccess, isError, isRetrying를 동시에 boolean으로 관리하면 isLoading && isError가 동시에 true가 되는 불가능한 상태가 생깁니다. 상태 머신은 한 번에 하나의 상태만 허용해 이런 버그를 원천적으로 막습니다.

React 공식 문서는 상태 구조를 잡을 때 모순되는 상태, 중복 상태, 파생 상태를 줄이라고 설명합니다. 따라서 이 카테고리의 핵심은 “값을 어디에 둘까”보다 “어떤 값만 저장해야 동기화 비용이 줄어드는가”입니다.

## 핵심 원리

- 불가능한 상태 조합이 타입 수준에서 차단된다
- 허용된 전이만 가능하므로 예상치 못한 상태 변화가 없다
- XState, 단순 union type 모두 같은 원리를 적용한다

## 언제 사용하는가

- 폼 제출, 결제, 인증처럼 단계와 전이가 명확할 때
- 불가능한 상태 조합을 막고 싶을 때
- 이벤트 기반으로 화면 흐름을 리뷰하고 싶을 때

## 언제 피해야 하는가

- 상태가 두세 개뿐인 단순 토글
- 전이표가 실제 문제보다 복잡해질 때

## 어떻게 사용하는가

1. 상태 목록을 먼저 정의한다
2. 각 상태에서 받을 수 있는 이벤트를 정한다
3. 전이 외의 상태 변경을 금지한다

## 기본 코드 형태

```ts
type Status = 'idle' | 'loading' | 'success' | 'error';
const transitions: Record<Status, Status[]> = {
  idle: ['loading'],
  loading: ['success', 'error'],
  success: ['loading'],
  error: ['loading'],
};
```

## 실무 판단 기준

- 값을 읽고 바꾸는 컴포넌트가 적으면 가까운 local state에서 시작합니다.
- 둘 이상의 형제가 같은 값을 함께 바꾸면 가장 가까운 공통 부모로 올립니다.
- 서버에서 온 데이터, URL로 복원되어야 하는 값, 외부 store 값은 각각 다른 수명과 소유권으로 봅니다.
- 계산 가능한 값은 state로 저장하지 않고 렌더 중 계산합니다. 계산이 실제로 무거울 때만 memoization을 추가합니다.

## 코드 리뷰 체크리스트

- 상태의 단일 출처가 한 곳으로 설명되는가?
- 불가능한 상태 조합이 boolean 여러 개로 열려 있지 않은가?
- state를 올린 이유가 실제 공유 요구인지, 막연한 재사용 가능성인지 구분했는가?
- 서버 상태와 UI 제어 상태의 갱신 주기가 섞이지 않았는가?

## 흔한 실수

- 나중에 쓸 수 있다는 이유로 전역 store에 먼저 올립니다.
- props나 기존 state에서 계산할 수 있는 값을 별도 state와 effect로 동기화합니다.
- 객체 전체를 선택 상태로 저장해 원본 목록과 서로 다른 값을 만듭니다.

## 테스트와 검증 포인트

- 값을 바꾸는 사용자 흐름을 하나씩 따라가며 어떤 state가 바뀌는지 확인합니다.
- 리스트 추가/삭제/정렬, 탭 전환, URL 새로고침처럼 상태 보존과 초기화가 갈리는 케이스를 확인합니다.
- TypeScript union 또는 reducer를 쓰는 경우 exhaustive check로 빠진 전이가 없는지 봅니다.

## 예제 읽는 법

- `BadCase.tsx`에서 책임이 어디에 섞여 있는지 먼저 봅니다.
- `Example.tsx`에서 호출부 API, 상태 소유권, 변경 범위가 어떻게 줄었는지 비교합니다.
- 문서의 체크리스트를 기준으로 같은 패턴을 실제 코드 리뷰에 적용할 수 있는지 확인합니다.

## 관련 패턴

- [Request Status Model](../../async-api/request-status-model/README.md)
- [Reducer Pattern](../reducer-pattern/README.md)

## 참고 자료

- [XState: Introduction](https://stately.ai/docs)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
