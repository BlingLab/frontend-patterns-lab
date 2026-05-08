# 상태 관리

영문명: State Management

React 상태의 소유권, 위치, 파생 값, reducer, URL 상태, 외부 store 연결 방식을 다룹니다.

## 이 카테고리의 질문

상태를 어디에 두고 어떻게 흐르게 할 것인가

## 언제 이 카테고리로 들어오는가

- React 상태를 어느 컴포넌트에 둬야 할지 모르겠다
- 파생 값과 원본 상태가 중복된다
- 서버 상태와 클라이언트 UI 상태가 섞인다

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

## 읽는 순서

1. 위 표에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. React 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.
