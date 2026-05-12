# 컴포넌트 조합

영문명: Component Composition

React 컴포넌트의 외부 API, children, slot, Context, headless 구조처럼 화면 조각을 나누고 다시 합치는 기준을 다룹니다. 핵심은 파일을 많이 쪼개는 것이 아니라 호출부가 알아야 하는 책임을 줄이는 것입니다.

## 이 카테고리의 질문

컴포넌트를 어떻게 나누고 조합할 것인가

## 언제 이 카테고리로 들어오는가

- 컴포넌트 props가 늘어나고 boolean/variant 조합이 복잡해질 때
- 공통 UI를 만들었지만 호출부가 오히려 이해하기 어려워질 때
- children, slot, compound component, provider 중 어떤 API가 맞는지 애매할 때
- 접근성 속성이나 이벤트 핸들러를 여러 하위 요소가 함께 써야 할 때

## 먼저 판단할 순서

1. 먼저 children composition으로 wrapper가 내용 타입을 몰라도 되는지 확인합니다.
2. 영역이 여러 개면 slot pattern으로 이름을 붙일 수 있는지 봅니다.
3. 하위 요소가 같은 상태와 접근성 연결을 공유하면 compound component를 검토합니다.
4. 마크업과 스타일 자유도가 더 중요하면 headless component나 props getter를 봅니다.
5. 데이터 준비와 화면 표현이 섞이면 container/presenter 또는 custom hook 경계를 봅니다.

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

## 선택 신호

| 코드에서 보이는 신호 | 우선 검토할 패턴 |
| --- | --- |
| 내용만 바뀌는 wrapper | children 조합 |
| header/actions/footer처럼 영역이 명확함 | 슬롯 패턴 |
| Trigger/Panel/Item이 협력함 | 합성 컴포넌트 |
| 동작은 같고 마크업은 달라야 함 | 헤드리스 컴포넌트 |
| 같은 스타일로 button/a/router link를 지원함 | 다형성 컴포넌트 |
| 데이터 준비와 표현이 한 파일에 섞임 | 컨테이너/프리젠터 |

## 패턴별 핵심 메모

- [children 조합](./children-composition/README.md) (Children Composition): wrapper 컴포넌트가 내부 콘텐츠 타입을 직접 알기 시작하면 variant prop이 쌓이고, 결국 레이아웃 컴포넌트가 여러 도메인 정책을 모두 아는 거대한 조건문이 됩니다. children으로 책임을 나누면 껍데기와 내용의 변경 이유가 분리됩니다. 핵심: wrapper는 테두리, 간격, 제목만 책임진다.
- [합성 컴포넌트](./compound-component/README.md) (Compound Component): Tabs처럼 여러 하위 요소가 같은 상태를 공유해야 하는 UI를 단일 items 배열로 처리하면, 나중에 badge·disabled·아이콘 같은 요구사항이 생길 때마다 컴포넌트 내부를 수정해야 합니다. Compound component는 상태 연결은 내부가 맡고 JSX 구조는 호출부가 자유롭게 조합하게 합니다. 핵심: Root가 Context로 상태를 제공하고 Trigger/Panel이 읽는다.
- [슬롯 패턴](./slot-pattern/README.md) (Slot Pattern): 단일 children은 구역 의미가 모호합니다. Page 레이아웃에 제목, 액션 버튼, 본문이 한 children으로 들어오면 컴포넌트 내부에서 순서나 타입을 강제할 수밖에 없습니다. slot prop은 각 영역에 이름을 부여해 의도를 명확히 합니다. 핵심: header, footer, actions처럼 영역 이름이 명시된다.
- [헤드리스 컴포넌트](./headless-component/README.md) (Headless Component): 디자인 시스템이 없는 환경에서 Combobox 같은 복잡한 상호작용을 처음부터 만들면, 동작과 UI가 하나의 컴포넌트에 묶여 다른 디자인에 재사용하기 어렵습니다. Headless는 동작을 훅이나 렌더리스 컴포넌트로 분리해 어떤 마크업에도 결합할 수 있게 합니다. 핵심: 같은 동작 로직을 완전히 다른 시각 디자인에 재사용한다.
- [제어/비제어 컴포넌트](./controlled-uncontrolled/README.md) (Controlled / Uncontrolled): 라이브러리 컴포넌트를 만들 때 controlled만 지원하면 간단한 사용에도 상태 관리가 강제되고, uncontrolled만 지원하면 외부에서 값을 제어할 수 없습니다. 두 모드를 동시에 지원하면 사용자가 필요에 따라 선택할 수 있습니다. 핵심: value prop이 없으면 내부 상태로 동작한다.
- [렌더 프롭스](./render-props/README.md) (Render Props): Custom hook이 주류가 됐지만 render props는 JSX 트리 안에서 상태를 공유해야 할 때 여전히 유효합니다. 특히 특정 컨텍스트의 상태를 자식 컴포넌트가 아닌 render 함수로 소비해야 할 때 명확합니다. 핵심: children을 함수로 받아 (state) => JSX 형태로 쓴다.
- [Provider 패턴](./provider-pattern/README.md) (Provider Pattern): props drilling이 3단계 이상 깊어지거나 완전히 무관한 컴포넌트들이 같은 값을 필요로 할 때, Provider로 공통 조상에 상태를 두고 소비자만 context를 읽게 하면 중간 컴포넌트에 prop이 퍼지지 않습니다. 핵심: theme, auth, locale 같은 앱 전역 관심사에 적합하다.
- [다형성 컴포넌트](./polymorphic-component/README.md) (Polymorphic Component): Button 컴포넌트를 링크로도 써야 할 때, ButtonLink, ButtonAnchor처럼 별도 컴포넌트를 만들면 동일한 스타일 코드가 중복됩니다. as prop 하나로 렌더 element를 바꾸면 스타일은 유지하면서 시맨틱을 바꿀 수 있습니다. 핵심: as="a"면 링크, as="button"이면 버튼으로 렌더된다.
- [props getter 패턴](./props-getter/README.md) (Props Getter): Headless 훅이 onClick을 제공하고 호출부도 onClick이 있으면 한쪽이 덮어씁니다. props getter는 라이브러리의 필수 핸들러와 사용자 핸들러를 안전하게 병합해 둘 다 실행되게 합니다. 핵심: getButtonProps()가 aria-*, onClick, role을 한번에 반환한다.
- [컨테이너/프리젠터](./container-presenter/README.md) (Container / Presenter): 한 컴포넌트가 API 호출, 상태 관리, 이벤트 처리, JSX 렌더링을 모두 하면 테스트하기 어렵고 재사용도 불가능합니다. Container는 데이터를 준비하고 Presenter는 props만 받아 렌더링하면 각각 독립적으로 테스트할 수 있습니다. 핵심: Presenter는 순수 함수처럼 props → JSX만 담당한다.

## 코드 리뷰 질문

- 새 요구사항이 생겼을 때 호출부만 바꾸면 되는가, 공통 컴포넌트도 매번 바꿔야 하는가?
- 컴포넌트 이름과 JSX 구조만 보고 어떤 영역에 무엇이 들어가는지 알 수 있는가?
- Context나 Provider가 단순 props 전달 회피용으로 과하게 쓰이지 않았는가?
- 접근성 속성과 keyboard interaction이 조합 API 안에서 일관되게 보장되는가?

## 같이 볼 카테고리

- [상태 관리](../state-management/README.md): 조합 경계와 상태 소유권을 함께 판단해야 할 때
- [훅과 로직 재사용](../hooks/README.md): UI보다 동작 로직 분리가 핵심일 때
- [UI 상태 표현](../ui-state/README.md): Dialog, empty, error 같은 화면 상태와 결합될 때

## 읽는 순서

1. 빠른 선택 가이드에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. React 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 코드 리뷰 질문으로 실제 코드에 적용할 수 있는지 확인합니다.
5. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.

## 참고 자료

- [React: Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [React: Thinking in React](https://react.dev/learn/thinking-in-react)
- [Radix UI: Composition](https://www.radix-ui.com/primitives/docs/guides/composition)
