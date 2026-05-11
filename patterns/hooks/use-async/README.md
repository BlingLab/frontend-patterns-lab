# 비동기 상태 훅

영문명: useAsync
폴더: `hooks/use-async`

## 한 줄 요약

비동기 작업의 loading/data/error 상태를 공통 모델로 다룹니다.

## 패턴 형태

- 분류: 훅과 로직 재사용
- 형태: Custom Hook / Hook Composition
- 핵심 질문: 반복되는 동작 로직을 어떤 API로 캡슐화할 것인가

## 왜 필요한가

컴포넌트마다 isLoading, error, data를 따로 선언하면 같은 패턴이 반복되고 각 경우 처리를 빠뜨리기 쉽습니다. useAsync 하나로 이 모델을 표준화하면 비동기 처리가 일관됩니다.

React 공식 문서는 custom hook을 상태ful 로직을 컴포넌트 밖으로 추출하는 방법으로 설명합니다. 훅의 목적은 파일을 쪼개는 것이 아니라, 구독, 타이머, 비동기 상태, 폼 로직처럼 반복되는 생명주기 규칙을 한 API로 고정하는 것입니다.

## 핵심 원리

- idle → loading → success/error 상태 머신을 내장한다
- 언마운트 후 setState를 막아 경고를 방지한다
- TanStack Query가 없는 환경에서 직접 만들기 좋다

## 언제 사용하는가

- 작은 로컬 비동기 작업
- TanStack Query까지는 필요 없는 단발 요청
- 컴포넌트 내부에서 요청 상태를 명확히 보여주고 싶을 때

## 언제 피해야 하는가

- 서버 캐시, 재시도, 동기화가 필요한 데이터
- 여러 화면이 공유하는 서버 상태

## 어떻게 사용하는가

1. 요청 시작 시 loading으로 바꾼다
2. 성공/실패 상태를 명시한다
3. unmount 후 setState를 막는다

## 기본 코드 형태

```tsx
function useAsync<T>(task: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'idle' });

  async function run() {
    setState({ status: 'loading' });
    try {
      setState({ status: 'success', data: await task() });
    } catch (error) {
      setState({ status: 'error', error });
    }
  }

  return { state, run };
}
```

## 실무 판단 기준

- 컴포넌트가 JSX보다 상태 전이와 effect cleanup으로 더 읽히기 어려워질 때 훅을 추출합니다.
- 훅은 UI를 반환하기보다 상태, 파생 값, 이벤트 핸들러, props getter처럼 호출부가 조합할 수 있는 값을 반환합니다.
- DOM 이벤트나 외부 구독을 다루는 훅은 cleanup과 stable callback 문제를 API 안에서 해결해야 합니다.
- 한 번만 쓰이고 정책이 아직 변하는 로직은 섣불리 공통 훅으로 만들지 않습니다.

## 코드 리뷰 체크리스트

- 훅 이름이 어떤 도메인 동작을 제공하는지 드러나는가?
- 반환 값이 너무 많아 호출부가 내부 구현을 다시 조립해야 하는 상태는 아닌가?
- effect 의존성과 cleanup이 훅 내부에서 일관되게 처리되는가?
- 테스트할 수 있는 순수 계산과 React 생명주기 의존 로직이 분리되어 있는가?

## 흔한 실수

- 중복 한 줄을 없애려고 훅을 만들고, 실제 정책은 호출부마다 다시 분기합니다.
- callback identity를 고려하지 않아 event listener cleanup이 실패합니다.
- 비동기 완료 후 unmount된 컴포넌트에 state update를 시도합니다.

## 테스트와 검증 포인트

- StrictMode에서 mount/unmount가 반복되어도 구독과 타이머가 중복되지 않는지 확인합니다.
- 훅을 두 컴포넌트에서 동시에 호출해도 상태가 공유되지 않는지 확인합니다.
- 입력 값이 빠르게 바뀌는 debounce/throttle 계열은 마지막 값, leading/trailing 동작, cleanup을 함께 봅니다.

## 예제 읽는 법

- `BadCase.tsx`에서 책임이 어디에 섞여 있는지 먼저 봅니다.
- `Example.tsx`에서 호출부 API, 상태 소유권, 변경 범위가 어떻게 줄었는지 비교합니다.
- 문서의 체크리스트를 기준으로 같은 패턴을 실제 코드 리뷰에 적용할 수 있는지 확인합니다.

## 관련 패턴

- [Query Hook Pattern](../../async-api/query-hook-pattern/README.md)
- [Request Status Model](../../async-api/request-status-model/README.md)

## 참고 자료

- [React: Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [React: useEffect](https://react.dev/reference/react/useEffect)
