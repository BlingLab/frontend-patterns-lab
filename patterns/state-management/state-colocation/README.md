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

- state는 “가장 가까운 곳”이 아니라 “실제로 읽고 바꾸는 가장 낮은 공통 소유자”에 둡니다.
- 자주 바뀌는 state가 큰 하위 트리를 리렌더한다면 사용 위치 가까이로 내릴 수 있는지 봅니다.
- parent가 state를 갖고 있지만 그 값을 직접 쓰지 않고 전달만 한다면 colocation 후보입니다.
- 계산 결과는 state 위치 문제가 아니라 derived value 문제이므로 별도 state로 올리지 않습니다.

## 코드 리뷰 체크리스트

- state를 가진 컴포넌트가 그 값을 직접 사용하거나 변경하는가?
- state 변경으로 영향받지 않아도 되는 형제 컴포넌트가 함께 리렌더되지 않는가?
- state를 내리면 prop drilling이 줄고 테스트 fixture가 작아지는가?
- 공유 요구가 생겼을 때 다시 끌어올릴 명확한 기준이 있는가?

## 흔한 실수

- 페이지 최상단에 모든 input state를 모아 타이핑마다 전체 페이지를 리렌더합니다.
- 단지 reset이 쉽다는 이유로 자식 고유 state를 부모가 모두 소유합니다.
- 성능 문제를 memo로 덮고 state 위치는 그대로 둡니다.

## 테스트와 검증 포인트

- 입력, 검색, 토글 같은 잦은 변경에서 불필요한 sibling 리렌더가 줄었는지 확인합니다.
- state를 내린 뒤에도 reset, submit, validation 같은 상위 흐름이 필요한 값을 받을 수 있는지 확인합니다.
- 컴포넌트 단위 테스트에서 더 작은 props로 같은 행동을 검증할 수 있는지 봅니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 검색어 state가 너무 위에 있어 무관한 영역까지 같이 렌더되는지 봅니다.
- `Example.tsx`에서는 검색 state가 실제 입력과 결과 목록 가까이에 있어 변경 범위가 작아지는지 확인합니다.
- 실제 코드에서는 먼저 state를 내리고, 그래도 느릴 때 memoization을 검토합니다.

## 관련 패턴

- [Local State First](../local-state-first/README.md)
- [Component Splitting](../../performance-rendering/component-splitting/README.md)

## 참고 자료

- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
