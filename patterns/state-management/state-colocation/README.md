# 상태 위치 맞추기

영문명: State Colocation
폴더: `state-management/state-colocation`

## 한 줄 요약

상태를 실제로 읽고 바꾸는 코드 가까이에 둡니다.

## 패턴 형태

- 분류: 상태 관리
- 형태: State Ownership / State Model
- 핵심 질문: 이 값의 단일 출처와 수명은 어디인가

## 왜 필요한가

상태가 실제 사용 위치보다 위에 있으면, 그 사이의 모든 컴포넌트가 불필요한 리렌더를 겪습니다. 상태를 내려보내거나 올리는 게 아니라 "정확히 필요한 위치"에 배치하는 것이 핵심입니다.

React 공식 문서는 상태 구조를 잡을 때 모순되는 상태, 중복 상태, 파생 상태를 줄이라고 설명합니다. 따라서 이 카테고리의 핵심은 “값을 어디에 둘까”보다 “어떤 값만 저장해야 동기화 비용이 줄어드는가”입니다.

## 핵심 원리

- 상태 소유자가 변경되면 그 하위 트리만 리렌더된다
- 너무 높이 올린 상태는 불필요한 props와 리렌더를 만든다
- Colocation을 적용하면 컴포넌트 독립성이 높아진다

## 언제 사용하는가

- 상태 변경이 특정 UI 조각에만 영향을 줄 때
- 부모가 상태를 알 필요가 없을 때
- 리렌더 범위를 줄이고 싶을 때

## 언제 피해야 하는가

- 형제 컴포넌트가 같은 값을 동기화해야 할 때
- 상태를 URL이나 서버에 반영해야 할 때

## 어떻게 사용하는가

1. 상태 소비자를 확인한다
2. 소비자가 하나면 그 컴포넌트에 둔다
3. 소비자가 늘어나면 가장 가까운 공통 부모로 이동한다

## 기본 코드 형태

```tsx
const [value, setValue] = useState(initialValue);

return <Child value={value} onChange={setValue} />;
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

- [Local State First](../local-state-first/README.md)
- [Component Splitting](../../performance-rendering/component-splitting/README.md)

## 참고 자료

- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
