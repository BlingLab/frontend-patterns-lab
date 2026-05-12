# 안티패턴

영문명: Anti Patterns

안티패턴은 금지 목록이 아니라 리팩터링 신호입니다. 처음에는 편해 보였지만 요구사항이 늘 때 어떤 버그와 변경 비용으로 돌아오는지, 그리고 어떤 작은 리팩터링으로 줄일 수 있는지를 설명합니다.

## 이 카테고리의 질문

자주 하는 실수와 개선 방향은 무엇인가

## 언제 이 카테고리로 들어오는가

- 코드 리뷰에서 같은 지적이 반복될 때
- 버그는 작지만 원인이 여러 파일에 퍼져 있을 때
- 성능, 상태, API, 폼 문제가 섞여 어디서부터 고쳐야 할지 모를 때
- 팀 규칙을 금지 문구가 아니라 판단 기준으로 정리하고 싶을 때

## 먼저 판단할 순서

1. 먼저 BadCase에서 실제로 어떤 변경이 깨지는지 재현합니다.
2. 문제를 만든 책임 경계를 찾습니다.
3. ImprovedCase가 새 abstraction을 추가하는지, 단순히 책임을 가까운 곳으로 옮기는지 구분합니다.
4. 예외적으로 괜찮은 단순 케이스를 문서화합니다.
5. 관련 패턴으로 이동해 장기적인 설계 방향을 확인합니다.

## 빠른 선택 가이드

| 찾고 있는 문제 | 먼저 볼 패턴 | 영문명 |
| --- | --- | --- |
| 계산 가능한 값을 effect와 state로 중복 저장하는 문제를 피합니다. | [파생 상태를 effect로 만들기](./use-effect-for-derived-state/README.md) | useEffect For Derived State |
| 지역 상태로 충분한 값을 전역 store에 올리는 문제를 피합니다. | [불필요한 전역 상태](./unnecessary-global-state/README.md) | Unnecessary Global State |
| props 전달 자체를 문제로 오해해 Context를 남용하는 일을 피합니다. | [props drilling 오해](./props-drilling-misunderstanding/README.md) | Props Drilling Misunderstanding |
| 여러 boolean prop 조합으로 상태 공간이 커지는 문제를 피합니다. | [boolean props 폭발](./boolean-props-explosion/README.md) | Boolean Props Explosion |
| 측정 없이 memo/useMemo/useCallback을 남발하는 문제를 피합니다. | [메모이제이션 남용](./overuse-memoization/README.md) | Overuse Memoization |
| 동적 리스트에서 배열 index를 key로 쓰는 문제를 피합니다. | [index를 key로 사용](./index-as-key/README.md) | Index as Key |
| 하나의 컴포넌트가 데이터, 상태, 표현을 모두 떠안는 문제를 피합니다. | [거대한 컴포넌트](./large-component/README.md) | Large Component |
| 서버 응답 구조가 UI 컴포넌트까지 새는 문제를 피합니다. | [API 응답 UI 누수](./api-response-leaking-to-ui/README.md) | API Response Leaking to UI |
| 같은 요청 상태를 여러 boolean으로 중복 관리하는 문제를 피합니다. | [중복 로딩 상태](./duplicated-loading-state/README.md) | Duplicated Loading State |
| 서버 상태와 클라이언트 UI 상태의 소유권을 섞는 문제를 피합니다. | [서버/클라이언트 상태 혼합](./mixed-server-client-state/README.md) | Mixed Server / Client State |
| 매 렌더마다 새 객체 prop을 내려 memoization을 깨는 문제를 피합니다. | [인라인 객체 props](./inline-object-props/README.md) | Inline Object Props |
| 불안정한 콜백 때문에 하위 컴포넌트 렌더가 퍼지는 문제를 피합니다. | [불안정한 콜백](./unstable-callbacks/README.md) | Unstable Callbacks |
| 구독, 타이머, 외부 연결을 cleanup하지 않는 문제를 피합니다. | [effect cleanup 누락](./effect-cleanup-missing/README.md) | Effect Cleanup Missing |

## 선택 신호

| 코드에서 보이는 신호 | 우선 검토할 패턴 |
| --- | --- |
| 계산 가능한 값을 effect로 동기화 | 파생 상태를 effect로 만들기 |
| 지역 상태를 store에 올림 | 불필요한 전역 상태 |
| boolean 조합이 늘어남 | boolean props 폭발 |
| 동적 목록에 index key 사용 | index를 key로 사용 |
| 서버 응답 구조가 UI에 노출 | API 응답 UI 누수 |
| 측정 없이 memo 남발 | 메모이제이션 남용 |

## 패턴별 핵심 메모

- [파생 상태를 effect로 만들기](./use-effect-for-derived-state/README.md) (useEffect For Derived State): items 배열에서 계산되는 filteredItems를 state로 저장하면, items가 바뀔 때 동기화하는 useEffect가 필요합니다. 이 effect는 한 렌더 뒤에 실행되어 flickering을 유발하고 동기화 버그의 온상이 됩니다. 핵심: 렌더 중 계산 가능한 값은 state로 저장하지 않는다.
- [불필요한 전역 상태](./unnecessary-global-state/README.md) (Unnecessary Global State): 모달 open 여부, 입력 폼 값처럼 한 화면에서만 쓰이는 상태를 Zustand store에 넣으면, store가 비대해지고 컴포넌트 간 의존성이 늘어납니다. 지역 상태는 컴포넌트와 함께 살다 사라져야 합니다. 핵심: 전역 store에 올리기 전에 "다른 화면에서도 쓰나?"를 묻는다.
- [props drilling 오해](./props-drilling-misunderstanding/README.md) (Props Drilling Misunderstanding): 2-3단계 props 전달은 자연스럽고 명시적입니다. "drilling이 싫다"는 이유로 모든 곳에 Context를 쓰면 어디서 값이 오는지 추적이 어려워집니다. 진짜 drilling 문제는 5단계 이상, 또는 무관한 컴포넌트를 통해 전달될 때입니다. 핵심: 2-3단계 props 전달은 정상이다.
- [boolean props 폭발](./boolean-props-explosion/README.md) (Boolean Props Explosion): isWarning, isDanger, isSuccess, isLarge, isSmall 같은 boolean이 5개면 2^5=32가지 조합이 생깁니다. 대부분은 의미 없는 조합이고 테스트도 불가능합니다. variant="warning" | "danger"처럼 명시적 열거형으로 유효한 상태만 허용해야 합니다. 핵심: variant union type으로 유효한 상태만 표현한다.
- [메모이제이션 남용](./overuse-memoization/README.md) (Overuse Memoization): 모든 함수에 useCallback, 모든 값에 useMemo를 쓰면 코드가 복잡해지고 오히려 deps 비교 비용이 생깁니다. React 컴파일러가 없는 환경에서도 "필요한 곳에만 정확히"가 원칙입니다. 핵심: 단순 원시값, 짧은 계산에는 useMemo가 불필요하다.
- [index를 key로 사용](./index-as-key/README.md) (Index as Key): 항목을 추가/삭제/정렬하면 index가 바뀝니다. React는 같은 key를 같은 컴포넌트로 인식하므로, index가 key이면 기존 컴포넌트가 다른 데이터로 재사용됩니다. 입력 중인 텍스트가 다른 행으로 이동하는 버그가 대표적입니다. 핵심: 안정적인 고유 id를 key로 사용한다.
- [거대한 컴포넌트](./large-component/README.md) (Large Component): 300줄 이상의 컴포넌트는 어디서 상태가 오고 어디서 이벤트가 발생하는지 추적이 어렵습니다. 변경 이유가 다른 코드들이 한 파일에 있으면 수정 시 무관한 부분까지 영향 범위가 됩니다. 핵심: 단일 책임: 한 컴포넌트는 한 가지 이유로만 바뀌어야 한다.
- [API 응답 UI 누수](./api-response-leaking-to-ui/README.md) (API Response Leaking to UI): user_name, created_at 같은 서버 snake_case를 컴포넌트 props로 직접 받으면, 서버 API가 바뀔 때 UI 컴포넌트 파일들을 모두 수정해야 합니다. adapter 계층에서 UI 타입으로 변환하면 변경 격리가 됩니다. 핵심: 서버 타입을 직접 컴포넌트 props에 쓰지 않는다.
- [중복 로딩 상태](./duplicated-loading-state/README.md) (Duplicated Loading State): isLoading, isError, isSuccess를 각각 boolean state로 관리하면 isLoading=false이면서 isError=false이면서 isSuccess=false인 초기 상태, 그리고 isLoading=true이면서 isSuccess=true인 불가능한 상태가 생깁니다. 핵심: status: 'idle' | 'loading' | 'success' | 'error' 하나로 표현한다.
- [서버/클라이언트 상태 혼합](./mixed-server-client-state/README.md) (Mixed Server / Client State): 서버 데이터(users 배열)와 UI 상태(selectedUserId)를 같은 Zustand store에 넣으면, users를 refetch할 때 selectedUserId가 리셋되거나, 반대로 캐시 무효화 로직이 복잡해집니다. 핵심: 서버 상태는 TanStack Query, SWR처럼 캐시를 전담하는 도구에 맡긴다.
- [인라인 객체 props](./inline-object-props/README.md) (Inline Object Props): <Child style={{ color: "red" }} />는 매 렌더마다 새 객체가 만들어집니다. Child가 React.memo로 감싸져 있어도 style prop이 항상 바뀌어 memo가 무효화됩니다. 객체는 컴포넌트 밖에 상수로 꺼내거나 useMemo를 써야 합니다.
- [불안정한 콜백](./unstable-callbacks/README.md) (Unstable Callbacks): memo된 자식에 매 렌더마다 새로 만들어진 함수를 prop으로 내리면 memo가 의미없어집니다. useCallback으로 함수 참조를 안정화해야 자식의 불필요한 리렌더를 막을 수 있습니다. 핵심: memo된 자식에 넘기는 함수는 useCallback으로 감싼다.
- [effect cleanup 누락](./effect-cleanup-missing/README.md) (Effect Cleanup Missing): setInterval, addEventListener, WebSocket처럼 외부 리소스를 점유하는 코드를 useEffect에서 정리하지 않으면 컴포넌트가 unmount돼도 계속 실행됩니다. 메모리 누수와 setState 경고가 발생합니다. 핵심: effect return 함수에서 반드시 cleanup한다.

## 코드 리뷰 질문

- 이 문제가 실제 사용자 버그나 변경 비용으로 이어지는 흐름이 있는가?
- 개선 후 불가능한 상태, 중복 소스, 불안정한 identity가 줄었는가?
- 리팩터링 범위가 문제보다 과하게 크지 않은가?
- 예외 케이스까지 금지 규칙으로 만들고 있지 않은가?

## 같이 볼 카테고리

- [상태 관리](../state-management/README.md): derived/global/server-client state 문제를 고칠 때
- [렌더링 성능](../performance-rendering/README.md): memoization, callback, inline props 문제를 고칠 때
- [비동기와 API 상태](../async-api/README.md): API response leaking과 loading state 문제를 고칠 때

## 읽는 순서

1. 빠른 선택 가이드에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. React 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 코드 리뷰 질문으로 실제 코드에 적용할 수 있는지 확인합니다.
5. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.

## 참고 자료

- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
