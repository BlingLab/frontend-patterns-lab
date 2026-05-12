# 상태 관리

영문명: State Management

상태 관리 카테고리는 store 선택보다 상태의 소유권, 수명, 단일 출처를 먼저 봅니다. React local state, 부모 state, URL, 서버 캐시, 외부 store는 서로 다른 문제를 해결합니다.

## 이 카테고리의 질문

상태를 어디에 두고 어떻게 흐르게 할 것인가

## 언제 이 카테고리로 들어오는가

- 같은 값이 여러 컴포넌트에 중복 저장될 때
- 어떤 값은 새로고침 후에도 살아야 하고 어떤 값은 화면을 벗어나면 사라져야 할 때
- boolean 상태가 늘어나 불가능한 조합이 생길 때
- 서버 데이터와 UI 선택 상태가 같은 store에 섞일 때

## 먼저 판단할 순서

1. 저장하지 않아도 되는 파생 상태인지 먼저 확인합니다.
2. 값을 실제로 읽고 바꾸는 가장 가까운 컴포넌트에 둡니다.
3. 둘 이상의 형제가 같은 값을 함께 바꾸면 가장 가까운 공통 부모로 올립니다.
4. 공유 범위가 URL, 서버 캐시, 외부 store인지 구분합니다.
5. 상태 전이가 복잡하면 reducer나 state machine으로 불가능한 상태를 줄입니다.

## 빠른 선택 가이드

| 찾고 있는 문제 | 먼저 볼 패턴 | 영문명 |
| --- | --- | --- |
| 상태는 가장 작은 소유 범위에서 시작하고 필요할 때만 올립니다. | [가까운 상태 우선](./local-state-first/README.md) | Local State First |
| 상태를 실제로 읽고 바꾸는 코드 가까이에 둡니다. | [상태 위치 맞추기](./state-colocation/README.md) | State Colocation |
| 여러 형제가 같은 상태를 필요로 할 때 가장 가까운 공통 부모로 올립니다. | [상태 끌어올리기](./lifting-state-up/README.md) | Lifting State Up |
| 저장하지 않아도 되는 값은 기존 상태에서 계산합니다. | [파생 상태](./derived-state/README.md) | Derived State |
| 복잡한 상태 전이를 action과 reducer로 한 곳에 모읍니다. | [reducer 패턴](./reducer-pattern/README.md) | Reducer Pattern |
| 공유와 복원이 필요한 필터, 검색어, 페이지 정보를 URL에 둡니다. | [URL 상태](./url-state/README.md) | URL State |
| 원격 데이터와 화면 제어 상태의 소유권을 분리합니다. | [서버 상태와 클라이언트 상태](./server-state-vs-client-state/README.md) | Server State vs Client State |
| 성공 가능성이 높은 액션은 먼저 UI를 바꾸고 실패 시 되돌립니다. | [낙관적 UI](./optimistic-ui/README.md) | Optimistic UI |
| 허용 가능한 상태와 전이만 명시해 복잡한 UI 흐름을 안정화합니다. | [상태 머신](./state-machine/README.md) | State Machine |
| React 밖의 store를 useSyncExternalStore로 안전하게 연결합니다. | [외부 store 연결](./external-store/README.md) | External Store |

## 선택 신호

| 코드에서 보이는 신호 | 우선 검토할 패턴 |
| --- | --- |
| 계산 가능한 값 | 파생 상태 |
| 한 컴포넌트 안에서만 쓰임 | 가까운 상태 우선 |
| 형제 컴포넌트가 함께 사용 | 상태 끌어올리기 |
| 공유/복원이 필요함 | URL 상태 |
| 원격 데이터임 | 서버 상태와 클라이언트 상태 |
| 상태 전이가 많고 제한이 필요함 | 상태 머신 |

## 패턴별 핵심 메모

- [가까운 상태 우선](./local-state-first/README.md) (Local State First): 처음부터 모든 상태를 전역 store에 넣으면 단순한 토글 하나도 전역 액션이 됩니다. 상태를 가장 필요한 컴포넌트 가까이에 두면 의존관계가 줄고, 해당 컴포넌트를 삭제할 때 상태도 함께 사라집니다. 핵심: 전역화는 항상 마지막 수단이다.
- [상태 위치 맞추기](./state-colocation/README.md) (State Colocation): 상태가 실제 사용 위치보다 위에 있으면, 그 사이의 모든 컴포넌트가 불필요한 리렌더를 겪습니다. 상태를 내려보내거나 올리는 게 아니라 "정확히 필요한 위치"에 배치하는 것이 핵심입니다. 핵심: 상태 소유자가 변경되면 그 하위 트리만 리렌더된다.
- [상태 끌어올리기](./lifting-state-up/README.md) (Lifting State Up): 두 형제 컴포넌트가 같은 데이터를 필요로 할 때 각자 useState를 만들면 동기화 문제가 생깁니다. 공통 부모로 상태를 올리면 단일 출처(single source of truth)가 생깁니다. 핵심: 형제 간 동기화 문제를 설계 차원에서 해결한다.
- [파생 상태](./derived-state/README.md) (Derived State): 장바구니 합계를 items 배열과 별도 total state로 관리하면, items가 바뀔 때 total도 동기화하는 effect가 필요합니다. 이 effect는 버그의 온상입니다. total을 items에서 계산하면 동기화 문제 자체가 없어집니다. 핵심: 저장 state 수를 줄이면 동기화 버그 가능성이 줄어든다.
- [reducer 패턴](./reducer-pattern/README.md) (Reducer Pattern): 상태 필드가 많고 여러 이벤트가 여러 필드를 함께 바꾸면, 흩어진 setState들이 어떤 이벤트에 어떤 상태 변화를 만드는지 추적하기 어렵습니다. reducer는 "이 액션 → 이 상태"를 한 함수 안에서 명확히 보여줍니다. 핵심: 상태 전이 로직을 컴포넌트 밖에서 순수하게 테스트할 수 있다.
- [URL 상태](./url-state/README.md) (URL State): 검색 필터를 useState에 두면 페이지를 새로고침하거나 링크를 공유할 때 필터 상태가 사라집니다. URL에 두면 링크 하나로 정확한 상태를 공유·북마크·복원할 수 있습니다. 핵심: 새로고침해도 상태가 유지된다.
- [서버 상태와 클라이언트 상태](./server-state-vs-client-state/README.md) (Server State vs Client State): 서버에서 받은 유저 목록과 "어떤 유저가 선택됐는가"를 같은 store에 섞으면, 서버 데이터를 다시 fetch할 때 UI 상태까지 초기화되거나 반대로 캐시 무효화가 복잡해집니다. 두 종류의 상태는 성격이 달라 분리해야 합니다. 핵심: 서버 상태: 원격 데이터, stale/fresh, 캐시 전략이 필요하다.
- [낙관적 UI](./optimistic-ui/README.md) (Optimistic UI): "좋아요" 버튼을 누를 때마다 서버 응답을 기다리면 인터랙션이 500ms씩 지연됩니다. 성공을 낙관적으로 가정하고 즉시 UI를 바꾸면 서버 왕복 지연을 체감하지 못하고, 실패 시에만 되돌리면 됩니다. 핵심: 성공률이 높고 롤백이 간단한 액션에 적합하다.
- [상태 머신](./state-machine/README.md) (State Machine): isLoading, isSuccess, isError, isRetrying를 동시에 boolean으로 관리하면 isLoading && isError가 동시에 true가 되는 불가능한 상태가 생깁니다. 상태 머신은 한 번에 하나의 상태만 허용해 이런 버그를 원천적으로 막습니다. 핵심: 불가능한 상태 조합이 타입 수준에서 차단된다.
- [외부 store 연결](./external-store/README.md) (External Store): 브라우저 store(localStorage, IndexedDB)나 서드파티 상태 라이브러리를 React 컴포넌트와 연결할 때 useEffect + setState를 쓰면 Concurrent Mode에서 tearing(찢김) 현상이 생길 수 있습니다. useSyncExternalStore는 이를 안전하게 처리합니다. 핵심: React 외부 상태를 Concurrent Mode에서 안전하게 구독한다.

## 코드 리뷰 질문

- 이 state의 소유자를 한 문장으로 설명할 수 있는가?
- 저장된 값 중 props나 다른 state에서 계산 가능한 값이 없는가?
- 서버 데이터 refetch가 UI 선택/검색/열림 상태를 덮어쓰지 않는가?
- 새 상태를 추가하기 전에 기존 union/reducer 모델 안에 들어갈 수 있는지 확인했는가?

## 같이 볼 카테고리

- [비동기와 API 상태](../async-api/README.md): 서버 캐시와 mutation 정책이 필요할 때
- [폼과 검증](../forms/README.md): 입력값과 dirty/submit 상태를 다룰 때
- [안티패턴](../anti-patterns/README.md): 전역 상태 남용과 파생 상태 effect 문제를 찾을 때

## 읽는 순서

1. 빠른 선택 가이드에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. React 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 코드 리뷰 질문으로 실제 코드에 적용할 수 있는지 확인합니다.
5. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.

## 참고 자료

- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [React: Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)
