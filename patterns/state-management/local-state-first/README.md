# 가까운 상태 우선

영문명: Local State First
폴더: `state-management/local-state-first`

## 한 줄 요약

상태는 가장 작은 소유 범위에서 시작하고 필요할 때만 올립니다.

## 패턴 형태

- 분류: 상태 관리
- 형태: State Ownership / State Model
- 핵심 질문: 이 값의 단일 출처와 수명은 어디인가

## 왜 필요한가

처음부터 모든 상태를 전역 store에 넣으면 단순한 토글 하나도 전역 액션이 됩니다. 상태를 가장 필요한 컴포넌트 가까이에 두면 의존관계가 줄고, 해당 컴포넌트를 삭제할 때 상태도 함께 사라집니다.

React 공식 문서는 상태 구조를 잡을 때 모순되는 상태, 중복 상태, 파생 상태를 줄이라고 설명합니다. 따라서 이 카테고리의 핵심은 “값을 어디에 둘까”보다 “어떤 값만 저장해야 동기화 비용이 줄어드는가”입니다.

## 핵심 원리

- 전역화는 항상 마지막 수단이다
- 지역 상태는 컴포넌트와 함께 태어나고 함께 사라진다
- 여러 형제가 공유할 때만 부모로 올린다

## 언제 사용하는가

- 상태를 한 컴포넌트나 가까운 하위 트리만 사용할 때
- 전역 store 도입 이유가 명확하지 않을 때
- 실험 중인 UI 상태를 빠르게 만들 때

## 언제 피해야 하는가

- 여러 라우트가 같은 상태를 동시에 읽고 써야 할 때
- URL이나 서버 캐시가 더 적절한 소유자인 경우

## 어떻게 사용하는가

1. useState로 지역 상태를 둔다
2. 공유 필요가 확인되면 가까운 공통 부모로 올린다
3. 전역화는 사용 범위와 지속성 요구가 생긴 뒤 결정한다

## 기본 코드 형태

```tsx
const [value, setValue] = useState(initialValue);

return <Child value={value} onChange={setValue} />;
```

## 실무 판단 기준

- 상태를 처음 만들 때는 가장 작은 소유 컴포넌트에 둡니다.
- 다른 형제나 페이지가 실제로 같은 값을 읽고 바꿔야 할 때만 부모나 store로 올립니다.
- 모달 open 여부, 임시 입력값, hover/selection처럼 화면과 함께 사라져도 되는 값은 local state가 기본입니다.
- 전역 store로 올릴 때는 새 구독자, 새 수명, 새 테스트 경계가 생긴다는 비용을 함께 봅니다.

## 코드 리뷰 체크리스트

- 이 state를 읽는 컴포넌트가 실제로 몇 개인가?
- 컴포넌트가 unmount될 때 state도 사라지는 것이 자연스러운가?
- 전역 store로 올린 이유가 “나중에 쓸 수도 있음”이 아니라 현재 요구인가?
- local state로 두면 prop 전달이 과도해지는 지점이 실제로 있는가?

## 흔한 실수

- 나중에 쓸 수 있다는 이유로 전역 store에 먼저 올립니다.
- 한 화면의 drawer, modal, form draft까지 앱 store에 넣어 화면 간 의존성을 만듭니다.
- local state로 충분한 값을 URL이나 server cache와 같은 수명으로 취급합니다.
- 상태를 위로 올린 뒤 중간 컴포넌트들이 의미 없는 prop 전달만 하게 됩니다.

## 테스트와 검증 포인트

- 해당 컴포넌트를 닫거나 페이지를 떠났을 때 state가 초기화되는 것이 맞는지 확인합니다.
- 같은 컴포넌트를 두 개 렌더했을 때 각각 독립 상태를 가져야 하는지 확인합니다.
- 부모 리렌더와 무관하게 local state가 필요한 범위에서만 바뀌는지 봅니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 부모가 각 항목의 열림 상태를 모두 기억하면서 항목 추가/삭제에 취약해지는 흐름을 봅니다.
- `Example.tsx`에서는 각 항목이 자기 open state를 소유해 부모가 목록 데이터에만 집중하는지 확인합니다.
- 실제 리뷰에서는 “공유가 필요해서 올렸는가, 불안해서 올렸는가”를 먼저 묻습니다.

## 관련 패턴

- [State Colocation](../state-colocation/README.md)
- [Lifting State Up](../lifting-state-up/README.md)

## 참고 자료

- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
