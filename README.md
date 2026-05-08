# frontend-patterns-lab

프론트엔드 실무에서 자주 마주치는 패턴과 안티패턴을 예제, 판단 기준, 트레이드오프 중심으로 정리하는 저장소입니다.

## 이 저장소를 읽는 방법

패턴 이름부터 찾지 말고 현재 겪는 문제에서 출발합니다. 루트 README에서 목적에 맞는 카테고리로 들어가고, 카테고리 README의 빠른 선택 가이드에서 개별 패턴으로 이동합니다. 개별 README에서는 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 보고 예제 파일을 확인합니다.

## 목적별 빠른 탐색

| 지금 겪는 문제 | 들어갈 곳 |
| --- | --- |
| 컴포넌트 API가 복잡하다 | [컴포넌트 조합](./patterns/component-composition/README.md) |
| 상태 위치가 애매하다 | [상태 관리](./patterns/state-management/README.md) |
| 반복 로직을 훅으로 빼고 싶다 | [Hooks](./patterns/hooks/README.md) |
| API 요청/캐시/서버 상태가 문제다 | [Async API](./patterns/async-api/README.md) |
| 폼 입력, 검증, 제출이 복잡하다 | [Forms](./patterns/forms/README.md) |
| 로딩, 빈 상태, 에러 표현이 들쭉날쭉하다 | [UI State](./patterns/ui-state/README.md) |
| 렌더링이 느리거나 불필요하게 반복된다 | [Performance Rendering](./patterns/performance-rendering/README.md) |
| 리뷰에서 자주 보이는 실수를 설명하고 싶다 | [Anti Patterns](./patterns/anti-patterns/README.md) |

## 전체 패턴 목록

### 컴포넌트 조합

컴포넌트의 외부 API와 내부 책임 경계를 정하는 패턴입니다.

- [Children Composition](./patterns/component-composition/children-composition/README.md): 레이아웃은 부모가 제공하고 실제 콘텐츠는 children으로 주입합니다.
- [Compound Component](./patterns/component-composition/compound-component/README.md): 하나의 루트와 협력하는 하위 컴포넌트를 묶어 선언적인 API를 만듭니다.
- [Slot Pattern](./patterns/component-composition/slot-pattern/README.md): 명명된 slot prop으로 화면의 특정 영역을 호출부가 채우게 합니다.
- [Headless Component](./patterns/component-composition/headless-component/README.md): 상태, 이벤트, 접근성만 제공하고 마크업과 스타일은 호출부가 결정합니다.
- [Controlled Uncontrolled](./patterns/component-composition/controlled-uncontrolled/README.md): value/onChange와 defaultValue를 모두 지원해 상태 소유권을 선택하게 합니다.
- [Render Props](./patterns/component-composition/render-props/README.md): 상태와 동작을 함수 인자로 넘기고 렌더링은 호출부 함수가 담당합니다.
- [Provider Pattern](./patterns/component-composition/provider-pattern/README.md): 공유 관심사를 Provider로 감싸고 필요한 하위 컴포넌트만 context를 읽게 합니다.
- [Polymorphic Component](./patterns/component-composition/polymorphic-component/README.md): as 또는 asChild API로 렌더링할 요소를 바꾸면서 공통 스타일과 동작을 재사용합니다.
- [Props Getter](./patterns/component-composition/props-getter/README.md): getButtonProps 같은 함수로 필요한 props를 안전하게 합성합니다.
- [Container Presenter](./patterns/component-composition/container-presenter/README.md): Container는 데이터와 상태를, Presenter는 순수한 표현을 담당합니다.

### 상태 관리

상태의 소유권, 파생 값, 전이, 외부 store 연결 방식을 결정하는 패턴입니다.

- [Local State First](./patterns/state-management/local-state-first/README.md): 상태는 가장 작은 소유 범위에서 시작하고 필요할 때만 올립니다.
- [State Colocation](./patterns/state-management/state-colocation/README.md): 상태를 읽고 바꾸는 코드 가까이에 배치합니다.
- [Lifting State Up](./patterns/state-management/lifting-state-up/README.md): 공유 상태를 가장 가까운 공통 부모로 올려 단일 출처로 만듭니다.
- [Derived State](./patterns/state-management/derived-state/README.md): 저장하지 않아도 되는 값은 렌더 중 기존 값에서 계산합니다.
- [Reducer Pattern](./patterns/state-management/reducer-pattern/README.md): 이벤트를 action으로 표현하고 reducer에서 상태 전이를 한 곳에 모읍니다.
- [URL State](./patterns/state-management/url-state/README.md): 공유와 복원이 필요한 상태를 URL query/path에 둡니다.
- [Server State vs Client State](./patterns/state-management/server-state-vs-client-state/README.md): 원격 데이터는 server state로, 화면 제어 값은 client state로 분리합니다.
- [Optimistic UI](./patterns/state-management/optimistic-ui/README.md): 성공 가능성이 높은 액션은 먼저 UI를 바꾸고 실패 시 되돌립니다.
- [State Machine](./patterns/state-management/state-machine/README.md): 허용 가능한 상태와 전이를 명시해 UI 흐름을 제한합니다.
- [External Store](./patterns/state-management/external-store/README.md): useSyncExternalStore로 외부 store의 snapshot과 subscribe를 React에 연결합니다.

### Hooks

컴포넌트에서 반복되는 상태/이벤트/비동기 로직을 커스텀 훅으로 분리하는 기준입니다.

- [Custom Hook Boundary](./patterns/hooks/custom-hook-boundary/README.md): 도메인 로직을 커스텀 훅으로 캡슐화하고 컴포넌트는 렌더링에 집중합니다.
- [Use Controllable State](./patterns/hooks/use-controllable-state/README.md): controlled/uncontrolled 컴포넌트의 상태 소유권 분기를 훅 하나로 표준화합니다.
- [Use Disclosure](./patterns/hooks/use-disclosure/README.md): open/close/toggle 상태를 공통 인터페이스로 제공합니다.
- [Use Debounce](./patterns/hooks/use-debounce/README.md): 연속 입력을 일정 시간 멈춘 뒤 한 번만 반영합니다.
- [Use Throttle](./patterns/hooks/use-throttle/README.md): 반복 이벤트를 정해진 주기 안에서 최대 한 번만 처리합니다.
- [Use Previous](./patterns/hooks/use-previous/README.md): 직전 렌더의 값을 ref에 보관해 현재 값과 비교합니다.
- [Use Outside Click](./patterns/hooks/use-outside-click/README.md): 특정 요소 바깥의 pointer 이벤트를 감지해 닫기 동작을 실행합니다.
- [Use Event Listener](./patterns/hooks/use-event-listener/README.md): DOM 이벤트 구독과 해제를 훅 경계 안에 둡니다.
- [Use Async](./patterns/hooks/use-async/README.md): 비동기 작업의 loading/data/error 상태를 공통 모델로 다룹니다.
- [Use Mounted](./patterns/hooks/use-mounted/README.md): 마운트 여부를 ref로 추적해 비동기 완료 후 안전하게 확인합니다.
- [Query Command Hook](./patterns/hooks/query-command-hook/README.md): 조회 훅과 변경 명령 훅을 분리해 읽기/쓰기 책임을 나눕니다.
- [Hook Composition](./patterns/hooks/hook-composition/README.md): 작은 훅들을 조합해 도메인 훅을 만듭니다.

### Async API

API 호출, 캐시, mutation, 페이지네이션, 에러 경계를 다루는 패턴입니다.

- [Query Hook Pattern](./patterns/async-api/query-hook-pattern/README.md): 조회 요청을 전용 훅으로 감싸 화면에서 요청 세부사항을 숨깁니다.
- [Mutation Hook Pattern](./patterns/async-api/mutation-hook-pattern/README.md): 쓰기 요청을 명령형 mutation 훅으로 분리합니다.
- [Cache Invalidation](./patterns/async-api/cache-invalidation/README.md): 쓰기 이후 영향을 받는 조회 캐시를 명시적으로 stale 처리합니다.
- [Optimistic Update](./patterns/async-api/optimistic-update/README.md): 서버 응답 전에 캐시를 먼저 갱신하고 실패 시 롤백합니다.
- [Pagination](./patterns/async-api/pagination/README.md): 페이지 번호와 pageSize 기준으로 목록 조회 상태를 관리합니다.
- [Infinite Query](./patterns/async-api/infinite-query/README.md): 커서나 페이지 묶음을 누적해 무한 스크롤 목록을 만듭니다.
- [API Adapter](./patterns/async-api/api-adapter/README.md): 서버 응답 구조를 UI 모델로 변환합니다.
- [Request Status Model](./patterns/async-api/request-status-model/README.md): 요청 상태를 여러 boolean 대신 하나의 명시적 union으로 표현합니다.
- [Error Boundary](./patterns/async-api/error-boundary/README.md): 렌더링 중 발생한 오류를 경계에서 잡아 대체 UI를 보여줍니다.
- [Suspense Boundary](./patterns/async-api/suspense-boundary/README.md): 비동기 로딩 경계를 선언적으로 나누고 fallback을 제공합니다.

### Forms

폼 값의 소유권, 검증 위치, 서버 오류, 제출 흐름을 설계하는 패턴입니다.

- [Controlled Form](./patterns/forms/controlled-form/README.md): 입력 값을 React state로 관리해 화면과 데이터 흐름을 완전히 제어합니다.
- [Uncontrolled Form](./patterns/forms/uncontrolled-form/README.md): DOM이 입력 값을 보관하고 제출 시점에 값을 읽습니다.
- [Field Level Validation](./patterns/forms/field-level-validation/README.md): 각 필드의 규칙과 오류 메시지를 필드 가까이에 둡니다.
- [Form Level Validation](./patterns/forms/form-level-validation/README.md): 여러 필드의 조합을 폼 단위에서 검증합니다.
- [Server Error Mapping](./patterns/forms/server-error-mapping/README.md): 서버 오류를 필드 오류와 폼 전체 오류로 변환합니다.
- [Dirty State](./patterns/forms/dirty-state/README.md): 초기값과 현재값을 비교해 변경 여부를 추적합니다.
- [Submit Lock](./patterns/forms/submit-lock/README.md): 제출 중 같은 액션이 다시 실행되지 않도록 잠급니다.
- [Dependent Fields](./patterns/forms/dependent-fields/README.md): 한 필드의 값이 다른 필드의 선택지나 유효성을 결정합니다.
- [Dynamic Fields](./patterns/forms/dynamic-fields/README.md): 반복 가능한 필드 배열을 안정적인 id와 함께 추가/삭제합니다.
- [Multi Step Form](./patterns/forms/multi-step-form/README.md): 긴 폼을 단계별 상태와 검증으로 나눕니다.

### UI State

사용자가 현재 상태와 다음 행동을 이해하도록 화면 상태를 설계하는 패턴입니다.

- [Loading / Empty / Error](./patterns/ui-state/loading-empty-error/README.md): 목록 화면의 loading, empty, error, success 상태를 일관되게 분기합니다.
- [Skeleton vs Spinner](./patterns/ui-state/skeleton-vs-spinner/README.md): 대기 시간과 레이아웃 예측 가능성에 따라 skeleton과 spinner를 선택합니다.
- [Toast vs Inline Error](./patterns/ui-state/toast-vs-inline-error/README.md): 오류의 복구 위치에 따라 toast와 inline 메시지를 선택합니다.
- [Confirm Dialog](./patterns/ui-state/confirm-dialog/README.md): 파괴적 행동 전에 명확한 확인 단계를 둡니다.
- [Pending State](./patterns/ui-state/pending-state/README.md): 사용자 액션이 처리 중임을 버튼과 관련 영역에 표시합니다.
- [Disabled State](./patterns/ui-state/disabled-state/README.md): 액션이 불가능한 상태와 이유를 명확히 표현합니다.
- [Empty State](./patterns/ui-state/empty-state/README.md): 빈 결과를 막다른 화면이 아니라 다음 행동으로 연결합니다.
- [Error State](./patterns/ui-state/error-state/README.md): 복구 가능한 오류를 명확한 메시지와 액션으로 보여줍니다.

### Performance Rendering

불필요한 렌더를 줄이고, 큰 목록과 비싼 계산을 다루는 기준입니다.

- [Memoization Boundary](./patterns/performance-rendering/memoization-boundary/README.md): memoization을 비용이 큰 하위 트리의 경계에 둡니다.
- [useMemo / useCallback](./patterns/performance-rendering/usememo-usecallback/README.md): 값과 함수 identity 안정성이 필요한 지점에만 useMemo/useCallback을 씁니다.
- [Component Splitting](./patterns/performance-rendering/component-splitting/README.md): 변경 빈도가 다른 영역을 컴포넌트로 분리합니다.
- [List Rendering](./patterns/performance-rendering/list-rendering/README.md): 큰 목록의 렌더 비용을 줄이고 key 안정성을 보장합니다.
- [Lazy Loading](./patterns/performance-rendering/lazy-loading/README.md): 초기 화면에 필요 없는 코드를 늦게 불러옵니다.
- [Expensive Calculation](./patterns/performance-rendering/expensive-calculation/README.md): 무거운 계산을 필요한 시점에만 실행하거나 캐시합니다.
- [Render Tracking](./patterns/performance-rendering/render-tracking/README.md): 렌더 횟수와 원인을 관찰해 최적화 대상을 찾습니다.
- [Context Optimization](./patterns/performance-rendering/context-optimization/README.md): Context value와 Provider 범위를 쪼개 불필요한 렌더를 줄입니다.

### Anti Patterns

처음에는 편해 보이지만 규모가 커질수록 변경 비용을 키우는 구조를 정리합니다.

- [Use Effect For Derived State](./patterns/anti-patterns/use-effect-for-derived-state/README.md): 계산 가능한 값을 effect와 state로 중복 저장하지 않습니다.
- [Unnecessary Global State](./patterns/anti-patterns/unnecessary-global-state/README.md): 지역 상태로 충분한 값을 전역 store에 올리지 않습니다.
- [Props Drilling Misunderstanding](./patterns/anti-patterns/props-drilling-misunderstanding/README.md): props 전달 자체를 문제로 오해해 Context를 남용하지 않습니다.
- [Boolean Props Explosion](./patterns/anti-patterns/boolean-props-explosion/README.md): 여러 boolean prop 조합으로 컴포넌트 상태 공간을 폭발시키지 않습니다.
- [Overuse Memoization](./patterns/anti-patterns/overuse-memoization/README.md): 측정 없이 memo/useMemo/useCallback을 남발하지 않습니다.
- [Index As Key](./patterns/anti-patterns/index-as-key/README.md): 동적 리스트에서 배열 index를 key로 쓰지 않습니다.
- [Large Component](./patterns/anti-patterns/large-component/README.md): 하나의 컴포넌트가 데이터, 상태, 표현, side effect를 모두 갖지 않게 합니다.
- [API Response Leaking to UI](./patterns/anti-patterns/api-response-leaking-to-ui/README.md): API 응답 구조를 UI 컴포넌트에 직접 노출하지 않습니다.
- [Duplicated Loading State](./patterns/anti-patterns/duplicated-loading-state/README.md): 같은 요청 상태를 여러 boolean으로 중복 관리하지 않습니다.
- [Mixed Server / Client State](./patterns/anti-patterns/mixed-server-client-state/README.md): 서버 상태와 클라이언트 UI 상태의 소유권을 섞지 않습니다.
- [Inline Object Props](./patterns/anti-patterns/inline-object-props/README.md): 매 렌더마다 새 객체 prop을 내려 memoization을 깨지 않게 합니다.
- [Unstable Callbacks](./patterns/anti-patterns/unstable-callbacks/README.md): 불안정한 콜백 때문에 하위 컴포넌트 렌더가 퍼지지 않게 합니다.
- [Effect Cleanup Missing](./patterns/anti-patterns/effect-cleanup-missing/README.md): 구독, 타이머, 외부 연결은 effect cleanup으로 정리합니다.

## 패턴을 고르는 기준

- 책임이 섞여 있으면 먼저 경계를 찾습니다.
- 상태가 문제라면 소유자가 누구인지 먼저 구분합니다.
- 서버 데이터는 캐시와 재검증 기준을 함께 봅니다.
- 성능 패턴은 측정 후 적용합니다.
- 안티패턴은 금지 목록이 아니라 리팩터링 신호로 봅니다.

## 실행

```bash
npm install
npm run dev
```

## 리서치 기준

공식 문서와 널리 쓰이는 라이브러리 문서를 우선 참고했습니다. React 공식 문서의 composition, state, hooks, effect, input, reducer, external store 문서와 TanStack Query의 server state 관점, Radix의 Slot/asChild 합성 방식, WAI-ARIA dialog 패턴, web.dev의 list virtualization 가이드를 기준으로 정리했습니다.
