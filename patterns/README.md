# Patterns

React 실무 문제를 기준으로 패턴을 나눈 디렉터리입니다. 폴더명은 영어로 유지하지만 문서에서는 한글 이름을 먼저 사용합니다. 이 문서는 전체 지도이고, 각 카테고리 README는 패턴 선택 기준과 코드 리뷰 질문을 제공합니다.

## 카테고리 지도

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

1. 컴포넌트 API나 JSX 조합이 문제라면 [컴포넌트 조합](./component-composition/README.md)부터 봅니다.
2. 값이 어디에 있어야 하는지 모르겠다면 [상태 관리](./state-management/README.md)를 봅니다.
3. 서버 데이터가 얽혀 있다면 [비동기와 API 상태](./async-api/README.md)와 [UI 상태 표현](./ui-state/README.md)을 함께 봅니다.
4. 입력, 검증, 제출 중복 문제가 중심이면 [폼과 검증](./forms/README.md)을 봅니다.
5. 느린 화면을 고치려면 [렌더링 성능](./performance-rendering/README.md)에서 측정과 경계 조정을 먼저 확인합니다.
6. 이미 반복되는 문제 징후가 보인다면 [안티패턴](./anti-patterns/README.md)에서 개선 방향을 먼저 확인합니다.

## 선택할 때 피해야 할 흐름

- 패턴 이름을 먼저 정하고 코드를 끼워 맞추지 않습니다. 현재 변경 비용과 버그 흐름에서 출발합니다.
- Context, memoization, global store처럼 강한 도구는 실제 필요가 확인된 뒤 적용합니다.
- 좋은 예제는 정답 코드가 아니라 책임 경계를 보여주는 기준선입니다. 실제 제품 코드에서는 팀의 디자인 시스템, API 도구, 폼 라이브러리에 맞춰 조정합니다.

## 문서 읽는 법

각 개별 패턴 README는 같은 구조를 따릅니다. "왜 필요한가"로 문제 비용을 확인하고, "언제 사용하는가/피해야 하는가"로 적용 여부를 판단한 뒤, "코드 리뷰 체크리스트"와 "테스트와 검증 포인트"로 실제 코드에 적용합니다.
