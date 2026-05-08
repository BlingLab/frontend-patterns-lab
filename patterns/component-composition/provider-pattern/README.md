# Provider Pattern

## 한 줄 요약

하위 트리 여러 곳에서 필요한 값을 Context Provider로 공급하고, 필요한 컴포넌트만 custom hook으로 읽게 만드는 패턴입니다.

## 패턴 형태

- 분류: 컴포넌트 조합
- 형태: Context Boundary
- 핵심 질문: props로 내려보내는 값이 "중간 컴포넌트의 관심사"가 아닌데 계속 전달되고 있는가

## 왜 필요한가

React의 `createContext`는 컴포넌트가 props를 여러 단계로 직접 전달하지 않고도 아래 트리에 값을 제공할 수 있게 합니다. React 문서도 context를 만들고 provider로 값을 공급한 뒤, 하위 컴포넌트가 `useContext`로 읽는 흐름을 설명합니다.

Provider pattern은 이 기능을 앱 구조의 책임 경계로 사용합니다. 테마, 현재 사용자, locale, feature flag, compound component 내부 상태처럼 여러 하위 컴포넌트가 공통으로 읽어야 하는 값을 하나의 Provider 아래에 둡니다. 중간 컴포넌트는 자신이 쓰지 않는 props를 알 필요가 없어집니다.

다만 Provider는 "전역 변수"가 아닙니다. 범위를 넓게 잡거나 자주 바뀌는 값을 큰 context 하나에 몰아넣으면 불필요한 리렌더가 퍼지고 데이터 흐름이 숨습니다. Provider는 공유 범위를 좁게 잡을 때 가장 유용합니다.

## 언제 사용하는가

- 현재 사용자, 테마, locale처럼 하위 트리 여러 곳에서 같은 값을 읽을 때
- 중간 컴포넌트가 쓰지 않는 props를 계속 전달하는 구조적 잡음이 있을 때
- compound component 내부에서 Root 상태를 Trigger, Panel 같은 하위 컴포넌트가 공유해야 할 때
- 특정 페이지나 기능 영역에만 적용되는 설정을 그 영역 아래로 제한하고 싶을 때
- custom hook으로 "Provider 안에서만 사용할 수 있다"는 규칙을 강제하고 싶을 때

## 언제 피해야 하는가

- props를 한두 단계 전달하는 것으로 충분할 때
- 값이 한 컴포넌트에서만 쓰일 때
- 자주 바뀌는 입력값이나 hover 상태를 넓은 Provider에 넣으려 할 때
- 서버 데이터 캐시를 Context로 직접 구현하려 할 때
- Provider가 너무 많아 루트가 설정 파일처럼 변하고 실제 사용 범위가 불명확할 때

## 어떻게 사용하는가

1. 공유할 값의 책임을 좁게 정의합니다.
2. context는 컴포넌트 바깥에서 생성합니다.
3. Provider는 value를 만들고 children을 감쌉니다.
4. custom hook에서 context null 여부를 검사해 Provider 누락을 빠르게 발견합니다.
5. 자주 바뀌는 값은 context를 쪼개거나 provider 범위를 좁힙니다.

## 기본 코드 형태

```tsx
const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ user, children }: AuthProviderProps) {
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
```

## 예제 읽는 법

- `Example.tsx`는 `WorkspaceProvider`가 현재 workspace와 권한을 제공하고, 깊은 하위 컴포넌트가 props drilling 없이 값을 읽습니다.
- `BadCase.tsx`는 중간 컴포넌트들이 자신은 쓰지 않는 `workspace`와 `role` props를 계속 전달합니다.

## 실무 판단 기준

Provider는 "많이 쓰이는 값"이 아니라 "넓은 트리에 의미 있게 공유되는 관심사"에 씁니다. props 전달 자체는 문제가 아닙니다. 중간 컴포넌트가 그 값을 몰라도 되는데 API에 계속 드러나는 순간 Provider를 검토합니다.

## 코드 리뷰 체크리스트

- Provider의 책임이 하나의 관심사로 좁혀져 있는가?
- custom hook이 Provider 누락을 명확한 에러로 알려주는가?
- context value가 매 렌더 불필요하게 새 객체가 되어 넓은 리렌더를 만들지 않는가?
- 몇 단계 props 전달로 충분한 문제를 Provider로 숨기고 있지 않은가?
- 서버 상태, 폼 상태, UI 상태를 하나의 Provider에 섞지 않았는가?

## 흔한 실수

- Provider를 전역 store처럼 사용합니다.
- 자주 바뀌는 입력값을 앱 루트 Provider에 둡니다.
- context default value에 가짜 객체를 넣어 Provider 누락을 숨깁니다.
- 읽기 값과 쓰기 함수를 모두 큰 context 하나에 넣어 모든 소비자를 렌더시킵니다.

## 관련 패턴

- [Compound Component](../compound-component/README.md): 하위 컴포넌트 패밀리가 공유 상태를 읽어야 할 때
- [Context Optimization](../../performance-rendering/context-optimization/README.md): context 리렌더 범위를 줄여야 할 때
- [Unnecessary Global State](../../anti-patterns/unnecessary-global-state/README.md): Provider가 과한 전역 상태로 변할 때

## 참고 자료

- [React: createContext](https://react.dev/reference/react/createContext)
- [React: useContext](https://react.dev/reference/react/useContext)
