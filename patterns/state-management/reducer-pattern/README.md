# reducer 패턴

영문명: Reducer Pattern
폴더: `state-management/reducer-pattern`

## 한 줄 요약

복잡한 상태 전이를 action과 reducer로 한 곳에 모읍니다.

## 패턴 형태

- 분류: 상태 관리
- 형태: State Ownership / State Model
- 핵심 질문: 이 값의 단일 출처와 수명은 어디인가

## 왜 필요한가

상태 필드가 많고 여러 이벤트가 여러 필드를 함께 바꾸면, 흩어진 setState들이 어떤 이벤트에 어떤 상태 변화를 만드는지 추적하기 어렵습니다. reducer는 "이 액션 → 이 상태"를 한 함수 안에서 명확히 보여줍니다.

React 공식 문서는 상태 구조를 잡을 때 모순되는 상태, 중복 상태, 파생 상태를 줄이라고 설명합니다. 따라서 이 카테고리의 핵심은 “값을 어디에 둘까”보다 “어떤 값만 저장해야 동기화 비용이 줄어드는가”입니다.

## 핵심 원리

- 상태 전이 로직을 컴포넌트 밖에서 순수하게 테스트할 수 있다
- action type으로 이벤트 의도를 명시한다
- undo/redo, 이력 추적을 구현하기 좋다

## 언제 사용하는가

- 상태 필드가 여러 개이고 함께 바뀔 때
- 업데이트 규칙을 테스트하고 싶을 때
- undo, reset, validation 같은 명령이 많아질 때

## 언제 피해야 하는가

- 단일 boolean이나 간단한 입력 state
- reducer가 비동기와 side effect까지 떠안는 경우

## 어떻게 사용하는가

1. state shape와 action union을 정의한다
2. 순수 reducer로 다음 상태를 반환한다
3. 컴포넌트는 dispatch만 호출한다

## 기본 코드 형태

```tsx
const [state, dispatch] = useReducer(reducer, initialState);

dispatch({ type: 'submitted' });
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

- [State Machine](../state-machine/README.md)
- [Request Status Model](../../async-api/request-status-model/README.md)

## 참고 자료

- [React: Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
