# 안티패턴

영문명: Anti Patterns

React 코드에서 자주 반복되는 실수와 리팩터링 방향을 나쁜 예와 개선 예로 정리합니다.

## 이 카테고리의 질문

자주 하는 실수와 개선 방향은 무엇인가

## 언제 이 카테고리로 들어오는가

- React 코드 리뷰에서 반복되는 실수를 설명해야 한다
- 나쁜 예와 개선 방향을 비교하고 싶다
- 리팩터링 우선순위를 정해야 한다

## 빠른 선택 가이드

| 찾고 있는 문제 | 먼저 볼 패턴 | 영문명 |
| --- | --- | --- |
| 계산 가능한 값을 effect와 state로 중복 저장하는 문제를 피합니다. | [파생 상태를 effect로 만들기](./use-effect-for-derived-state/README.md) | Use Effect For Derived State |
| 지역 상태로 충분한 값을 전역 store에 올리는 문제를 피합니다. | [불필요한 전역 상태](./unnecessary-global-state/README.md) | Unnecessary Global State |
| props 전달 자체를 문제로 오해해 Context를 남용하는 일을 피합니다. | [props drilling 오해](./props-drilling-misunderstanding/README.md) | Props Drilling Misunderstanding |
| 여러 boolean prop 조합으로 상태 공간이 커지는 문제를 피합니다. | [boolean props 폭발](./boolean-props-explosion/README.md) | Boolean Props Explosion |
| 측정 없이 memo/useMemo/useCallback을 남발하는 문제를 피합니다. | [메모이제이션 남용](./overuse-memoization/README.md) | Overuse Memoization |
| 동적 리스트에서 배열 index를 key로 쓰는 문제를 피합니다. | [index를 key로 사용](./index-as-key/README.md) | Index as Key |
| 하나의 컴포넌트가 데이터, 상태, 표현을 모두 떠안는 문제를 피합니다. | [거대한 컴포넌트](./large-component/README.md) | Large Component |
| 서버 응답 구조가 UI 컴포넌트까지 새는 문제를 피합니다. | [API 응답 UI 누수](./api-response-leaking-to-ui/README.md) | API Response Leaking to UI |
| 같은 요청 상태를 여러 boolean으로 중복 관리하는 문제를 피합니다. | [중복 로딩 상태](./duplicated-loading-state/README.md) | Duplicated Loading State |
| 서버 상태와 클라이언트 UI 상태의 소유권을 섞는 문제를 피합니다. | [서버/클라이언트 상태 혼합](./mixed-server-client-state/README.md) | Mixed Server / Client State |
| 매 렌더마다 새 객체 prop을 내려 memoization을 깨는 문제를 피합니다. | [인라인 객체 props](./inline-object-props/README.md) | Inline Object Props |
| 불안정한 콜백 때문에 하위 컴포넌트 렌더가 퍼지는 문제를 피합니다. | [불안정한 콜백](./unstable-callbacks/README.md) | Unstable Callbacks |
| 구독, 타이머, 외부 연결을 cleanup하지 않는 문제를 피합니다. | [effect cleanup 누락](./effect-cleanup-missing/README.md) | Effect Cleanup Missing |

## 읽는 순서

1. 위 표에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. React 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.
