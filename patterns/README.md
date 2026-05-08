# Patterns

이 디렉터리는 문제 영역별로 패턴을 나눕니다. 각 카테고리 README에서 빠른 선택 가이드를 보고 개별 패턴으로 들어갑니다.

| 카테고리 | 핵심 질문 | 포함 패턴 수 |
| --- | --- | ---: |
| [컴포넌트 조합](./component-composition/README.md) | 컴포넌트를 어떻게 나누고 조합할 것인가 | 10 |
| [상태 관리](./state-management/README.md) | 상태를 어디에 두고 어떻게 흐르게 할 것인가 | 10 |
| [Hooks](./hooks/README.md) | 재사용 로직을 어떻게 분리할 것인가 | 12 |
| [Async API](./async-api/README.md) | 서버 상태와 API 흐름을 어떻게 다룰 것인가 | 10 |
| [Forms](./forms/README.md) | 입력, 검증, 제출을 어떻게 다룰 것인가 | 10 |
| [UI State](./ui-state/README.md) | 로딩, 빈 상태, 에러, pending을 어떻게 표현할 것인가 | 8 |
| [Performance Rendering](./performance-rendering/README.md) | 렌더링 비용을 어떻게 줄이고 관찰할 것인가 | 8 |
| [Anti Patterns](./anti-patterns/README.md) | 자주 하는 실수와 개선 방향은 무엇인가 | 13 |

## 추천 탐색 흐름

1. 컴포넌트 구조가 문제면 Component Composition부터 봅니다.
2. 값이 어디에 있어야 하는지 모르겠다면 State Management를 봅니다.
3. 비동기 데이터가 얽혀 있다면 Async API와 UI State를 함께 봅니다.
4. 이미 코드 냄새가 보인다면 Anti Patterns에서 개선 방향을 먼저 확인합니다.
