# 거대한 컴포넌트

영문명: Large Component
폴더: `anti-patterns/large-component`

## 한 줄 요약

하나의 컴포넌트가 데이터, 상태, 표현을 모두 떠안는 문제를 피합니다.

## 패턴 형태

- 분류: 안티패턴
- 형태: 문제 징후 / 리팩터링 가이드
- 핵심 질문: 지금 보이는 코드 냄새가 실제 버그와 변경 비용으로 이어지는가

## 왜 필요한가

300줄 이상의 컴포넌트는 어디서 상태가 오고 어디서 이벤트가 발생하는지 추적이 어렵습니다. 변경 이유가 다른 코드들이 한 파일에 있으면 수정 시 무관한 부분까지 영향 범위가 됩니다.

안티패턴은 금지 목록이 아니라 리팩터링 신호입니다. React 공식 문서의 상태 구조 원칙, effect 사용 기준, key/state 보존 규칙을 기준으로 “왜 처음에는 편해 보였고, 어떤 변경에서 깨지는지”까지 설명해야 팀 리뷰에서 설득력이 생깁니다.

## 핵심 원리

- 단일 책임: 한 컴포넌트는 한 가지 이유로만 바뀌어야 한다
- 데이터 로딩과 렌더링을 분리하면 재사용이 쉬워진다
- custom hook으로 로직을 추출하면 컴포넌트가 가벼워진다

## 언제 사용하는가

- 파일이 길고 섹션별 변경 이유가 다를 때
- JSX보다 상태/비동기 로직이 더 복잡할 때
- 일부 영역만 재사용하거나 테스트하고 싶을 때

## 언제 피해야 하는가

- 초기 프로토타입에서 분리 기준이 아직 불명확한 경우
- 분리 후 prop plumbing이 더 복잡한 경우

## 어떻게 사용하는가

1. 상태/데이터/표현 책임을 분류한다
2. 커스텀 훅이나 Presenter로 분리한다
3. 변경 빈도와 테스트 단위를 기준으로 나눈다

## 기본 코드 형태

```tsx
function UserPage() {
  const users = useUsersQuery();
  const form = useUserForm();

  return <UserPageView users={users.data} form={form} />;
}
```

## 실무 판단 기준

- 줄 수보다 변경 이유를 먼저 봅니다. API 요청, 권한 분기, 폼 검증, 테이블 표시, 모달 제어가 한 컴포넌트에 섞이면 분리 신호입니다.
- 데이터 준비는 container나 custom hook으로, 순수 화면 조각은 presenter 컴포넌트로 분리합니다.
- 먼저 가장 독립적인 섹션 하나만 분리합니다. 한 번에 모든 것을 쪼개면 prop 전달 구조가 더 흐려질 수 있습니다.
- 분리 후 새 컴포넌트 이름이 도메인 역할을 설명해야 합니다. `UserFilters`, `UserTable`, `UserDeleteDialog`는 좋고 `SectionA`, `PartOne`은 신호가 약합니다.

## 코드 리뷰 체크리스트

- 같은 파일 안에 요청, 변환, 이벤트 처리, JSX 레이아웃이 모두 들어 있지 않은가?
- 특정 UI 섹션만 수정하려고 해도 파일 전체의 상태와 effect를 읽어야 하는가?
- 추출한 hook은 렌더링을 모르고, 추출한 presenter는 데이터 요청 방식을 모르는가?
- 분리 후 테스트가 “전체 페이지 렌더”가 아니라 hook, presenter, 통합 흐름으로 나뉘는가?

## 흔한 실수

- 파일 길이만 보고 무조건 쪼개서 prop drilling만 늘립니다.
- custom hook 안에 JSX나 toast 같은 화면 정책을 넣어 책임이 다시 섞입니다.
- 전역 store로 상태를 옮겨 파일은 짧아졌지만 의존 범위는 더 커집니다.
- 로직을 분리하지 않고 JSX 조각만 별도 파일로 옮겨 테스트 가능성이 좋아지지 않습니다.

## 테스트와 검증 포인트

- 필터 조건 추가, 테이블 컬럼 추가, 삭제 확인 모달 추가를 각각 독립 변경으로 상상해 봅니다.
- 분리 후 한 섹션의 변경이 다른 섹션 테스트를 깨지 않는지 확인합니다.
- custom hook은 성공, 실패, 빈 데이터 같은 상태를 props 없이 직접 테스트할 수 있어야 합니다.
- presenter는 mock props만으로 렌더링할 수 있어야 합니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 데이터 준비, 상태 전이, 화면 표시가 한 컴포넌트 안에서 서로 섞이는 지점을 찾습니다.
- `ImprovedCase.tsx`에서는 “데이터를 준비하는 코드”와 “받은 props를 표시하는 코드”가 어디서 갈라지는지 봅니다.
- 실제 제품 코드에서는 페이지 단위 container, 도메인 hook, 표시 전용 컴포넌트 중 하나만 먼저 분리해도 충분한 경우가 많습니다.

## 관련 패턴

- [Container Presenter](../../component-composition/container-presenter/README.md)
- [Component Splitting](../../performance-rendering/component-splitting/README.md)

## 참고 자료

- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
