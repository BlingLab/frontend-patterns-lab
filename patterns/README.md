# Patterns

React 실무 문제를 기준으로 패턴을 나눈 디렉터리입니다. 폴더명은 영어로 유지하지만, 문서에서는 한글 이름을 먼저 사용합니다.

| 카테고리 | 영문명 | 핵심 질문 | 포함 패턴 수 |
| --- | --- | --- | ---: |
| [컴포넌트 조합](./component-composition/README.md) | Component Composition | 컴포넌트를 어떻게 나누고 조합할 것인가 | 10 |
| [상태 관리](./state-management/README.md) | State Management | 상태를 어디에 두고 어떻게 흐르게 할 것인가 | 10 |
| [훅과 로직 재사용](./hooks/README.md) | Hooks | 재사용 로직을 어떻게 분리할 것인가 | 12 |
| [비동기와 API 상태](./async-api/README.md) | Async API | 서버 상태와 API 흐름을 어떻게 다룰 것인가 | 10 |
| [폼과 검증](./forms/README.md) | Forms | 입력, 검증, 제출을 어떻게 다룰 것인가 | 10 |
| [UI 상태 표현](./ui-state/README.md) | UI State | 로딩, 빈 상태, 에러, pending을 어떻게 표현할 것인가 | 8 |
| [렌더링 성능](./performance-rendering/README.md) | Performance Rendering | 렌더링 비용을 어떻게 줄이고 관찰할 것인가 | 8 |
| [안티패턴](./anti-patterns/README.md) | Anti Patterns | 자주 하는 실수와 개선 방향은 무엇인가 | 13 |

## 추천 탐색 흐름

1. 컴포넌트 구조가 문제면 컴포넌트 조합부터 봅니다.
2. 값이 어디에 있어야 하는지 모르겠다면 상태 관리를 봅니다.
3. 비동기 데이터가 얽혀 있다면 비동기와 API 상태, UI 상태 표현을 함께 봅니다.
4. 이미 코드 냄새가 보인다면 안티패턴에서 개선 방향을 먼저 확인합니다.
