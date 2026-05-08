import Example0 from '../../patterns/component-composition/children-composition/Example';
import Example1 from '../../patterns/component-composition/compound-component/Example';
import Example2 from '../../patterns/component-composition/slot-pattern/Example';
import Example3 from '../../patterns/component-composition/headless-component/Example';
import Example4 from '../../patterns/component-composition/controlled-uncontrolled/Example';
import Example5 from '../../patterns/component-composition/render-props/Example';
import Example6 from '../../patterns/component-composition/provider-pattern/Example';
import Example7 from '../../patterns/component-composition/polymorphic-component/Example';
import Example8 from '../../patterns/component-composition/props-getter/Example';
import Example9 from '../../patterns/component-composition/container-presenter/Example';
import Example10 from '../../patterns/state-management/local-state-first/Example';
import Example11 from '../../patterns/state-management/state-colocation/Example';
import Example12 from '../../patterns/state-management/lifting-state-up/Example';
import Example13 from '../../patterns/state-management/derived-state/Example';
import Example14 from '../../patterns/state-management/reducer-pattern/Example';
import Example15 from '../../patterns/state-management/url-state/Example';
import Example16 from '../../patterns/state-management/server-state-vs-client-state/Example';
import Example17 from '../../patterns/state-management/optimistic-ui/Example';
import Example18 from '../../patterns/state-management/state-machine/Example';
import Example19 from '../../patterns/state-management/external-store/Example';
import Example20 from '../../patterns/hooks/custom-hook-boundary/Example';
import Example21 from '../../patterns/hooks/use-controllable-state/Example';
import Example22 from '../../patterns/hooks/use-disclosure/Example';
import Example23 from '../../patterns/hooks/use-debounce/Example';
import Example24 from '../../patterns/hooks/use-throttle/Example';
import Example25 from '../../patterns/hooks/use-previous/Example';
import Example26 from '../../patterns/hooks/use-outside-click/Example';
import Example27 from '../../patterns/hooks/use-event-listener/Example';
import Example28 from '../../patterns/hooks/use-async/Example';
import Example29 from '../../patterns/hooks/use-mounted/Example';
import Example30 from '../../patterns/hooks/query-command-hook/Example';
import Example31 from '../../patterns/hooks/hook-composition/Example';
import Example32 from '../../patterns/async-api/query-hook-pattern/Example';
import Example33 from '../../patterns/async-api/mutation-hook-pattern/Example';
import Example34 from '../../patterns/async-api/cache-invalidation/Example';
import Example35 from '../../patterns/async-api/optimistic-update/Example';
import Example36 from '../../patterns/async-api/pagination/Example';
import Example37 from '../../patterns/async-api/infinite-query/Example';
import Example38 from '../../patterns/async-api/api-adapter/Example';
import Example39 from '../../patterns/async-api/request-status-model/Example';
import Example40 from '../../patterns/async-api/error-boundary/Example';
import Example41 from '../../patterns/async-api/suspense-boundary/Example';
import Example42 from '../../patterns/forms/controlled-form/Example';
import Example43 from '../../patterns/forms/uncontrolled-form/Example';
import Example44 from '../../patterns/forms/field-level-validation/Example';
import Example45 from '../../patterns/forms/form-level-validation/Example';
import Example46 from '../../patterns/forms/server-error-mapping/Example';
import Example47 from '../../patterns/forms/dirty-state/Example';
import Example48 from '../../patterns/forms/submit-lock/Example';
import Example49 from '../../patterns/forms/dependent-fields/Example';
import Example50 from '../../patterns/forms/dynamic-fields/Example';
import Example51 from '../../patterns/forms/multi-step-form/Example';
import Example52 from '../../patterns/ui-state/loading-empty-error/Example';
import Example53 from '../../patterns/ui-state/skeleton-vs-spinner/Example';
import Example54 from '../../patterns/ui-state/toast-vs-inline-error/Example';
import Example55 from '../../patterns/ui-state/confirm-dialog/Example';
import Example56 from '../../patterns/ui-state/pending-state/Example';
import Example57 from '../../patterns/ui-state/disabled-state/Example';
import Example58 from '../../patterns/ui-state/empty-state/Example';
import Example59 from '../../patterns/ui-state/error-state/Example';
import Example60 from '../../patterns/performance-rendering/memoization-boundary/Example';
import Example61 from '../../patterns/performance-rendering/usememo-usecallback/Example';
import Example62 from '../../patterns/performance-rendering/component-splitting/Example';
import Example63 from '../../patterns/performance-rendering/list-rendering/Example';
import Example64 from '../../patterns/performance-rendering/lazy-loading/Example';
import Example65 from '../../patterns/performance-rendering/expensive-calculation/Example';
import Example66 from '../../patterns/performance-rendering/render-tracking/Example';
import Example67 from '../../patterns/performance-rendering/context-optimization/Example';
import Example68 from '../../patterns/anti-patterns/use-effect-for-derived-state/Example';
import Example69 from '../../patterns/anti-patterns/unnecessary-global-state/Example';
import Example70 from '../../patterns/anti-patterns/props-drilling-misunderstanding/Example';
import Example71 from '../../patterns/anti-patterns/boolean-props-explosion/Example';
import Example72 from '../../patterns/anti-patterns/overuse-memoization/Example';
import Example73 from '../../patterns/anti-patterns/index-as-key/Example';
import Example74 from '../../patterns/anti-patterns/large-component/Example';
import Example75 from '../../patterns/anti-patterns/api-response-leaking-to-ui/Example';
import Example76 from '../../patterns/anti-patterns/duplicated-loading-state/Example';
import Example77 from '../../patterns/anti-patterns/mixed-server-client-state/Example';
import Example78 from '../../patterns/anti-patterns/inline-object-props/Example';
import Example79 from '../../patterns/anti-patterns/unstable-callbacks/Example';
import Example80 from '../../patterns/anti-patterns/effect-cleanup-missing/Example';

export type PatternRoute = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  Component: React.ComponentType;
};

export const patternRoutes: PatternRoute[] = [
  { slug: 'component-composition/children-composition', title: 'Children Composition', category: '컴포넌트 조합', summary: 'children을 통해 레이아웃과 내용을 자연스럽게 분리합니다.', Component: Example0 },
  { slug: 'component-composition/compound-component', title: 'Compound Component', category: '컴포넌트 조합', summary: '서로 협력하는 하위 컴포넌트를 하나의 API처럼 제공합니다.', Component: Example1 },
  { slug: 'component-composition/slot-pattern', title: 'Slot Pattern', category: '컴포넌트 조합', summary: '명명된 영역을 열어두어 호출부가 화면 조각을 주입하게 합니다.', Component: Example2 },
  { slug: 'component-composition/headless-component', title: 'Headless Component', category: '컴포넌트 조합', summary: '상태와 동작만 제공하고 마크업과 스타일은 사용자에게 맡깁니다.', Component: Example3 },
  { slug: 'component-composition/controlled-uncontrolled', title: 'Controlled Uncontrolled', category: '컴포넌트 조합', summary: '외부 제어와 내부 상태 관리를 모두 지원하는 컴포넌트를 만듭니다.', Component: Example4 },
  { slug: 'component-composition/render-props', title: 'Render Props', category: '컴포넌트 조합', summary: '렌더링 함수를 통해 상태와 동작을 유연하게 전달합니다.', Component: Example5 },
  { slug: 'component-composition/provider-pattern', title: 'Provider Pattern', category: '컴포넌트 조합', summary: '깊은 트리에서 공유되는 관심사를 Context Provider로 묶습니다.', Component: Example6 },
  { slug: 'component-composition/polymorphic-component', title: 'Polymorphic Component', category: '컴포넌트 조합', summary: 'as prop으로 렌더링 태그를 바꾸면서 공통 스타일을 재사용합니다.', Component: Example7 },
  { slug: 'component-composition/props-getter', title: 'Props Getter', category: '컴포넌트 조합', summary: '접근성, 이벤트, 상태 props를 훅에서 안전하게 합성해 제공합니다.', Component: Example8 },
  { slug: 'component-composition/container-presenter', title: 'Container Presenter', category: '컴포넌트 조합', summary: '데이터와 화면 표현의 책임을 분리합니다.', Component: Example9 },
  { slug: 'state-management/local-state-first', title: 'Local State First', category: '상태 관리', summary: '가장 가까운 컴포넌트에 먼저 상태를 둡니다.', Component: Example10 },
  { slug: 'state-management/state-colocation', title: 'State Colocation', category: '상태 관리', summary: '상태를 실제로 쓰는 위치에 최대한 가깝게 배치합니다.', Component: Example11 },
  { slug: 'state-management/lifting-state-up', title: 'Lifting State Up', category: '상태 관리', summary: '여러 형제가 같은 상태를 필요로 할 때 공통 부모로 올립니다.', Component: Example12 },
  { slug: 'state-management/derived-state', title: 'Derived State', category: '상태 관리', summary: '저장하지 않아도 되는 값은 기존 상태에서 계산합니다.', Component: Example13 },
  { slug: 'state-management/reducer-pattern', title: 'Reducer Pattern', category: '상태 관리', summary: '상태 전이가 많아질 때 이벤트와 reducer로 흐름을 명확히 합니다.', Component: Example14 },
  { slug: 'state-management/url-state', title: 'URL State', category: '상태 관리', summary: '공유되어야 하는 필터와 페이지 정보를 URL에 둡니다.', Component: Example15 },
  { slug: 'state-management/server-state-vs-client-state', title: 'Server State vs Client State', category: '상태 관리', summary: '서버 데이터와 클라이언트 UI 상태를 분리해 다룹니다.', Component: Example16 },
  { slug: 'state-management/optimistic-ui', title: 'Optimistic UI', category: '상태 관리', summary: '서버 응답 전에도 성공을 가정해 빠른 피드백을 줍니다.', Component: Example17 },
  { slug: 'state-management/state-machine', title: 'State Machine', category: '상태 관리', summary: '명확한 상태와 전이만 허용해 복잡한 UI 흐름을 안정화합니다.', Component: Example18 },
  { slug: 'state-management/external-store', title: 'External Store', category: '상태 관리', summary: 'React 밖의 store를 useSyncExternalStore로 연결합니다.', Component: Example19 },
  { slug: 'hooks/custom-hook-boundary', title: 'Custom Hook Boundary', category: 'Hooks', summary: '도메인 로직을 커스텀 훅으로 캡슐화합니다.', Component: Example20 },
  { slug: 'hooks/use-controllable-state', title: 'Use Controllable State', category: 'Hooks', summary: '제어/비제어 상태를 하나의 훅으로 일관되게 처리합니다.', Component: Example21 },
  { slug: 'hooks/use-disclosure', title: 'Use Disclosure', category: 'Hooks', summary: '열림/닫힘 UI 상태를 공통 인터페이스로 다룹니다.', Component: Example22 },
  { slug: 'hooks/use-debounce', title: 'Use Debounce', category: 'Hooks', summary: '짧은 시간에 반복되는 입력을 마지막 값 중심으로 안정화합니다.', Component: Example23 },
  { slug: 'hooks/use-throttle', title: 'Use Throttle', category: 'Hooks', summary: '반복 호출의 최대 빈도를 제한합니다.', Component: Example24 },
  { slug: 'hooks/use-previous', title: 'Use Previous', category: 'Hooks', summary: '직전 렌더의 값을 비교 기준으로 보관합니다.', Component: Example25 },
  { slug: 'hooks/use-outside-click', title: 'Use Outside Click', category: 'Hooks', summary: '특정 영역 바깥 클릭을 감지합니다.', Component: Example26 },
  { slug: 'hooks/use-event-listener', title: 'Use Event Listener', category: 'Hooks', summary: '이벤트 구독과 정리를 훅 경계 안에 둡니다.', Component: Example27 },
  { slug: 'hooks/use-async', title: 'Use Async', category: 'Hooks', summary: '비동기 요청 상태를 loading/error/data로 모델링합니다.', Component: Example28 },
  { slug: 'hooks/use-mounted', title: 'Use Mounted', category: 'Hooks', summary: '컴포넌트 마운트 여부를 비동기 흐름에서 확인합니다.', Component: Example29 },
  { slug: 'hooks/query-command-hook', title: 'Query Command Hook', category: 'Hooks', summary: '조회 훅과 명령 훅을 분리합니다.', Component: Example30 },
  { slug: 'hooks/hook-composition', title: 'Hook Composition', category: 'Hooks', summary: '작은 훅을 조합해 더 큰 도메인 훅을 만듭니다.', Component: Example31 },
  { slug: 'async-api/query-hook-pattern', title: 'Query Hook Pattern', category: 'Async API', summary: '조회 요청을 전용 훅으로 분리합니다.', Component: Example32 },
  { slug: 'async-api/mutation-hook-pattern', title: 'Mutation Hook Pattern', category: 'Async API', summary: '쓰기 요청을 명령형 mutation 훅으로 제공합니다.', Component: Example33 },
  { slug: 'async-api/cache-invalidation', title: 'Cache Invalidation', category: 'Async API', summary: '쓰기 이후 어떤 조회 캐시를 무효화할지 명시합니다.', Component: Example34 },
  { slug: 'async-api/optimistic-update', title: 'Optimistic Update', category: 'Async API', summary: '캐시를 먼저 갱신하고 실패 시 롤백합니다.', Component: Example35 },
  { slug: 'async-api/pagination', title: 'Pagination', category: 'Async API', summary: '페이지 기반 목록 조회의 상태와 요청을 분리합니다.', Component: Example36 },
  { slug: 'async-api/infinite-query', title: 'Infinite Query', category: 'Async API', summary: '무한 스크롤 데이터를 페이지 묶음으로 관리합니다.', Component: Example37 },
  { slug: 'async-api/api-adapter', title: 'API Adapter', category: 'Async API', summary: '서버 응답 형태를 UI 모델로 변환합니다.', Component: Example38 },
  { slug: 'async-api/request-status-model', title: 'Request Status Model', category: 'Async API', summary: '요청 상태를 불리언 묶음 대신 명시적 상태로 모델링합니다.', Component: Example39 },
  { slug: 'async-api/error-boundary', title: 'Error Boundary', category: 'Async API', summary: '렌더링 실패를 화면 경계에서 복구합니다.', Component: Example40 },
  { slug: 'async-api/suspense-boundary', title: 'Suspense Boundary', category: 'Async API', summary: 'Suspense로 비동기 로딩 경계를 선언합니다.', Component: Example41 },
  { slug: 'forms/controlled-form', title: 'Controlled Form', category: 'Forms', summary: '입력 값을 React 상태로 직접 제어합니다.', Component: Example42 },
  { slug: 'forms/uncontrolled-form', title: 'Uncontrolled Form', category: 'Forms', summary: 'DOM의 입력 값을 필요 시점에 읽습니다.', Component: Example43 },
  { slug: 'forms/field-level-validation', title: 'Field Level Validation', category: 'Forms', summary: '필드 단위로 검증과 오류 표시를 분리합니다.', Component: Example44 },
  { slug: 'forms/form-level-validation', title: 'Form Level Validation', category: 'Forms', summary: '여러 필드 간 규칙을 폼 단위에서 검증합니다.', Component: Example45 },
  { slug: 'forms/server-error-mapping', title: 'Server Error Mapping', category: 'Forms', summary: '서버 오류를 필드 오류와 전역 오류로 매핑합니다.', Component: Example46 },
  { slug: 'forms/dirty-state', title: 'Dirty State', category: 'Forms', summary: '초기값 대비 변경 여부를 추적합니다.', Component: Example47 },
  { slug: 'forms/submit-lock', title: 'Submit Lock', category: 'Forms', summary: '중복 제출을 막고 제출 중 상태를 표현합니다.', Component: Example48 },
  { slug: 'forms/dependent-fields', title: 'Dependent Fields', category: 'Forms', summary: '한 필드 값이 다른 필드 선택지를 결정합니다.', Component: Example49 },
  { slug: 'forms/dynamic-fields', title: 'Dynamic Fields', category: 'Forms', summary: '반복 가능한 필드 배열을 안정적으로 추가/삭제합니다.', Component: Example50 },
  { slug: 'forms/multi-step-form', title: 'Multi Step Form', category: 'Forms', summary: '긴 폼을 단계별 상태와 검증으로 나눕니다.', Component: Example51 },
  { slug: 'ui-state/loading-empty-error', title: 'Loading / Empty / Error', category: 'UI State', summary: '목록 화면의 대표 상태를 일관되게 분기합니다.', Component: Example52 },
  { slug: 'ui-state/skeleton-vs-spinner', title: 'Skeleton vs Spinner', category: 'UI State', summary: '기다림의 성격에 따라 skeleton과 spinner를 구분합니다.', Component: Example53 },
  { slug: 'ui-state/toast-vs-inline-error', title: 'Toast vs Inline Error', category: 'UI State', summary: '오류 성격에 따라 toast와 inline 메시지를 선택합니다.', Component: Example54 },
  { slug: 'ui-state/confirm-dialog', title: 'Confirm Dialog', category: 'UI State', summary: '파괴적 행동 전에 의도를 확인합니다.', Component: Example55 },
  { slug: 'ui-state/pending-state', title: 'Pending State', category: 'UI State', summary: '처리 중인 액션의 피드백을 버튼과 영역에 표시합니다.', Component: Example56 },
  { slug: 'ui-state/disabled-state', title: 'Disabled State', category: 'UI State', summary: '불가능한 액션의 이유와 상태를 명확히 합니다.', Component: Example57 },
  { slug: 'ui-state/empty-state', title: 'Empty State', category: 'UI State', summary: '빈 결과를 다음 행동으로 연결합니다.', Component: Example58 },
  { slug: 'ui-state/error-state', title: 'Error State', category: 'UI State', summary: '복구 가능한 오류를 명확한 액션과 함께 보여줍니다.', Component: Example59 },
  { slug: 'performance-rendering/memoization-boundary', title: 'Memoization Boundary', category: 'Performance Rendering', summary: 'memo의 경계를 비용이 큰 하위 트리에 둡니다.', Component: Example60 },
  { slug: 'performance-rendering/usememo-usecallback', title: 'useMemo / useCallback', category: 'Performance Rendering', summary: '값과 콜백 안정성이 실제로 필요한 지점에만 memoization을 적용합니다.', Component: Example61 },
  { slug: 'performance-rendering/component-splitting', title: 'Component Splitting', category: 'Performance Rendering', summary: '변경 빈도가 다른 영역을 컴포넌트로 분리합니다.', Component: Example62 },
  { slug: 'performance-rendering/list-rendering', title: 'List Rendering', category: 'Performance Rendering', summary: '큰 목록 렌더링 비용을 줄입니다.', Component: Example63 },
  { slug: 'performance-rendering/lazy-loading', title: 'Lazy Loading', category: 'Performance Rendering', summary: '초기 화면에 필요 없는 코드를 늦게 불러옵니다.', Component: Example64 },
  { slug: 'performance-rendering/expensive-calculation', title: 'Expensive Calculation', category: 'Performance Rendering', summary: '무거운 계산을 memoization 또는 사전 계산으로 제한합니다.', Component: Example65 },
  { slug: 'performance-rendering/render-tracking', title: 'Render Tracking', category: 'Performance Rendering', summary: '렌더 횟수를 관찰해 병목을 찾습니다.', Component: Example66 },
  { slug: 'performance-rendering/context-optimization', title: 'Context Optimization', category: 'Performance Rendering', summary: 'Context 변경 범위를 줄여 불필요한 렌더를 막습니다.', Component: Example67 },
  { slug: 'anti-patterns/use-effect-for-derived-state', title: 'Use Effect For Derived State', category: 'Anti Patterns', summary: '계산 가능한 값을 effect와 state로 중복 저장합니다.', Component: Example68 },
  { slug: 'anti-patterns/unnecessary-global-state', title: 'Unnecessary Global State', category: 'Anti Patterns', summary: '지역 상태로 충분한 값을 전역 store에 올립니다.', Component: Example69 },
  { slug: 'anti-patterns/props-drilling-misunderstanding', title: 'Props Drilling Misunderstanding', category: 'Anti Patterns', summary: 'props 전달 자체를 문제로 오해하고 과한 Context를 씁니다.', Component: Example70 },
  { slug: 'anti-patterns/boolean-props-explosion', title: 'Boolean Props Explosion', category: 'Anti Patterns', summary: 'boolean prop 조합이 컴포넌트 상태 공간을 폭발시킵니다.', Component: Example71 },
  { slug: 'anti-patterns/overuse-memoization', title: 'Overuse Memoization', category: 'Anti Patterns', summary: '비용보다 복잡도가 큰 memoization을 남발합니다.', Component: Example72 },
  { slug: 'anti-patterns/index-as-key', title: 'Index As Key', category: 'Anti Patterns', summary: '배열 index를 key로 사용해 상태와 DOM 재사용이 꼬입니다.', Component: Example73 },
  { slug: 'anti-patterns/large-component', title: 'Large Component', category: 'Anti Patterns', summary: '하나의 컴포넌트가 데이터, 상태, 표현을 모두 떠안습니다.', Component: Example74 },
  { slug: 'anti-patterns/api-response-leaking-to-ui', title: 'API Response Leaking to UI', category: 'Anti Patterns', summary: '서버 응답 구조가 UI 컴포넌트까지 새어 나옵니다.', Component: Example75 },
  { slug: 'anti-patterns/duplicated-loading-state', title: 'Duplicated Loading State', category: 'Anti Patterns', summary: '같은 요청 상태를 여러 불리언으로 중복 관리합니다.', Component: Example76 },
  { slug: 'anti-patterns/mixed-server-client-state', title: 'Mixed Server / Client State', category: 'Anti Patterns', summary: '서버 상태와 클라이언트 상태의 소유권을 섞습니다.', Component: Example77 },
  { slug: 'anti-patterns/inline-object-props', title: 'Inline Object Props', category: 'Anti Patterns', summary: '매 렌더마다 새 객체 prop을 내려 memoization을 깨뜨립니다.', Component: Example78 },
  { slug: 'anti-patterns/unstable-callbacks', title: 'Unstable Callbacks', category: 'Anti Patterns', summary: '불안정한 콜백이 하위 컴포넌트 렌더를 유발합니다.', Component: Example79 },
  { slug: 'anti-patterns/effect-cleanup-missing', title: 'Effect Cleanup Missing', category: 'Anti Patterns', summary: '구독, 타이머, 요청 정리를 누락합니다.', Component: Example80 },
];
