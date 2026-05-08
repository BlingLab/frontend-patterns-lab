# frontend-patterns-lab

React 기반 프론트엔드 실무에서 반복적으로 마주치는 패턴과 안티패턴을 예제, 판단 기준, 트레이드오프 중심으로 정리합니다.

## 이 저장소를 읽는 방법

영문 패턴 이름부터 외우기보다, 지금 겪는 문제에서 출발합니다. 아래 상황별 탐색표에서 가까운 문제를 고르고, 카테고리 README를 거쳐 개별 패턴 문서로 들어가면 됩니다.

폴더명은 GitHub URL과 import 안정성을 위해 영어 kebab-case로 유지합니다. 대신 README와 플레이그라운드에서는 한글 이름을 먼저 보여주고, 영문명은 보조 표기로 둡니다.

## 상황별 빠른 탐색

| 지금 겪는 문제 | 먼저 볼 곳 |
| --- | --- |
| 컴포넌트 props가 많아지고 조합이 어려워진다 | [컴포넌트 조합](./patterns/component-composition/README.md) |
| 상태를 어디에 둬야 할지 애매하다 | [상태 관리](./patterns/state-management/README.md) |
| 반복되는 로직을 custom hook으로 빼고 싶다 | [훅과 로직 재사용](./patterns/hooks/README.md) |
| API 요청, 캐시, 서버 상태 흐름이 복잡하다 | [비동기와 API 상태](./patterns/async-api/README.md) |
| 입력, 검증, 제출 흐름이 복잡하다 | [폼과 검증](./patterns/forms/README.md) |
| 로딩, 빈 상태, 에러, pending 표현이 들쭉날쭉하다 | [UI 상태 표현](./patterns/ui-state/README.md) |
| 렌더링이 느리거나 불필요하게 반복된다 | [렌더링 성능](./patterns/performance-rendering/README.md) |
| 코드 리뷰에서 반복되는 실수를 설명하고 싶다 | [안티패턴](./patterns/anti-patterns/README.md) |

## 전체 패턴 목록

### 컴포넌트 조합

React 컴포넌트의 외부 API, children, slot, Context, headless 구조처럼 화면 조각을 어떻게 나누고 합칠지 다룹니다.

- [children 조합](./patterns/component-composition/children-composition/README.md) (Children Composition): 공통 레이아웃은 컴포넌트가 맡고 실제 내용은 children으로 주입합니다.
- [합성 컴포넌트](./patterns/component-composition/compound-component/README.md) (Compound Component): Root, Trigger, Panel처럼 협력하는 하위 컴포넌트를 하나의 API로 묶습니다.
- [슬롯 패턴](./patterns/component-composition/slot-pattern/README.md) (Slot Pattern): header, actions, footer처럼 이름 있는 영역을 호출부가 채우게 합니다.
- [헤드리스 컴포넌트](./patterns/component-composition/headless-component/README.md) (Headless Component): 상태와 동작만 제공하고 마크업과 스타일은 호출부가 결정합니다.
- [제어/비제어 컴포넌트](./patterns/component-composition/controlled-uncontrolled/README.md) (Controlled / Uncontrolled): 내부 상태 사용과 외부 상태 제어를 모두 지원합니다.
- [렌더 프롭스](./patterns/component-composition/render-props/README.md) (Render Props): 상태와 동작을 함수 인자로 넘기고 렌더링은 호출부가 담당합니다.
- [Provider 패턴](./patterns/component-composition/provider-pattern/README.md) (Provider Pattern): 공유 관심사를 Context Provider로 공급하고 필요한 하위 컴포넌트만 읽게 합니다.
- [다형성 컴포넌트](./patterns/component-composition/polymorphic-component/README.md) (Polymorphic Component): 공통 스타일을 유지하면서 as prop으로 실제 HTML element를 바꿉니다.
- [props getter 패턴](./patterns/component-composition/props-getter/README.md) (Props Getter): 접근성, 이벤트, 상태 props를 안전하게 합성해 호출부에 제공합니다.
- [컨테이너/프리젠터](./patterns/component-composition/container-presenter/README.md) (Container / Presenter): 데이터 준비와 화면 표현의 책임을 분리합니다.

### 상태 관리

React 상태의 소유권, 위치, 파생 값, reducer, URL 상태, 외부 store 연결 방식을 다룹니다.

- [가까운 상태 우선](./patterns/state-management/local-state-first/README.md) (Local State First): 상태는 가장 작은 소유 범위에서 시작하고 필요할 때만 올립니다.
- [상태 위치 맞추기](./patterns/state-management/state-colocation/README.md) (State Colocation): 상태를 실제로 읽고 바꾸는 코드 가까이에 둡니다.
- [상태 끌어올리기](./patterns/state-management/lifting-state-up/README.md) (Lifting State Up): 여러 형제가 같은 상태를 필요로 할 때 가장 가까운 공통 부모로 올립니다.
- [파생 상태](./patterns/state-management/derived-state/README.md) (Derived State): 저장하지 않아도 되는 값은 기존 상태에서 계산합니다.
- [reducer 패턴](./patterns/state-management/reducer-pattern/README.md) (Reducer Pattern): 복잡한 상태 전이를 action과 reducer로 한 곳에 모읍니다.
- [URL 상태](./patterns/state-management/url-state/README.md) (URL State): 공유와 복원이 필요한 필터, 검색어, 페이지 정보를 URL에 둡니다.
- [서버 상태와 클라이언트 상태](./patterns/state-management/server-state-vs-client-state/README.md) (Server State vs Client State): 원격 데이터와 화면 제어 상태의 소유권을 분리합니다.
- [낙관적 UI](./patterns/state-management/optimistic-ui/README.md) (Optimistic UI): 성공 가능성이 높은 액션은 먼저 UI를 바꾸고 실패 시 되돌립니다.
- [상태 머신](./patterns/state-management/state-machine/README.md) (State Machine): 허용 가능한 상태와 전이만 명시해 복잡한 UI 흐름을 안정화합니다.
- [외부 store 연결](./patterns/state-management/external-store/README.md) (External Store): React 밖의 store를 useSyncExternalStore로 안전하게 연결합니다.

### 훅과 로직 재사용

반복되는 React 로직을 custom hook으로 분리하고 조합하는 기준을 다룹니다.

- [커스텀 훅 경계](./patterns/hooks/custom-hook-boundary/README.md) (Custom Hook Boundary): 도메인 로직을 custom hook으로 캡슐화하고 컴포넌트는 렌더링에 집중합니다.
- [제어 가능 상태 훅](./patterns/hooks/use-controllable-state/README.md) (useControllableState): controlled/uncontrolled 상태 소유권 분기를 훅 하나로 표준화합니다.
- [열림/닫힘 훅](./patterns/hooks/use-disclosure/README.md) (useDisclosure): modal, drawer, dropdown의 open/close/toggle 상태를 공통 인터페이스로 다룹니다.
- [debounce 훅](./patterns/hooks/use-debounce/README.md) (useDebounce): 연속 입력을 일정 시간 멈춘 뒤 마지막 값만 반영합니다.
- [throttle 훅](./patterns/hooks/use-throttle/README.md) (useThrottle): 반복 이벤트의 실행 빈도를 일정 간격으로 제한합니다.
- [이전 값 훅](./patterns/hooks/use-previous/README.md) (usePrevious): 직전 렌더의 값을 ref에 보관해 현재 값과 비교합니다.
- [바깥 클릭 감지 훅](./patterns/hooks/use-outside-click/README.md) (useOutsideClick): 특정 영역 바깥 pointer 이벤트를 감지합니다.
- [이벤트 구독 훅](./patterns/hooks/use-event-listener/README.md) (useEventListener): DOM 이벤트 구독과 cleanup을 훅 경계 안에 둡니다.
- [비동기 상태 훅](./patterns/hooks/use-async/README.md) (useAsync): 비동기 작업의 loading/data/error 상태를 공통 모델로 다룹니다.
- [마운트 여부 훅](./patterns/hooks/use-mounted/README.md) (useMounted): 컴포넌트 마운트 여부를 비동기 흐름에서 확인합니다.
- [조회/명령 훅 분리](./patterns/hooks/query-command-hook/README.md) (Query / Command Hook): 읽기 훅과 쓰기 명령 훅을 분리합니다.
- [훅 조합](./patterns/hooks/hook-composition/README.md) (Hook Composition): 작은 훅을 조합해 더 큰 도메인 훅을 만듭니다.

### 비동기와 API 상태

React 화면에서 서버 상태, API 요청, 캐시, mutation, pagination, Suspense/Error Boundary를 다루는 방식을 정리합니다.

- [조회 훅 패턴](./patterns/async-api/query-hook-pattern/README.md) (Query Hook Pattern): 조회 요청을 전용 훅으로 감싸 화면에서 요청 세부사항을 숨깁니다.
- [mutation 훅 패턴](./patterns/async-api/mutation-hook-pattern/README.md) (Mutation Hook Pattern): 쓰기 요청을 명령형 mutation 훅으로 분리합니다.
- [캐시 무효화](./patterns/async-api/cache-invalidation/README.md) (Cache Invalidation): 쓰기 이후 영향을 받는 조회 캐시를 명시적으로 stale 처리합니다.
- [낙관적 업데이트](./patterns/async-api/optimistic-update/README.md) (Optimistic Update): 서버 응답 전에 캐시를 먼저 갱신하고 실패 시 롤백합니다.
- [페이지네이션](./patterns/async-api/pagination/README.md) (Pagination): 페이지 번호와 pageSize 기준으로 목록 조회 상태를 관리합니다.
- [무한 조회](./patterns/async-api/infinite-query/README.md) (Infinite Query): 커서나 페이지 묶음을 누적해 무한 스크롤 목록을 만듭니다.
- [API 어댑터](./patterns/async-api/api-adapter/README.md) (API Adapter): 서버 응답 구조를 React UI 모델로 변환합니다.
- [요청 상태 모델](./patterns/async-api/request-status-model/README.md) (Request Status Model): 요청 상태를 여러 boolean 대신 명시적 union으로 표현합니다.
- [에러 경계](./patterns/async-api/error-boundary/README.md) (Error Boundary): 렌더링 중 발생한 오류를 화면 경계에서 잡아 대체 UI를 보여줍니다.
- [Suspense 경계](./patterns/async-api/suspense-boundary/README.md) (Suspense Boundary): 비동기 로딩 경계를 선언적으로 나누고 fallback을 제공합니다.

### 폼과 검증

React 폼의 controlled/uncontrolled 입력, 검증, 서버 오류, dirty 상태, 제출 흐름을 다룹니다.

- [제어 폼](./patterns/forms/controlled-form/README.md) (Controlled Form): 입력 값을 React state로 직접 제어합니다.
- [비제어 폼](./patterns/forms/uncontrolled-form/README.md) (Uncontrolled Form): DOM이 입력 값을 보관하고 제출 시점에 값을 읽습니다.
- [필드 단위 검증](./patterns/forms/field-level-validation/README.md) (Field Level Validation): 각 필드의 규칙과 오류 메시지를 필드 가까이에 둡니다.
- [폼 단위 검증](./patterns/forms/form-level-validation/README.md) (Form Level Validation): 여러 필드의 조합을 폼 단위에서 검증합니다.
- [서버 오류 매핑](./patterns/forms/server-error-mapping/README.md) (Server Error Mapping): 서버 오류를 필드 오류와 폼 전체 오류로 변환합니다.
- [변경 여부 상태](./patterns/forms/dirty-state/README.md) (Dirty State): 초기값과 현재값을 비교해 변경 여부를 추적합니다.
- [제출 잠금](./patterns/forms/submit-lock/README.md) (Submit Lock): 제출 중 같은 액션이 다시 실행되지 않도록 잠급니다.
- [의존 필드](./patterns/forms/dependent-fields/README.md) (Dependent Fields): 한 필드의 값이 다른 필드의 선택지나 유효성을 결정합니다.
- [동적 필드](./patterns/forms/dynamic-fields/README.md) (Dynamic Fields): 반복 가능한 필드 배열을 안정적인 id와 함께 추가/삭제합니다.
- [단계형 폼](./patterns/forms/multi-step-form/README.md) (Multi Step Form): 긴 폼을 단계별 상태와 검증으로 나눕니다.

### UI 상태 표현

React 화면에서 로딩, 빈 상태, 에러, pending, disabled 같은 상태를 사용자에게 어떻게 보여줄지 다룹니다.

- [로딩/빈 상태/에러](./patterns/ui-state/loading-empty-error/README.md) (Loading / Empty / Error): 목록 화면의 loading, empty, error, success 상태를 일관되게 분기합니다.
- [스켈레톤 vs 스피너](./patterns/ui-state/skeleton-vs-spinner/README.md) (Skeleton vs Spinner): 대기 시간과 레이아웃 예측 가능성에 따라 skeleton과 spinner를 선택합니다.
- [토스트 vs 인라인 오류](./patterns/ui-state/toast-vs-inline-error/README.md) (Toast vs Inline Error): 오류의 복구 위치에 따라 toast와 inline 메시지를 선택합니다.
- [확인 다이얼로그](./patterns/ui-state/confirm-dialog/README.md) (Confirm Dialog): 파괴적 행동 전에 명확한 확인 단계를 둡니다.
- [처리 중 상태](./patterns/ui-state/pending-state/README.md) (Pending State): 사용자 액션이 처리 중임을 버튼과 관련 영역에 표시합니다.
- [비활성 상태](./patterns/ui-state/disabled-state/README.md) (Disabled State): 액션이 불가능한 상태와 이유를 명확히 표현합니다.
- [빈 상태](./patterns/ui-state/empty-state/README.md) (Empty State): 빈 결과를 막다른 화면이 아니라 다음 행동으로 연결합니다.
- [에러 상태](./patterns/ui-state/error-state/README.md) (Error State): 복구 가능한 오류를 명확한 메시지와 액션으로 보여줍니다.

### 렌더링 성능

React 렌더링 비용을 줄이고 관찰하는 memoization, lazy loading, list rendering, context 최적화를 다룹니다.

- [메모이제이션 경계](./patterns/performance-rendering/memoization-boundary/README.md) (Memoization Boundary): memoization을 비용이 큰 하위 트리의 경계에 둡니다.
- [useMemo/useCallback 기준](./patterns/performance-rendering/usememo-usecallback/README.md) (useMemo / useCallback): 값과 함수 identity 안정성이 필요한 지점에만 사용합니다.
- [컴포넌트 분리](./patterns/performance-rendering/component-splitting/README.md) (Component Splitting): 변경 빈도가 다른 영역을 컴포넌트로 분리합니다.
- [목록 렌더링](./patterns/performance-rendering/list-rendering/README.md) (List Rendering): 큰 목록의 렌더 비용을 줄이고 key 안정성을 보장합니다.
- [지연 로딩](./patterns/performance-rendering/lazy-loading/README.md) (Lazy Loading): 초기 화면에 필요 없는 코드를 늦게 불러옵니다.
- [비싼 계산 처리](./patterns/performance-rendering/expensive-calculation/README.md) (Expensive Calculation): 무거운 계산을 필요한 시점에만 실행하거나 캐시합니다.
- [렌더 추적](./patterns/performance-rendering/render-tracking/README.md) (Render Tracking): 렌더 횟수와 원인을 관찰해 최적화 대상을 찾습니다.
- [Context 최적화](./patterns/performance-rendering/context-optimization/README.md) (Context Optimization): Context value와 Provider 범위를 쪼개 불필요한 렌더를 줄입니다.

### 안티패턴

React 코드에서 자주 반복되는 실수와 리팩터링 방향을 나쁜 예와 개선 예로 정리합니다.

- [파생 상태를 effect로 만들기](./patterns/anti-patterns/use-effect-for-derived-state/README.md) (Use Effect For Derived State): 계산 가능한 값을 effect와 state로 중복 저장하는 문제를 피합니다.
- [불필요한 전역 상태](./patterns/anti-patterns/unnecessary-global-state/README.md) (Unnecessary Global State): 지역 상태로 충분한 값을 전역 store에 올리는 문제를 피합니다.
- [props drilling 오해](./patterns/anti-patterns/props-drilling-misunderstanding/README.md) (Props Drilling Misunderstanding): props 전달 자체를 문제로 오해해 Context를 남용하는 일을 피합니다.
- [boolean props 폭발](./patterns/anti-patterns/boolean-props-explosion/README.md) (Boolean Props Explosion): 여러 boolean prop 조합으로 상태 공간이 커지는 문제를 피합니다.
- [메모이제이션 남용](./patterns/anti-patterns/overuse-memoization/README.md) (Overuse Memoization): 측정 없이 memo/useMemo/useCallback을 남발하는 문제를 피합니다.
- [index를 key로 사용](./patterns/anti-patterns/index-as-key/README.md) (Index as Key): 동적 리스트에서 배열 index를 key로 쓰는 문제를 피합니다.
- [거대한 컴포넌트](./patterns/anti-patterns/large-component/README.md) (Large Component): 하나의 컴포넌트가 데이터, 상태, 표현을 모두 떠안는 문제를 피합니다.
- [API 응답 UI 누수](./patterns/anti-patterns/api-response-leaking-to-ui/README.md) (API Response Leaking to UI): 서버 응답 구조가 UI 컴포넌트까지 새는 문제를 피합니다.
- [중복 로딩 상태](./patterns/anti-patterns/duplicated-loading-state/README.md) (Duplicated Loading State): 같은 요청 상태를 여러 boolean으로 중복 관리하는 문제를 피합니다.
- [서버/클라이언트 상태 혼합](./patterns/anti-patterns/mixed-server-client-state/README.md) (Mixed Server / Client State): 서버 상태와 클라이언트 UI 상태의 소유권을 섞는 문제를 피합니다.
- [인라인 객체 props](./patterns/anti-patterns/inline-object-props/README.md) (Inline Object Props): 매 렌더마다 새 객체 prop을 내려 memoization을 깨는 문제를 피합니다.
- [불안정한 콜백](./patterns/anti-patterns/unstable-callbacks/README.md) (Unstable Callbacks): 불안정한 콜백 때문에 하위 컴포넌트 렌더가 퍼지는 문제를 피합니다.
- [effect cleanup 누락](./patterns/anti-patterns/effect-cleanup-missing/README.md) (Effect Cleanup Missing): 구독, 타이머, 외부 연결을 cleanup하지 않는 문제를 피합니다.

## 패턴을 고르는 기준

- React 컴포넌트 책임이 섞여 있으면 먼저 조합 경계를 찾습니다.
- 상태가 문제라면 소유자가 React local state, URL, server cache, external store 중 어디인지 구분합니다.
- 서버 데이터는 요청 코드보다 캐시, 무효화, 실패 복구 기준을 함께 봅니다.
- 렌더링 성능 패턴은 측정 후 적용합니다.
- 안티패턴은 금지 목록이 아니라 리팩터링 신호로 봅니다.

## 실행

```bash
npm install
npm run dev
```

## 리서치 기준

React 공식 문서의 composition, state, hooks, effect, input, reducer, external store 문서와 TanStack Query의 server state 관점, Radix의 Slot/asChild 합성 방식, WAI-ARIA 패턴, web.dev의 list virtualization 가이드를 기준으로 정리합니다.
