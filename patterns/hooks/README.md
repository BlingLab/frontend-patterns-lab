# Hooks

컴포넌트에서 반복되는 상태/이벤트/비동기 로직을 커스텀 훅으로 분리하는 기준입니다.

## 이 카테고리의 질문

재사용 로직을 어떻게 분리할 것인가

## 언제 이 카테고리로 들어오는가

- 같은 로직이 여러 컴포넌트에 반복된다
- 컴포넌트가 화면과 절차 로직을 동시에 품는다
- 구독과 cleanup을 안전하게 재사용하고 싶다

## 빠른 선택 가이드

| 찾고 있는 문제 | 먼저 볼 패턴 | 패턴 형태 |
| --- | --- | --- |
| 도메인 로직을 커스텀 훅으로 캡슐화하고 컴포넌트는 렌더링에 집중합니다. | [Custom Hook Boundary](./custom-hook-boundary/README.md) | Custom Hook Boundary |
| controlled/uncontrolled 컴포넌트의 상태 소유권 분기를 훅 하나로 표준화합니다. | [Use Controllable State](./use-controllable-state/README.md) | Reusable State Hook |
| open/close/toggle 상태를 공통 인터페이스로 제공합니다. | [Use Disclosure](./use-disclosure/README.md) | Boolean UI Hook |
| 연속 입력을 일정 시간 멈춘 뒤 한 번만 반영합니다. | [Use Debounce](./use-debounce/README.md) | Timing Hook |
| 반복 이벤트를 정해진 주기 안에서 최대 한 번만 처리합니다. | [Use Throttle](./use-throttle/README.md) | Timing Hook |
| 직전 렌더의 값을 ref에 보관해 현재 값과 비교합니다. | [Use Previous](./use-previous/README.md) | Ref Hook |
| 특정 요소 바깥의 pointer 이벤트를 감지해 닫기 동작을 실행합니다. | [Use Outside Click](./use-outside-click/README.md) | DOM Event Hook |
| DOM 이벤트 구독과 해제를 훅 경계 안에 둡니다. | [Use Event Listener](./use-event-listener/README.md) | DOM Event Hook |
| 비동기 작업의 loading/data/error 상태를 공통 모델로 다룹니다. | [Use Async](./use-async/README.md) | Async Hook |
| 마운트 여부를 ref로 추적해 비동기 완료 후 안전하게 확인합니다. | [Use Mounted](./use-mounted/README.md) | Lifecycle Guard Hook |
| 조회 훅과 변경 명령 훅을 분리해 읽기/쓰기 책임을 나눕니다. | [Query Command Hook](./query-command-hook/README.md) | Query Command Split |
| 작은 훅들을 조합해 도메인 훅을 만듭니다. | [Hook Composition](./hook-composition/README.md) | Hook Composition |

## 읽는 순서

1. 위 표에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.

## 참고 자료

- [React: Reusing logic with custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React: useEffect](https://react.dev/reference/react/useEffect)
