# 상태 관리

상태의 소유권, 파생 값, 전이, 외부 store 연결 방식을 결정하는 패턴입니다.

## 이 카테고리의 질문

상태를 어디에 두고 어떻게 흐르게 할 것인가

## 언제 이 카테고리로 들어오는가

- 상태가 여러 컴포넌트에 영향을 준다
- 상태 변경 경로가 추적되지 않는다
- 서버 상태와 UI 상태가 섞인다

## 빠른 선택 가이드

| 찾고 있는 문제 | 먼저 볼 패턴 | 패턴 형태 |
| --- | --- | --- |
| 상태는 가장 작은 소유 범위에서 시작하고 필요할 때만 올립니다. | [Local State First](./local-state-first/README.md) | State Scope |
| 상태를 읽고 바꾸는 코드 가까이에 배치합니다. | [State Colocation](./state-colocation/README.md) | State Scope |
| 공유 상태를 가장 가까운 공통 부모로 올려 단일 출처로 만듭니다. | [Lifting State Up](./lifting-state-up/README.md) | Shared State |
| 저장하지 않아도 되는 값은 렌더 중 기존 값에서 계산합니다. | [Derived State](./derived-state/README.md) | Computed State |
| 이벤트를 action으로 표현하고 reducer에서 상태 전이를 한 곳에 모읍니다. | [Reducer Pattern](./reducer-pattern/README.md) | State Transition |
| 공유와 복원이 필요한 상태를 URL query/path에 둡니다. | [URL State](./url-state/README.md) | Shareable State |
| 원격 데이터는 server state로, 화면 제어 값은 client state로 분리합니다. | [Server State vs Client State](./server-state-vs-client-state/README.md) | State Classification |
| 성공 가능성이 높은 액션은 먼저 UI를 바꾸고 실패 시 되돌립니다. | [Optimistic UI](./optimistic-ui/README.md) | Perceived Performance |
| 허용 가능한 상태와 전이를 명시해 UI 흐름을 제한합니다. | [State Machine](./state-machine/README.md) | Finite State |
| useSyncExternalStore로 외부 store의 snapshot과 subscribe를 React에 연결합니다. | [External Store](./external-store/README.md) | External Subscription |

## 읽는 순서

1. 위 표에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.

## 참고 자료

- [React: Sharing state between components](https://react.dev/learn/sharing-state-between-components)
- [React: Extracting state logic into a reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)
- [React: useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
