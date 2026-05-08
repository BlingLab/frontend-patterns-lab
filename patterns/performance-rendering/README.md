# Performance Rendering

불필요한 렌더를 줄이고, 큰 목록과 비싼 계산을 다루는 기준입니다.

## 이 카테고리의 질문

렌더링 비용을 어떻게 줄이고 관찰할 것인가

## 언제 이 카테고리로 들어오는가

- 렌더링이 실제로 느리다
- 큰 목록이나 무거운 계산이 있다
- Context나 props identity 때문에 리렌더가 퍼진다

## 빠른 선택 가이드

| 찾고 있는 문제 | 먼저 볼 패턴 | 패턴 형태 |
| --- | --- | --- |
| memoization을 비용이 큰 하위 트리의 경계에 둡니다. | [Memoization Boundary](./memoization-boundary/README.md) | Memo Boundary |
| 값과 함수 identity 안정성이 필요한 지점에만 useMemo/useCallback을 씁니다. | [useMemo / useCallback](./usememo-usecallback/README.md) | Referential Stability |
| 변경 빈도가 다른 영역을 컴포넌트로 분리합니다. | [Component Splitting](./component-splitting/README.md) | Render Boundary |
| 큰 목록의 렌더 비용을 줄이고 key 안정성을 보장합니다. | [List Rendering](./list-rendering/README.md) | List Performance |
| 초기 화면에 필요 없는 코드를 늦게 불러옵니다. | [Lazy Loading](./lazy-loading/README.md) | Code Splitting |
| 무거운 계산을 필요한 시점에만 실행하거나 캐시합니다. | [Expensive Calculation](./expensive-calculation/README.md) | Compute Optimization |
| 렌더 횟수와 원인을 관찰해 최적화 대상을 찾습니다. | [Render Tracking](./render-tracking/README.md) | Observability |
| Context value와 Provider 범위를 쪼개 불필요한 렌더를 줄입니다. | [Context Optimization](./context-optimization/README.md) | Context Performance |

## 읽는 순서

1. 위 표에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.

## 참고 자료

- [React: memo](https://react.dev/reference/react/memo)
- [React: useMemo](https://react.dev/reference/react/useMemo)
- [web.dev: Virtualize large lists with react-window](https://web.dev/articles/virtualize-long-lists-react-window)
