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

- [State Colocation](../state-colocation/README.md)
- [Lifting State Up](../lifting-state-up/README.md)

## 참고 자료

- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
