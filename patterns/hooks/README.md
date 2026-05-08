# 훅과 로직 재사용

영문명: Hooks

반복되는 React 로직을 custom hook으로 분리하고 조합하는 기준을 다룹니다.

## 이 카테고리의 질문

재사용 로직을 어떻게 분리할 것인가

## 언제 이 카테고리로 들어오는가

- 여러 컴포넌트에서 같은 로직이 반복된다
- effect, event listener, async cleanup을 한 곳에서 관리하고 싶다
- custom hook의 경계와 반환 API가 애매하다

## 빠른 선택 가이드

| 찾고 있는 문제 | 먼저 볼 패턴 | 영문명 |
| --- | --- | --- |
| 도메인 로직을 custom hook으로 캡슐화하고 컴포넌트는 렌더링에 집중합니다. | [커스텀 훅 경계](./custom-hook-boundary/README.md) | Custom Hook Boundary |
| controlled/uncontrolled 상태 소유권 분기를 훅 하나로 표준화합니다. | [제어 가능 상태 훅](./use-controllable-state/README.md) | useControllableState |
| modal, drawer, dropdown의 open/close/toggle 상태를 공통 인터페이스로 다룹니다. | [열림/닫힘 훅](./use-disclosure/README.md) | useDisclosure |
| 연속 입력을 일정 시간 멈춘 뒤 마지막 값만 반영합니다. | [debounce 훅](./use-debounce/README.md) | useDebounce |
| 반복 이벤트의 실행 빈도를 일정 간격으로 제한합니다. | [throttle 훅](./use-throttle/README.md) | useThrottle |
| 직전 렌더의 값을 ref에 보관해 현재 값과 비교합니다. | [이전 값 훅](./use-previous/README.md) | usePrevious |
| 특정 영역 바깥 pointer 이벤트를 감지합니다. | [바깥 클릭 감지 훅](./use-outside-click/README.md) | useOutsideClick |
| DOM 이벤트 구독과 cleanup을 훅 경계 안에 둡니다. | [이벤트 구독 훅](./use-event-listener/README.md) | useEventListener |
| 비동기 작업의 loading/data/error 상태를 공통 모델로 다룹니다. | [비동기 상태 훅](./use-async/README.md) | useAsync |
| 컴포넌트 마운트 여부를 비동기 흐름에서 확인합니다. | [마운트 여부 훅](./use-mounted/README.md) | useMounted |
| 읽기 훅과 쓰기 명령 훅을 분리합니다. | [조회/명령 훅 분리](./query-command-hook/README.md) | Query / Command Hook |
| 작은 훅을 조합해 더 큰 도메인 훅을 만듭니다. | [훅 조합](./hook-composition/README.md) | Hook Composition |

## 읽는 순서

1. 위 표에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. React 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.
