# 훅 조합

영문명: Hook Composition
폴더: `hooks/hook-composition`

## 한 줄 요약

작은 훅을 조합해 더 큰 도메인 훅을 만듭니다.

## 패턴 형태

- 분류: 훅과 로직 재사용
- 형태: Custom Hook / Hook Composition
- 핵심 질문: 반복되는 동작 로직을 어떤 API로 캡슐화할 것인가

## 왜 필요한가

하나의 거대한 훅이 검색어 debounce, URL 동기화, API 호출, 에러 처리를 모두 하면 재사용과 테스트가 어렵습니다. 작은 훅을 조합하면 각 부분을 독립적으로 교체하거나 테스트할 수 있습니다.

React 공식 문서는 custom hook을 상태ful 로직을 컴포넌트 밖으로 추출하는 방법으로 설명합니다. 훅의 목적은 파일을 쪼개는 것이 아니라, 구독, 타이머, 비동기 상태, 폼 로직처럼 반복되는 생명주기 규칙을 한 API로 고정하는 것입니다.

## 핵심 원리

- useDebounce + useAsync + useUrlState → useProductSearch
- 각 훅은 단일 책임을 갖고 독립적으로 테스트 가능하다
- 조합의 결과물인 도메인 훅이 컴포넌트의 인터페이스가 된다

## 언제 사용하는가

- 검색, 페이지네이션, 선택 같은 작은 훅을 합쳐야 할 때
- 도메인별 공개 API를 만들고 싶을 때
- 컴포넌트에서 orchestration 코드를 줄이고 싶을 때

## 언제 피해야 하는가

- 조합된 훅이 너무 많은 책임을 숨길 때
- 각 훅의 dependency 관계가 순환할 때

## 어떻게 사용하는가

1. 저수준 훅을 작게 유지한다
2. 도메인 훅에서 조합 순서와 반환값을 정리한다
3. 컴포넌트에는 도메인 언어의 값만 노출한다

## 기본 코드 형태

```tsx
function useSearchableUsers() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 300);
  const usersQuery = useUsersQuery({ keyword: debouncedKeyword });

  return { keyword, setKeyword, usersQuery };
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

- [Custom Hook Boundary](../custom-hook-boundary/README.md)
- [Container Presenter](../../component-composition/container-presenter/README.md)

## 참고 자료

- [React: Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [React: useEffect](https://react.dev/reference/react/useEffect)
