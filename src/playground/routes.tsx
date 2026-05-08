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
  englishTitle: string;
  category: string;
  summary: string;
  Component: React.ComponentType;
};

export const patternRoutes: PatternRoute[] = [
  { slug: 'component-composition/children-composition', title: 'children 조합', englishTitle: 'Children Composition', category: '컴포넌트 조합', summary: '공통 레이아웃은 컴포넌트가 맡고 실제 내용은 children으로 주입합니다.', Component: Example0 },
  { slug: 'component-composition/compound-component', title: '합성 컴포넌트', englishTitle: 'Compound Component', category: '컴포넌트 조합', summary: 'Root, Trigger, Panel처럼 협력하는 하위 컴포넌트를 하나의 API로 묶습니다.', Component: Example1 },
  { slug: 'component-composition/slot-pattern', title: '슬롯 패턴', englishTitle: 'Slot Pattern', category: '컴포넌트 조합', summary: 'header, actions, footer처럼 이름 있는 영역을 호출부가 채우게 합니다.', Component: Example2 },
  { slug: 'component-composition/headless-component', title: '헤드리스 컴포넌트', englishTitle: 'Headless Component', category: '컴포넌트 조합', summary: '상태와 동작만 제공하고 마크업과 스타일은 호출부가 결정합니다.', Component: Example3 },
  { slug: 'component-composition/controlled-uncontrolled', title: '제어/비제어 컴포넌트', englishTitle: 'Controlled / Uncontrolled', category: '컴포넌트 조합', summary: '내부 상태 사용과 외부 상태 제어를 모두 지원합니다.', Component: Example4 },
  { slug: 'component-composition/render-props', title: '렌더 프롭스', englishTitle: 'Render Props', category: '컴포넌트 조합', summary: '상태와 동작을 함수 인자로 넘기고 렌더링은 호출부가 담당합니다.', Component: Example5 },
  { slug: 'component-composition/provider-pattern', title: 'Provider 패턴', englishTitle: 'Provider Pattern', category: '컴포넌트 조합', summary: '공유 관심사를 Context Provider로 공급하고 필요한 하위 컴포넌트만 읽게 합니다.', Component: Example6 },
  { slug: 'component-composition/polymorphic-component', title: '다형성 컴포넌트', englishTitle: 'Polymorphic Component', category: '컴포넌트 조합', summary: '공통 스타일을 유지하면서 as prop으로 실제 HTML element를 바꿉니다.', Component: Example7 },
  { slug: 'component-composition/props-getter', title: 'props getter 패턴', englishTitle: 'Props Getter', category: '컴포넌트 조합', summary: '접근성, 이벤트, 상태 props를 안전하게 합성해 호출부에 제공합니다.', Component: Example8 },
  { slug: 'component-composition/container-presenter', title: '컨테이너/프리젠터', englishTitle: 'Container / Presenter', category: '컴포넌트 조합', summary: '데이터 준비와 화면 표현의 책임을 분리합니다.', Component: Example9 },
  { slug: 'state-management/local-state-first', title: '가까운 상태 우선', englishTitle: 'Local State First', category: '상태 관리', summary: '상태는 가장 작은 소유 범위에서 시작하고 필요할 때만 올립니다.', Component: Example10 },
  { slug: 'state-management/state-colocation', title: '상태 위치 맞추기', englishTitle: 'State Colocation', category: '상태 관리', summary: '상태를 실제로 읽고 바꾸는 코드 가까이에 둡니다.', Component: Example11 },
  { slug: 'state-management/lifting-state-up', title: '상태 끌어올리기', englishTitle: 'Lifting State Up', category: '상태 관리', summary: '여러 형제가 같은 상태를 필요로 할 때 가장 가까운 공통 부모로 올립니다.', Component: Example12 },
  { slug: 'state-management/derived-state', title: '파생 상태', englishTitle: 'Derived State', category: '상태 관리', summary: '저장하지 않아도 되는 값은 기존 상태에서 계산합니다.', Component: Example13 },
  { slug: 'state-management/reducer-pattern', title: 'reducer 패턴', englishTitle: 'Reducer Pattern', category: '상태 관리', summary: '복잡한 상태 전이를 action과 reducer로 한 곳에 모읍니다.', Component: Example14 },
  { slug: 'state-management/url-state', title: 'URL 상태', englishTitle: 'URL State', category: '상태 관리', summary: '공유와 복원이 필요한 필터, 검색어, 페이지 정보를 URL에 둡니다.', Component: Example15 },
  { slug: 'state-management/server-state-vs-client-state', title: '서버 상태와 클라이언트 상태', englishTitle: 'Server State vs Client State', category: '상태 관리', summary: '원격 데이터와 화면 제어 상태의 소유권을 분리합니다.', Component: Example16 },
  { slug: 'state-management/optimistic-ui', title: '낙관적 UI', englishTitle: 'Optimistic UI', category: '상태 관리', summary: '성공 가능성이 높은 액션은 먼저 UI를 바꾸고 실패 시 되돌립니다.', Component: Example17 },
  { slug: 'state-management/state-machine', title: '상태 머신', englishTitle: 'State Machine', category: '상태 관리', summary: '허용 가능한 상태와 전이만 명시해 복잡한 UI 흐름을 안정화합니다.', Component: Example18 },
  { slug: 'state-management/external-store', title: '외부 store 연결', englishTitle: 'External Store', category: '상태 관리', summary: 'React 밖의 store를 useSyncExternalStore로 안전하게 연결합니다.', Component: Example19 },
  { slug: 'hooks/custom-hook-boundary', title: '커스텀 훅 경계', englishTitle: 'Custom Hook Boundary', category: '훅과 로직 재사용', summary: '도메인 로직을 custom hook으로 캡슐화하고 컴포넌트는 렌더링에 집중합니다.', Component: Example20 },
  { slug: 'hooks/use-controllable-state', title: '제어 가능 상태 훅', englishTitle: 'useControllableState', category: '훅과 로직 재사용', summary: 'controlled/uncontrolled 상태 소유권 분기를 훅 하나로 표준화합니다.', Component: Example21 },
  { slug: 'hooks/use-disclosure', title: '열림/닫힘 훅', englishTitle: 'useDisclosure', category: '훅과 로직 재사용', summary: 'modal, drawer, dropdown의 open/close/toggle 상태를 공통 인터페이스로 다룹니다.', Component: Example22 },
  { slug: 'hooks/use-debounce', title: 'debounce 훅', englishTitle: 'useDebounce', category: '훅과 로직 재사용', summary: '연속 입력을 일정 시간 멈춘 뒤 마지막 값만 반영합니다.', Component: Example23 },
  { slug: 'hooks/use-throttle', title: 'throttle 훅', englishTitle: 'useThrottle', category: '훅과 로직 재사용', summary: '반복 이벤트의 실행 빈도를 일정 간격으로 제한합니다.', Component: Example24 },
  { slug: 'hooks/use-previous', title: '이전 값 훅', englishTitle: 'usePrevious', category: '훅과 로직 재사용', summary: '직전 렌더의 값을 ref에 보관해 현재 값과 비교합니다.', Component: Example25 },
  { slug: 'hooks/use-outside-click', title: '바깥 클릭 감지 훅', englishTitle: 'useOutsideClick', category: '훅과 로직 재사용', summary: '특정 영역 바깥 pointer 이벤트를 감지합니다.', Component: Example26 },
  { slug: 'hooks/use-event-listener', title: '이벤트 구독 훅', englishTitle: 'useEventListener', category: '훅과 로직 재사용', summary: 'DOM 이벤트 구독과 cleanup을 훅 경계 안에 둡니다.', Component: Example27 },
  { slug: 'hooks/use-async', title: '비동기 상태 훅', englishTitle: 'useAsync', category: '훅과 로직 재사용', summary: '비동기 작업의 loading/data/error 상태를 공통 모델로 다룹니다.', Component: Example28 },
  { slug: 'hooks/use-mounted', title: '마운트 여부 훅', englishTitle: 'useMounted', category: '훅과 로직 재사용', summary: '컴포넌트 마운트 여부를 비동기 흐름에서 확인합니다.', Component: Example29 },
  { slug: 'hooks/query-command-hook', title: '조회/명령 훅 분리', englishTitle: 'Query / Command Hook', category: '훅과 로직 재사용', summary: '읽기 훅과 쓰기 명령 훅을 분리합니다.', Component: Example30 },
  { slug: 'hooks/hook-composition', title: '훅 조합', englishTitle: 'Hook Composition', category: '훅과 로직 재사용', summary: '작은 훅을 조합해 더 큰 도메인 훅을 만듭니다.', Component: Example31 },
  { slug: 'async-api/query-hook-pattern', title: '조회 훅 패턴', englishTitle: 'Query Hook Pattern', category: '비동기와 API 상태', summary: '조회 요청을 전용 훅으로 감싸 화면에서 요청 세부사항을 숨깁니다.', Component: Example32 },
  { slug: 'async-api/mutation-hook-pattern', title: 'mutation 훅 패턴', englishTitle: 'Mutation Hook Pattern', category: '비동기와 API 상태', summary: '쓰기 요청을 명령형 mutation 훅으로 분리합니다.', Component: Example33 },
  { slug: 'async-api/cache-invalidation', title: '캐시 무효화', englishTitle: 'Cache Invalidation', category: '비동기와 API 상태', summary: '쓰기 이후 영향을 받는 조회 캐시를 명시적으로 stale 처리합니다.', Component: Example34 },
  { slug: 'async-api/optimistic-update', title: '낙관적 업데이트', englishTitle: 'Optimistic Update', category: '비동기와 API 상태', summary: '서버 응답 전에 캐시를 먼저 갱신하고 실패 시 롤백합니다.', Component: Example35 },
  { slug: 'async-api/pagination', title: '페이지네이션', englishTitle: 'Pagination', category: '비동기와 API 상태', summary: '페이지 번호와 pageSize 기준으로 목록 조회 상태를 관리합니다.', Component: Example36 },
  { slug: 'async-api/infinite-query', title: '무한 조회', englishTitle: 'Infinite Query', category: '비동기와 API 상태', summary: '커서나 페이지 묶음을 누적해 무한 스크롤 목록을 만듭니다.', Component: Example37 },
  { slug: 'async-api/api-adapter', title: 'API 어댑터', englishTitle: 'API Adapter', category: '비동기와 API 상태', summary: '서버 응답 구조를 React UI 모델로 변환합니다.', Component: Example38 },
  { slug: 'async-api/request-status-model', title: '요청 상태 모델', englishTitle: 'Request Status Model', category: '비동기와 API 상태', summary: '요청 상태를 여러 boolean 대신 명시적 union으로 표현합니다.', Component: Example39 },
  { slug: 'async-api/error-boundary', title: '에러 경계', englishTitle: 'Error Boundary', category: '비동기와 API 상태', summary: '렌더링 중 발생한 오류를 화면 경계에서 잡아 대체 UI를 보여줍니다.', Component: Example40 },
  { slug: 'async-api/suspense-boundary', title: 'Suspense 경계', englishTitle: 'Suspense Boundary', category: '비동기와 API 상태', summary: '비동기 로딩 경계를 선언적으로 나누고 fallback을 제공합니다.', Component: Example41 },
  { slug: 'forms/controlled-form', title: '제어 폼', englishTitle: 'Controlled Form', category: '폼과 검증', summary: '입력 값을 React state로 직접 제어합니다.', Component: Example42 },
  { slug: 'forms/uncontrolled-form', title: '비제어 폼', englishTitle: 'Uncontrolled Form', category: '폼과 검증', summary: 'DOM이 입력 값을 보관하고 제출 시점에 값을 읽습니다.', Component: Example43 },
  { slug: 'forms/field-level-validation', title: '필드 단위 검증', englishTitle: 'Field Level Validation', category: '폼과 검증', summary: '각 필드의 규칙과 오류 메시지를 필드 가까이에 둡니다.', Component: Example44 },
  { slug: 'forms/form-level-validation', title: '폼 단위 검증', englishTitle: 'Form Level Validation', category: '폼과 검증', summary: '여러 필드의 조합을 폼 단위에서 검증합니다.', Component: Example45 },
  { slug: 'forms/server-error-mapping', title: '서버 오류 매핑', englishTitle: 'Server Error Mapping', category: '폼과 검증', summary: '서버 오류를 필드 오류와 폼 전체 오류로 변환합니다.', Component: Example46 },
  { slug: 'forms/dirty-state', title: '변경 여부 상태', englishTitle: 'Dirty State', category: '폼과 검증', summary: '초기값과 현재값을 비교해 변경 여부를 추적합니다.', Component: Example47 },
  { slug: 'forms/submit-lock', title: '제출 잠금', englishTitle: 'Submit Lock', category: '폼과 검증', summary: '제출 중 같은 액션이 다시 실행되지 않도록 잠급니다.', Component: Example48 },
  { slug: 'forms/dependent-fields', title: '의존 필드', englishTitle: 'Dependent Fields', category: '폼과 검증', summary: '한 필드의 값이 다른 필드의 선택지나 유효성을 결정합니다.', Component: Example49 },
  { slug: 'forms/dynamic-fields', title: '동적 필드', englishTitle: 'Dynamic Fields', category: '폼과 검증', summary: '반복 가능한 필드 배열을 안정적인 id와 함께 추가/삭제합니다.', Component: Example50 },
  { slug: 'forms/multi-step-form', title: '단계형 폼', englishTitle: 'Multi Step Form', category: '폼과 검증', summary: '긴 폼을 단계별 상태와 검증으로 나눕니다.', Component: Example51 },
  { slug: 'ui-state/loading-empty-error', title: '로딩/빈 상태/에러', englishTitle: 'Loading / Empty / Error', category: 'UI 상태 표현', summary: '목록 화면의 loading, empty, error, success 상태를 일관되게 분기합니다.', Component: Example52 },
  { slug: 'ui-state/skeleton-vs-spinner', title: '스켈레톤 vs 스피너', englishTitle: 'Skeleton vs Spinner', category: 'UI 상태 표현', summary: '대기 시간과 레이아웃 예측 가능성에 따라 skeleton과 spinner를 선택합니다.', Component: Example53 },
  { slug: 'ui-state/toast-vs-inline-error', title: '토스트 vs 인라인 오류', englishTitle: 'Toast vs Inline Error', category: 'UI 상태 표현', summary: '오류의 복구 위치에 따라 toast와 inline 메시지를 선택합니다.', Component: Example54 },
  { slug: 'ui-state/confirm-dialog', title: '확인 다이얼로그', englishTitle: 'Confirm Dialog', category: 'UI 상태 표현', summary: '파괴적 행동 전에 명확한 확인 단계를 둡니다.', Component: Example55 },
  { slug: 'ui-state/pending-state', title: '처리 중 상태', englishTitle: 'Pending State', category: 'UI 상태 표현', summary: '사용자 액션이 처리 중임을 버튼과 관련 영역에 표시합니다.', Component: Example56 },
  { slug: 'ui-state/disabled-state', title: '비활성 상태', englishTitle: 'Disabled State', category: 'UI 상태 표현', summary: '액션이 불가능한 상태와 이유를 명확히 표현합니다.', Component: Example57 },
  { slug: 'ui-state/empty-state', title: '빈 상태', englishTitle: 'Empty State', category: 'UI 상태 표현', summary: '빈 결과를 막다른 화면이 아니라 다음 행동으로 연결합니다.', Component: Example58 },
  { slug: 'ui-state/error-state', title: '에러 상태', englishTitle: 'Error State', category: 'UI 상태 표현', summary: '복구 가능한 오류를 명확한 메시지와 액션으로 보여줍니다.', Component: Example59 },
  { slug: 'performance-rendering/memoization-boundary', title: '메모이제이션 경계', englishTitle: 'Memoization Boundary', category: '렌더링 성능', summary: 'memoization을 비용이 큰 하위 트리의 경계에 둡니다.', Component: Example60 },
  { slug: 'performance-rendering/usememo-usecallback', title: 'useMemo/useCallback 기준', englishTitle: 'useMemo / useCallback', category: '렌더링 성능', summary: '값과 함수 identity 안정성이 필요한 지점에만 사용합니다.', Component: Example61 },
  { slug: 'performance-rendering/component-splitting', title: '컴포넌트 분리', englishTitle: 'Component Splitting', category: '렌더링 성능', summary: '변경 빈도가 다른 영역을 컴포넌트로 분리합니다.', Component: Example62 },
  { slug: 'performance-rendering/list-rendering', title: '목록 렌더링', englishTitle: 'List Rendering', category: '렌더링 성능', summary: '큰 목록의 렌더 비용을 줄이고 key 안정성을 보장합니다.', Component: Example63 },
  { slug: 'performance-rendering/lazy-loading', title: '지연 로딩', englishTitle: 'Lazy Loading', category: '렌더링 성능', summary: '초기 화면에 필요 없는 코드를 늦게 불러옵니다.', Component: Example64 },
  { slug: 'performance-rendering/expensive-calculation', title: '비싼 계산 처리', englishTitle: 'Expensive Calculation', category: '렌더링 성능', summary: '무거운 계산을 필요한 시점에만 실행하거나 캐시합니다.', Component: Example65 },
  { slug: 'performance-rendering/render-tracking', title: '렌더 추적', englishTitle: 'Render Tracking', category: '렌더링 성능', summary: '렌더 횟수와 원인을 관찰해 최적화 대상을 찾습니다.', Component: Example66 },
  { slug: 'performance-rendering/context-optimization', title: 'Context 최적화', englishTitle: 'Context Optimization', category: '렌더링 성능', summary: 'Context value와 Provider 범위를 쪼개 불필요한 렌더를 줄입니다.', Component: Example67 },
  { slug: 'anti-patterns/use-effect-for-derived-state', title: '파생 상태를 effect로 만들기', englishTitle: 'Use Effect For Derived State', category: '안티패턴', summary: '계산 가능한 값을 effect와 state로 중복 저장하는 문제를 피합니다.', Component: Example68 },
  { slug: 'anti-patterns/unnecessary-global-state', title: '불필요한 전역 상태', englishTitle: 'Unnecessary Global State', category: '안티패턴', summary: '지역 상태로 충분한 값을 전역 store에 올리는 문제를 피합니다.', Component: Example69 },
  { slug: 'anti-patterns/props-drilling-misunderstanding', title: 'props drilling 오해', englishTitle: 'Props Drilling Misunderstanding', category: '안티패턴', summary: 'props 전달 자체를 문제로 오해해 Context를 남용하는 일을 피합니다.', Component: Example70 },
  { slug: 'anti-patterns/boolean-props-explosion', title: 'boolean props 폭발', englishTitle: 'Boolean Props Explosion', category: '안티패턴', summary: '여러 boolean prop 조합으로 상태 공간이 커지는 문제를 피합니다.', Component: Example71 },
  { slug: 'anti-patterns/overuse-memoization', title: '메모이제이션 남용', englishTitle: 'Overuse Memoization', category: '안티패턴', summary: '측정 없이 memo/useMemo/useCallback을 남발하는 문제를 피합니다.', Component: Example72 },
  { slug: 'anti-patterns/index-as-key', title: 'index를 key로 사용', englishTitle: 'Index as Key', category: '안티패턴', summary: '동적 리스트에서 배열 index를 key로 쓰는 문제를 피합니다.', Component: Example73 },
  { slug: 'anti-patterns/large-component', title: '거대한 컴포넌트', englishTitle: 'Large Component', category: '안티패턴', summary: '하나의 컴포넌트가 데이터, 상태, 표현을 모두 떠안는 문제를 피합니다.', Component: Example74 },
  { slug: 'anti-patterns/api-response-leaking-to-ui', title: 'API 응답 UI 누수', englishTitle: 'API Response Leaking to UI', category: '안티패턴', summary: '서버 응답 구조가 UI 컴포넌트까지 새는 문제를 피합니다.', Component: Example75 },
  { slug: 'anti-patterns/duplicated-loading-state', title: '중복 로딩 상태', englishTitle: 'Duplicated Loading State', category: '안티패턴', summary: '같은 요청 상태를 여러 boolean으로 중복 관리하는 문제를 피합니다.', Component: Example76 },
  { slug: 'anti-patterns/mixed-server-client-state', title: '서버/클라이언트 상태 혼합', englishTitle: 'Mixed Server / Client State', category: '안티패턴', summary: '서버 상태와 클라이언트 UI 상태의 소유권을 섞는 문제를 피합니다.', Component: Example77 },
  { slug: 'anti-patterns/inline-object-props', title: '인라인 객체 props', englishTitle: 'Inline Object Props', category: '안티패턴', summary: '매 렌더마다 새 객체 prop을 내려 memoization을 깨는 문제를 피합니다.', Component: Example78 },
  { slug: 'anti-patterns/unstable-callbacks', title: '불안정한 콜백', englishTitle: 'Unstable Callbacks', category: '안티패턴', summary: '불안정한 콜백 때문에 하위 컴포넌트 렌더가 퍼지는 문제를 피합니다.', Component: Example79 },
  { slug: 'anti-patterns/effect-cleanup-missing', title: 'effect cleanup 누락', englishTitle: 'Effect Cleanup Missing', category: '안티패턴', summary: '구독, 타이머, 외부 연결을 cleanup하지 않는 문제를 피합니다.', Component: Example80 },
];
