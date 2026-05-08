# 컴포넌트 조합

영문명: Component Composition

React 컴포넌트의 외부 API, children, slot, Context, headless 구조처럼 화면 조각을 어떻게 나누고 합칠지 다룹니다.

## 이 카테고리의 질문

컴포넌트를 어떻게 나누고 조합할 것인가

## 언제 이 카테고리로 들어오는가

- React 컴포넌트 props와 children 구조가 복잡해진다
- 공통 UI를 재사용하고 싶은데 호출부 API가 커진다
- Context, headless, slot 같은 조합 방식 중 무엇을 써야 할지 애매하다

## 빠른 선택 가이드

| 찾고 있는 문제 | 먼저 볼 패턴 | 영문명 |
| --- | --- | --- |
| 공통 레이아웃은 컴포넌트가 맡고 실제 내용은 children으로 주입합니다. | [children 조합](./children-composition/README.md) | Children Composition |
| Root, Trigger, Panel처럼 협력하는 하위 컴포넌트를 하나의 API로 묶습니다. | [합성 컴포넌트](./compound-component/README.md) | Compound Component |
| header, actions, footer처럼 이름 있는 영역을 호출부가 채우게 합니다. | [슬롯 패턴](./slot-pattern/README.md) | Slot Pattern |
| 상태와 동작만 제공하고 마크업과 스타일은 호출부가 결정합니다. | [헤드리스 컴포넌트](./headless-component/README.md) | Headless Component |
| 내부 상태 사용과 외부 상태 제어를 모두 지원합니다. | [제어/비제어 컴포넌트](./controlled-uncontrolled/README.md) | Controlled / Uncontrolled |
| 상태와 동작을 함수 인자로 넘기고 렌더링은 호출부가 담당합니다. | [렌더 프롭스](./render-props/README.md) | Render Props |
| 공유 관심사를 Context Provider로 공급하고 필요한 하위 컴포넌트만 읽게 합니다. | [Provider 패턴](./provider-pattern/README.md) | Provider Pattern |
| 공통 스타일을 유지하면서 as prop으로 실제 HTML element를 바꿉니다. | [다형성 컴포넌트](./polymorphic-component/README.md) | Polymorphic Component |
| 접근성, 이벤트, 상태 props를 안전하게 합성해 호출부에 제공합니다. | [props getter 패턴](./props-getter/README.md) | Props Getter |
| 데이터 준비와 화면 표현의 책임을 분리합니다. | [컨테이너/프리젠터](./container-presenter/README.md) | Container / Presenter |

## 읽는 순서

1. 위 표에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. React 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.
