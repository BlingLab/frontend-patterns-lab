# 컴포넌트 조합

컴포넌트의 외부 API와 내부 책임 경계를 정하는 패턴입니다.

## 이 카테고리의 질문

컴포넌트를 어떻게 나누고 조합할 것인가

## 언제 이 카테고리로 들어오는가

- 화면 조각을 재사용해야 한다
- 부모와 자식의 책임이 섞인다
- UI 라이브러리처럼 조합 가능한 API가 필요하다

## 빠른 선택 가이드

| 찾고 있는 문제 | 먼저 볼 패턴 | 패턴 형태 |
| --- | --- | --- |
| 레이아웃은 부모가 제공하고 실제 콘텐츠는 children으로 주입합니다. | [Children Composition](./children-composition/README.md) | Composition |
| 하나의 루트와 협력하는 하위 컴포넌트를 묶어 선언적인 API를 만듭니다. | [Compound Component](./compound-component/README.md) | Component Family |
| 명명된 slot prop으로 화면의 특정 영역을 호출부가 채우게 합니다. | [Slot Pattern](./slot-pattern/README.md) | Named Composition |
| 상태, 이벤트, 접근성만 제공하고 마크업과 스타일은 호출부가 결정합니다. | [Headless Component](./headless-component/README.md) | Behavior Only |
| value/onChange와 defaultValue를 모두 지원해 상태 소유권을 선택하게 합니다. | [Controlled Uncontrolled](./controlled-uncontrolled/README.md) | State Ownership API |
| 상태와 동작을 함수 인자로 넘기고 렌더링은 호출부 함수가 담당합니다. | [Render Props](./render-props/README.md) | Function as Child |
| 공유 관심사를 Provider로 감싸고 필요한 하위 컴포넌트만 context를 읽게 합니다. | [Provider Pattern](./provider-pattern/README.md) | Context Boundary |
| as 또는 asChild API로 렌더링할 요소를 바꾸면서 공통 스타일과 동작을 재사용합니다. | [Polymorphic Component](./polymorphic-component/README.md) | Element Polymorphism |
| getButtonProps 같은 함수로 필요한 props를 안전하게 합성합니다. | [Props Getter](./props-getter/README.md) | Prop Composition |
| Container는 데이터와 상태를, Presenter는 순수한 표현을 담당합니다. | [Container Presenter](./container-presenter/README.md) | Responsibility Split |

## 읽는 순서

1. 위 표에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.

## 참고 자료

- [React: Passing props to a component](https://react.dev/learn/passing-props-to-a-component)
- [React: createContext](https://react.dev/reference/react/createContext)
- [Radix UI: Slot](https://www.radix-ui.com/primitives/docs/utilities/slot)
