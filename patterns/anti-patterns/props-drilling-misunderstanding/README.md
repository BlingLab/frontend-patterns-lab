# props drilling 오해

영문명: Props Drilling Misunderstanding
폴더: `anti-patterns/props-drilling-misunderstanding`

## 한 줄 요약

props 전달 자체를 문제로 오해해 Context를 남용하는 일을 피합니다.

## 패턴 형태

- 분류: 안티패턴
- 형태: 문제 징후 / 리팩터링 가이드
- 핵심 질문: 지금 보이는 코드 냄새가 실제 버그와 변경 비용으로 이어지는가

## 왜 필요한가

2-3단계 props 전달은 자연스럽고 명시적입니다. "drilling이 싫다"는 이유로 모든 곳에 Context를 쓰면 어디서 값이 오는지 추적이 어려워집니다. 진짜 drilling 문제는 5단계 이상, 또는 무관한 컴포넌트를 통해 전달될 때입니다.

안티패턴은 금지 목록이 아니라 리팩터링 신호입니다. React 공식 문서의 상태 구조 원칙, effect 사용 기준, key/state 보존 규칙을 기준으로 “왜 처음에는 편해 보였고, 어떤 변경에서 깨지는지”까지 설명해야 팀 리뷰에서 설득력이 생깁니다.

## 핵심 원리

- 2-3단계 props 전달은 정상이다
- 5단계 이상이거나 완전히 무관한 컴포넌트를 통과할 때 Context를 검토한다
- Context는 명시적 데이터 흐름을 숨기므로 남용하면 디버깅이 어렵다

## 언제 사용하는가

- 중간 컴포넌트가 단순 전달만 반복할 때
- composition으로 children을 넘기면 전달이 줄어드는 경우
- 값 변경 빈도가 높아 Context 렌더가 걱정될 때

## 언제 피해야 하는가

- 깊은 트리에서 많은 컴포넌트가 같은 값을 실제로 읽는 경우
- 테마/locale/auth처럼 명확한 app-wide concern

## 어떻게 사용하는가

1. composition으로 구조를 바꿀 수 있는지 본다
2. 필요하면 Provider 범위를 좁힌다
3. Context 값의 책임을 작게 유지한다

## 기본 코드 형태

```tsx
<Page
  header={<UserHeader user={user} />}
  content={<UserDetail user={user} />}
/>
```

## 실무 판단 기준

- props 전달 단계 수보다 중간 컴포넌트가 그 값을 이해해야 하는지가 더 중요합니다.
- 2-3단계 명시적 전달은 추적하기 쉽고 테스트도 단순합니다.
- 무관한 레이아웃 컴포넌트가 같은 prop을 계속 전달한다면 composition이나 slot으로 구조를 바꿉니다.
- Context는 많은 하위 컴포넌트가 같은 값을 실제로 읽거나 app-wide concern일 때 좁은 Provider로 씁니다.

## 코드 리뷰 체크리스트

- 중간 컴포넌트가 prop을 읽지 않고 그대로 전달만 하는가?
- children, render prop, slot으로 호출부에서 필요한 위치에 바로 넣을 수 있는가?
- Context로 바꿨을 때 값 출처가 더 숨겨지고 소비자가 과도하게 늘어나지 않는가?
- Context value가 자주 바뀌어 넓은 하위 트리를 리렌더하지 않는가?

## 흔한 실수

- props 전달이 보인다는 이유만으로 전역 Context를 만듭니다.
- Context에 unrelated state를 계속 추가해 암묵적 의존성을 늘립니다.
- composition으로 해결할 수 있는 레이아웃 문제를 Provider 문제로 바꿉니다.

## 테스트와 검증 포인트

- prop 이름 변경이나 데이터 shape 변경 시 수정 범위가 어디까지 퍼지는지 확인합니다.
- Provider 제거 없이 컴포넌트를 독립 테스트할 수 있는지 봅니다.
- Context 소비자가 늘어날 때 렌더 범위와 의존 방향이 여전히 명확한지 확인합니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 props 전달 자체를 문제로 보고 Context를 과하게 쓰는 흐름을 봅니다.
- `ImprovedCase.tsx`에서는 composition으로 무관한 중간 컴포넌트의 전달 책임이 사라지는지 확인합니다.
- 실제 코드에서는 Provider 도입 전에 호출부 JSX 구조를 바꿔 해결할 수 있는지 먼저 확인합니다.

## 관련 패턴

- [Provider Pattern](../../component-composition/provider-pattern/README.md)
- [Children Composition](../../component-composition/children-composition/README.md)

## 참고 자료

- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
