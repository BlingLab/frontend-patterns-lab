# Anti Patterns

처음에는 편해 보이지만 규모가 커질수록 변경 비용을 키우는 구조를 정리합니다.

## 이 카테고리의 질문

자주 하는 실수와 개선 방향은 무엇인가

## 언제 이 카테고리로 들어오는가

- 리뷰에서 반복되는 냄새를 설명해야 한다
- 나쁜 예와 개선 예를 비교하고 싶다
- 패턴 적용 전 문제를 먼저 이해하고 싶다

## 빠른 선택 가이드

| 찾고 있는 문제 | 먼저 볼 패턴 | 패턴 형태 |
| --- | --- | --- |
| 계산 가능한 값을 effect와 state로 중복 저장하지 않습니다. | [Use Effect For Derived State](./use-effect-for-derived-state/README.md) | Derived State Smell |
| 지역 상태로 충분한 값을 전역 store에 올리지 않습니다. | [Unnecessary Global State](./unnecessary-global-state/README.md) | State Scope Smell |
| props 전달 자체를 문제로 오해해 Context를 남용하지 않습니다. | [Props Drilling Misunderstanding](./props-drilling-misunderstanding/README.md) | Composition Smell |
| 여러 boolean prop 조합으로 컴포넌트 상태 공간을 폭발시키지 않습니다. | [Boolean Props Explosion](./boolean-props-explosion/README.md) | API Smell |
| 측정 없이 memo/useMemo/useCallback을 남발하지 않습니다. | [Overuse Memoization](./overuse-memoization/README.md) | Performance Smell |
| 동적 리스트에서 배열 index를 key로 쓰지 않습니다. | [Index As Key](./index-as-key/README.md) | Identity Smell |
| 하나의 컴포넌트가 데이터, 상태, 표현, side effect를 모두 갖지 않게 합니다. | [Large Component](./large-component/README.md) | Responsibility Smell |
| API 응답 구조를 UI 컴포넌트에 직접 노출하지 않습니다. | [API Response Leaking to UI](./api-response-leaking-to-ui/README.md) | Boundary Smell |
| 같은 요청 상태를 여러 boolean으로 중복 관리하지 않습니다. | [Duplicated Loading State](./duplicated-loading-state/README.md) | State Model Smell |
| 서버 상태와 클라이언트 UI 상태의 소유권을 섞지 않습니다. | [Mixed Server / Client State](./mixed-server-client-state/README.md) | Ownership Smell |
| 매 렌더마다 새 객체 prop을 내려 memoization을 깨지 않게 합니다. | [Inline Object Props](./inline-object-props/README.md) | Referential Identity Smell |
| 불안정한 콜백 때문에 하위 컴포넌트 렌더가 퍼지지 않게 합니다. | [Unstable Callbacks](./unstable-callbacks/README.md) | Referential Identity Smell |
| 구독, 타이머, 외부 연결은 effect cleanup으로 정리합니다. | [Effect Cleanup Missing](./effect-cleanup-missing/README.md) | Effect Lifecycle Smell |

## 읽는 순서

1. 위 표에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.

## 참고 자료

- [React: useEffect](https://react.dev/reference/react/useEffect)
- [React: Preserving and resetting state](https://react.dev/learn/preserving-and-resetting-state)
- [React: memo](https://react.dev/reference/react/memo)
