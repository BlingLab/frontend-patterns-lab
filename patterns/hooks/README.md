# 훅과 로직 재사용

영문명: Hooks

Custom hook은 반복 코드를 숨기는 장치가 아니라 상태ful 로직의 생명주기 규칙을 이름 붙이는 도구입니다. 구독, 비동기 상태, debounce, 외부 클릭 감지처럼 cleanup과 dependency가 중요한 코드를 컴포넌트 밖으로 이동합니다.

## 이 카테고리의 질문

재사용 로직을 어떻게 분리할 것인가

## 언제 이 카테고리로 들어오는가

- 컴포넌트가 JSX보다 effect, timer, event listener 코드로 더 길어질 때
- 같은 로직을 여러 화면에서 복사하고 있을 때
- 비동기 상태 모델과 cleanup 규칙을 매번 새로 작성할 때
- controlled/uncontrolled 같은 컴포넌트 정책을 여러 파일에서 반복할 때

## 먼저 판단할 순서

1. 먼저 컴포넌트에서 UI 표현과 동작 로직을 분리할 수 있는지 봅니다.
2. 로직이 하나의 명확한 동사나 도메인 이름으로 불릴 수 있을 때 훅으로 추출합니다.
3. DOM 이벤트나 timer가 있으면 cleanup을 훅 내부에 둡니다.
4. 작은 훅을 먼저 만들고, 도메인 훅은 조합 결과로 만듭니다.
5. 서버 상태까지 다루면 async-api의 query/mutation hook과 경계를 맞춥니다.

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

## 선택 신호

| 코드에서 보이는 신호 | 우선 검토할 패턴 |
| --- | --- |
| 도메인 폼/조회 로직이 컴포넌트에 섞임 | 커스텀 훅 경계 |
| controlled/uncontrolled 분기 반복 | useControllableState |
| modal/dropdown open 상태 반복 | useDisclosure |
| 검색 입력 요청이 과도함 | useDebounce |
| scroll/resize 이벤트가 과도함 | useThrottle |
| DOM 이벤트 구독과 cleanup 반복 | useEventListener |

## 패턴별 핵심 메모

- [커스텀 훅 경계](./custom-hook-boundary/README.md) (Custom Hook Boundary): 데이터 페칭, 이벤트 구독, 복잡한 상태 로직이 컴포넌트 안에 있으면 컴포넌트가 비대해지고 로직을 다른 화면에서 재사용하기 어렵습니다. custom hook으로 추출하면 로직과 UI의 변경 이유가 분리됩니다. 핵심: 컴포넌트는 훅에서 가져온 값과 함수만 쓴다.
- [제어 가능 상태 훅](./use-controllable-state/README.md) (useControllableState): 컴포넌트 라이브러리를 만들 때 controlled/uncontrolled를 각 컴포넌트마다 if문으로 처리하면 중복이 많고 실수가 생깁니다. useControllableState 하나로 이 분기를 중앙화하면 일관성이 보장됩니다. 핵심: value prop 유무로 자동으로 controlled/uncontrolled를 판단한다.
- [열림/닫힘 훅](./use-disclosure/README.md) (useDisclosure): Modal, Drawer, Popover마다 isOpen, setIsOpen을 선언하고 open/close 함수를 만들면 동일한 코드가 반복됩니다. useDisclosure 하나로 이 인터페이스를 표준화하면 코드가 줄고 팀 내 일관성이 생깁니다. 핵심: { isOpen, open, close, toggle } 인터페이스를 표준화한다.
- [debounce 훅](./use-debounce/README.md) (useDebounce): 검색 input에서 키를 누를 때마다 API를 호출하면 "react"를 입력하는 동안 r, re, rea, reac, react 5번의 요청이 나갑니다. debounce는 마지막 입력 후 일정 시간 기다린 뒤 한 번만 요청해 서버 부하를 줄입니다. 핵심: 입력이 멈춘 후 delay ms 뒤에 값이 안정된다.
- [throttle 훅](./use-throttle/README.md) (useThrottle): scroll, mousemove, resize 이벤트는 초당 수십~수백 번 발생합니다. 이 이벤트마다 DOM 계산이나 상태 업데이트를 하면 프레임 드랍이 생깁니다. throttle은 최대 실행 빈도를 제한해 성능을 보호합니다. 핵심: 일정 간격마다 최대 한 번 실행된다.
- [이전 값 훅](./use-previous/README.md) (usePrevious): 값이 증가했는지 감소했는지, 특정 prop이 바뀌었는지 비교하려면 이전 값이 필요합니다. useEffect의 deps로는 "변화 감지"를 하기 어렵고, usePrevious는 이 목적에 정확히 맞습니다. 핵심: ref에 보관하므로 값 변경이 리렌더를 유발하지 않는다.
- [바깥 클릭 감지 훅](./use-outside-click/README.md) (useOutsideClick): Dropdown, Popover, Combobox는 바깥을 클릭하면 닫혀야 합니다. 이 로직을 컴포넌트마다 직접 작성하면 이벤트 위임, 버블링, ref 관리가 반복됩니다. useOutsideClick으로 추출하면 재사용과 테스트가 쉬워집니다. 핵심: ref로 영역을 지정하고 바깥 클릭 시 콜백을 실행한다.
- [이벤트 구독 훅](./use-event-listener/README.md) (useEventListener): useEffect로 addEventListener를 하면 cleanup에서 removeEventListener를 빠뜨리기 쉽습니다. useEventListener로 추출하면 구독과 해제가 항상 함께 다뤄지고 의도치 않은 메모리 누수를 방지합니다. 핵심: effect 안에서 add/remove를 한 쌍으로 처리한다.
- [비동기 상태 훅](./use-async/README.md) (useAsync): 컴포넌트마다 isLoading, error, data를 따로 선언하면 같은 패턴이 반복되고 각 경우 처리를 빠뜨리기 쉽습니다. useAsync 하나로 이 모델을 표준화하면 비동기 처리가 일관됩니다. 핵심: idle → loading → success/error 상태 머신을 내장한다.
- [마운트 여부 훅](./use-mounted/README.md) (useMounted): 비동기 요청이 완료됐을 때 컴포넌트가 이미 언마운트됐다면 setState를 해도 아무것도 없고 React 경고가 납니다. isMounted 체크로 이를 방지합니다. AbortController가 더 좋지만 isMounted 체크도 알아야 할 패턴입니다. 핵심: useRef로 마운트 여부를 추적한다.
- [조회/명령 훅 분리](./query-command-hook/README.md) (Query / Command Hook): 읽기(query)와 쓰기(mutation)를 한 훅에 모으면 컴포넌트가 이 훅 하나만 있어도 데이터를 바꿀 권한을 갖습니다. 분리하면 각 컴포넌트에 정확히 필요한 권한만 줄 수 있고 테스트도 독립적입니다. 핵심: useUsers()는 조회만, useDeleteUser()는 명령만 담당한다.
- [훅 조합](./hook-composition/README.md) (Hook Composition): 하나의 거대한 훅이 검색어 debounce, URL 동기화, API 호출, 에러 처리를 모두 하면 재사용과 테스트가 어렵습니다. 작은 훅을 조합하면 각 부분을 독립적으로 교체하거나 테스트할 수 있습니다. 핵심: useDebounce + useAsync + useUrlState → useProductSearch.

## 코드 리뷰 질문

- 훅 이름이 내부 구현이 아니라 제공하는 행동을 설명하는가?
- 반환값이 너무 많아 호출부가 훅 내부 정책을 다시 조립하고 있지 않은가?
- effect dependency와 cleanup이 누락되어 stale closure나 중복 구독이 생기지 않는가?
- 이 훅이 한 번만 쓰이는 임시 추상화가 아닌가?

## 같이 볼 카테고리

- [컴포넌트 조합](../component-composition/README.md): UI API 분리가 더 중요한 경우
- [비동기와 API 상태](../async-api/README.md): 서버 조회/쓰기 훅을 만들 때
- [렌더링 성능](../performance-rendering/README.md): callback identity와 memoization이 얽힐 때

## 읽는 순서

1. 빠른 선택 가이드에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. React 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 코드 리뷰 질문으로 실제 코드에 적용할 수 있는지 확인합니다.
5. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.

## 참고 자료

- [React: Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [React: useEffect](https://react.dev/reference/react/useEffect)
