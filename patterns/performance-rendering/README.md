# 렌더링 성능

영문명: Performance Rendering

React 렌더링 비용을 줄이고 관찰하는 memoization, lazy loading, list rendering, context 최적화를 다룹니다.

## 이 카테고리의 질문

렌더링 비용을 어떻게 줄이고 관찰할 것인가

## 언제 이 카테고리로 들어오는가

- 렌더링이 느리거나 불필요하게 반복된다
- memoization을 어디에 둬야 할지 모르겠다
- 큰 목록, lazy loading, context 리렌더 문제가 있다

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

## 읽는 순서

1. 위 표에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. React 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.
