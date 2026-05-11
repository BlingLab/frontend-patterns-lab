# 컨테이너/프리젠터

영문명: Container / Presenter
폴더: `component-composition/container-presenter`

## 한 줄 요약

Container는 데이터 준비와 상태 변경을 담당하고, Presenter는 전달받은 props로 화면만 렌더링하게 나누는 패턴입니다.

## 패턴 형태

- 분류: 컴포넌트 조합
- 형태: Responsibility Split
- 핵심 질문: 데이터 흐름과 화면 표현이 한 컴포넌트에 섞여 변경 이유가 넓어지고 있는가

## 왜 필요한가

실무 컴포넌트는 쉽게 커집니다. API 호출, 로딩 상태, 필터링, 이벤트 핸들러, 라우팅, 권한 체크, 마크업이 한 파일에 쌓입니다. 처음에는 한 화면이라 괜찮지만, 화면 표현을 테스트하거나 Storybook에 올리거나 다른 데이터 소스에서 재사용하려고 할 때 모든 의존성이 따라옵니다.

Container / Presenter는 변경 이유를 나눕니다.

- Container: 데이터를 가져오고, 가공하고, 이벤트 핸들러를 만든다.
- Presenter: props를 받아 화면을 그린다.

Presenter는 네트워크, 라우터, 전역 store를 몰라야 합니다. 그래서 mock props로 쉽게 테스트할 수 있고, Container는 데이터 준비 흐름만 집중해서 볼 수 있습니다.

## 핵심 원리

- Presenter는 순수 함수처럼 props → JSX만 담당한다
- Container를 교체해도 Presenter UI는 그대로 재사용된다
- hooks가 나온 뒤 Container 역할을 custom hook이 대체하는 경우가 많다

## 언제 사용하는가

- 화면 컴포넌트가 데이터 조회와 마크업을 모두 떠안아 커졌을 때
- 같은 Presenter를 다른 데이터 소스에서 재사용하고 싶을 때
- Storybook이나 단위 테스트에 순수한 화면 컴포넌트를 올리고 싶을 때
- API 응답을 view model로 바꾸는 과정과 화면 렌더링을 분리하고 싶을 때
- 이벤트 핸들러와 표시 UI의 변경 이유가 자주 다를 때

## 언제 피해야 하는가

- 컴포넌트가 작고 로직이 거의 없을 때
- 분리 후 props 전달만 늘고 읽기 경로가 더 복잡해질 때
- custom hook 하나로 데이터 준비를 충분히 분리할 수 있을 때
- Presenter가 결국 Container의 도메인 의존성을 다시 import하게 될 때
- 파일 분리가 팀 컨벤션과 맞지 않아 탐색 비용이 더 커질 때

## 어떻게 사용하는가

1. 현재 컴포넌트에서 데이터 준비, 상태 변경, 화면 표현 코드를 분류합니다.
2. API 호출, store 접근, router 접근, 이벤트 orchestration은 Container에 둡니다.
3. Presenter는 필요한 view model과 callback만 props로 받습니다.
4. Presenter는 props 외부의 전역 의존성을 import하지 않습니다.
5. Presenter props를 기준으로 Storybook과 테스트 데이터를 만들 수 있게 유지합니다.

## 기본 코드 형태

```tsx
function UserListContainer() {
  const users = useUsersQuery();
  const viewModel = users.data.map(adaptUser);

  return <UserListPresenter users={viewModel} onSelect={selectUser} />;
}

function UserListPresenter({ users, onSelect }: UserListPresenterProps) {
  return users.map((user) => (
    <button key={user.id} onClick={() => onSelect(user.id)}>
      {user.name}
    </button>
  ));
}
```

## 예제 읽는 법

- `Container.tsx`는 mock 데이터를 view model로 준비하고 선택 이벤트를 정의합니다.
- `Presenter.tsx`는 props만 받아 멤버 목록을 렌더링합니다.
- `BadCase.tsx`는 데이터 준비와 화면 표현을 한 컴포넌트에 섞어 둡니다.

## 실무 판단 기준

Container / Presenter는 "모든 컴포넌트를 무조건 둘로 나누자"는 규칙이 아닙니다. 파일을 나누는 비용보다 변경 이유를 분리하는 이득이 클 때 사용합니다. 특히 Presenter를 독립적으로 테스트하거나 시각적으로 검토할 필요가 있으면 효과가 큽니다.

## 코드 리뷰 체크리스트

- Presenter가 API, router, store를 직접 import하지 않는가?
- Container가 화면 세부 마크업까지 과하게 알고 있지 않은가?
- Presenter props가 API 응답 그대로가 아니라 화면에 필요한 view model인가?
- 분리 후 테스트나 Storybook 작성이 실제로 쉬워졌는가?
- 작은 컴포넌트를 기계적으로 쪼개 읽기 경로만 늘린 것은 아닌가?

## 흔한 실수

- 파일만 나누고 Presenter가 다시 API나 store를 import합니다.
- Container가 너무 많은 view state를 들고 Presenter가 단순 HTML wrapper가 됩니다.
- Presenter props가 서버 응답 타입 그대로라 API 변경에 여전히 취약합니다.
- 작은 컴포넌트까지 모두 Container/Presenter로 나눠 구조가 과해집니다.

## 테스트와 검증 포인트

- Container 없이 Presenter만 샘플 props로 렌더링할 수 있는지 확인합니다.
- 데이터 fetch, loading/error 처리, 화면 표현의 변경 이유가 다른 파일에 머무는지 확인합니다.
- Presenter props가 API 응답 구조가 아니라 화면 모델인지 봅니다.

## 관련 패턴

- [Custom Hook Boundary](../../hooks/custom-hook-boundary/README.md): 데이터 준비를 hook으로 분리할 때
- [API Adapter](../../async-api/api-adapter/README.md): API 응답을 UI 모델로 바꿀 때
- [Component Splitting](../../performance-rendering/component-splitting/README.md): 렌더 빈도와 책임 기준으로 컴포넌트를 나눌 때

## 참고 자료

- [React: Thinking in React](https://react.dev/learn/thinking-in-react)
- [React: Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
