# 렌더링 성능

영문명: Performance Rendering

렌더링 성능 카테고리는 memoization을 무조건 추가하는 곳이 아닙니다. 먼저 병목을 측정하고, 상태 위치와 컴포넌트 경계를 조정한 뒤 필요한 곳에만 memo, lazy loading, virtualization을 적용합니다.

## 이 카테고리의 질문

렌더링 비용을 어떻게 줄이고 관찰할 것인가

## 언제 이 카테고리로 들어오는가

- 타이핑, 스크롤, 필터 변경이 체감될 정도로 느릴 때
- 부모 state 변경이 큰 하위 트리 전체 렌더로 퍼질 때
- Context value 변경이 많은 소비자 리렌더를 만들 때
- 큰 목록을 한 번에 렌더해 초기 로딩과 스크롤이 느릴 때

## 먼저 판단할 순서

1. React DevTools Profiler나 console.time으로 병목을 확인합니다.
2. 상태를 더 가까이 두거나 컴포넌트를 분리해 리렌더 범위를 줄입니다.
3. props identity가 안정적인지 확인한 뒤 memoization boundary를 둡니다.
4. 초기 화면에 필요 없는 코드는 lazy loading으로 늦게 가져옵니다.
5. 큰 목록은 pagination, infinite query, virtualization 중 요구사항에 맞게 고릅니다.

## 빠른 선택 가이드

| 찾고 있는 문제 | 먼저 볼 패턴 | 영문명 |
| --- | --- | --- |
| memoization을 비용이 큰 하위 트리의 경계에 둡니다. | [메모이제이션 경계](./memoization-boundary/README.md) | Memoization Boundary |
| 값과 함수 identity 안정성이 필요한 지점에만 사용합니다. | [useMemo/useCallback 기준](./usememo-usecallback/README.md) | useMemo / useCallback |
| 변경 빈도가 다른 영역을 컴포넌트로 분리합니다. | [컴포넌트 분리](./component-splitting/README.md) | Component Splitting |
| 큰 목록의 렌더 비용을 줄이고 key 안정성을 보장합니다. | [목록 렌더링](./list-rendering/README.md) | List Rendering |
| 초기 화면에 필요 없는 코드를 늦게 불러옵니다. | [지연 로딩](./lazy-loading/README.md) | Lazy Loading |
| 무거운 계산을 필요한 시점에만 실행하거나 캐시합니다. | [비싼 계산 처리](./expensive-calculation/README.md) | Expensive Calculation |
| 렌더 횟수와 원인을 관찰해 최적화 대상을 찾습니다. | [렌더 추적](./render-tracking/README.md) | Render Tracking |
| Context value와 Provider 범위를 쪼개 불필요한 렌더를 줄입니다. | [Context 최적화](./context-optimization/README.md) | Context Optimization |

## 선택 신호

| 코드에서 보이는 신호 | 우선 검토할 패턴 |
| --- | --- |
| 렌더가 어디서 발생하는지 모름 | 렌더 추적 |
| 상태 변경 범위가 너무 넓음 | 컴포넌트 분리 |
| 비싼 하위 트리가 반복 렌더됨 | 메모이제이션 경계 |
| 값/함수 identity가 문제 | useMemo/useCallback 기준 |
| 초기 번들이 큼 | 지연 로딩 |
| 큰 목록이 느림 | 목록 렌더링 |

## 패턴별 핵심 메모

- [메모이제이션 경계](./memoization-boundary/README.md) (Memoization Boundary): 부모가 리렌더될 때마다 자식도 리렌더됩니다. 렌더 비용이 큰 자식을 React.memo로 감싸면 props가 바뀌지 않는 한 리렌더를 건너뜁니다. 단, 모든 컴포넌트에 적용하면 memo 비교 비용이 오히려 더 커집니다. 핵심: 비용이 큰 자식에만 적용하고 기본 컴포넌트에는 불필요하다.
- [useMemo/useCallback 기준](./usememo-usecallback/README.md) (useMemo / useCallback): useMemo와 useCallback은 비용을 줄이는 것처럼 보이지만 캐시 관리와 deps 비교 비용이 있습니다. "모든 곳에 useCallback"은 오히려 코드를 복잡하게만 합니다. 정말 필요한 두 가지 상황: 비싼 계산, 안정적 참조가 필요할 때입니다. 핵심: useCallback: memo된 자식에 넘기는 함수나 useEffect deps.
- [컴포넌트 분리](./component-splitting/README.md) (Component Splitting): 타이머처럼 자주 바뀌는 부분과 정적인 콘텐츠가 같은 컴포넌트에 있으면, 타이머가 바뀔 때마다 정적 콘텐츠도 리렌더됩니다. 분리하면 바뀌는 부분만 리렌더되고 나머지는 건드리지 않습니다. 핵심: 변경 빈도가 다른 UI를 별도 컴포넌트로 추출한다.
- [목록 렌더링](./list-rendering/README.md) (List Rendering): 10,000개 항목을 한 번에 렌더하면 초기 렌더가 수초 걸립니다. 가상화(virtualization)는 보이는 항목만 렌더해 DOM 노드 수를 일정하게 유지합니다. 안정적인 key는 불필요한 DOM 재생성을 막습니다. 핵심: 1000개 이상 목록에는 가상화(react-window, TanStack Virtual)를 검토한다.
- [지연 로딩](./lazy-loading/README.md) (Lazy Loading): 모달, 관리자 패널, 세부 화면처럼 첫 화면에서 보이지 않는 컴포넌트가 초기 번들에 포함되면 LCP가 늦어집니다. React.lazy로 코드 스플리팅하면 초기 번들 크기를 줄여 첫 로딩이 빨라집니다. 핵심: React.lazy + Suspense로 컴포넌트 수준에서 분리한다.
- [비싼 계산 처리](./expensive-calculation/README.md) (Expensive Calculation): 대용량 데이터 정렬, 복잡한 필터링을 매 렌더마다 실행하면 타이핑 한 번에도 수십 ms가 걸릴 수 있습니다. useMemo로 의존 값이 바뀔 때만 재계산하면 불필요한 계산을 건너뜁니다. 핵심: useMemo의 deps가 바뀔 때만 재계산한다.
- [렌더 추적](./render-tracking/README.md) (Render Tracking): "느리다"는 느낌만으로 useCallback을 추가하는 것은 측정 없는 최적화입니다. 실제로 어떤 컴포넌트가 몇 번 렌더되는지 측정한 뒤 병목이 확인된 곳만 최적화해야 합니다. 핵심: useRef로 렌더 횟수를 세는 useRenderCount 훅을 만든다.
- [Context 최적화](./context-optimization/README.md) (Context Optimization): Context value가 바뀌면 useContext를 호출하는 모든 컴포넌트가 리렌더됩니다. 자주 바뀌는 값과 거의 안 바뀌는 값을 같은 Context에 넣으면 불필요한 리렌더가 퍼집니다. 핵심: 자주 바뀌는 값과 안정적인 값을 별도 Context로 분리한다.

## 코드 리뷰 질문

- 최적화 전후를 비교할 측정값이 있는가?
- memoized 자식에게 매 렌더 새 object/function을 넘기지 않는가?
- Context value가 자주 바뀌는 값과 안정적인 값을 함께 담고 있지 않은가?
- virtualization 도입이 접근성, 브라우저 찾기, focus 요구와 충돌하지 않는가?

## 같이 볼 카테고리

- [상태 관리](../state-management/README.md): 상태 위치가 리렌더 범위를 결정할 때
- [안티패턴](../anti-patterns/README.md): overuse memoization, inline object props를 찾을 때
- [비동기와 API 상태](../async-api/README.md): pagination/infinite query와 연결할 때

## 읽는 순서

1. 빠른 선택 가이드에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. React 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 코드 리뷰 질문으로 실제 코드에 적용할 수 있는지 확인합니다.
5. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.

## 참고 자료

- [React: memo](https://react.dev/reference/react/memo)
- [React: useMemo](https://react.dev/reference/react/useMemo)
- [web.dev: Virtualize large lists with react-window](https://web.dev/articles/virtualize-long-lists-react-window)
