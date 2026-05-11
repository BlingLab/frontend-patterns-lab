# 외부 store 연결

영문명: External Store
폴더: `state-management/external-store`

## 한 줄 요약

React 밖의 store를 useSyncExternalStore로 안전하게 연결합니다.

## 패턴 형태

- 분류: 상태 관리
- 형태: State Ownership / State Model
- 핵심 질문: 이 값의 단일 출처와 수명은 어디인가

## 왜 필요한가

브라우저 store(localStorage, IndexedDB)나 서드파티 상태 라이브러리를 React 컴포넌트와 연결할 때 useEffect + setState를 쓰면 Concurrent Mode에서 tearing(찢김) 현상이 생길 수 있습니다. useSyncExternalStore는 이를 안전하게 처리합니다.

React 공식 문서는 상태 구조를 잡을 때 모순되는 상태, 중복 상태, 파생 상태를 줄이라고 설명합니다. 따라서 이 카테고리의 핵심은 “값을 어디에 둘까”보다 “어떤 값만 저장해야 동기화 비용이 줄어드는가”입니다.

## 핵심 원리

- React 외부 상태를 Concurrent Mode에서 안전하게 구독한다
- SSR을 위한 getServerSnapshot도 지원한다
- Zustand, Valtio 같은 라이브러리가 내부적으로 이 훅을 사용한다

## 언제 사용하는가

- 브라우저 API, 전역 store, custom event source를 React에서 읽을 때
- React 외부에서 값이 바뀌고 컴포넌트가 구독해야 할 때
- SSR snapshot까지 고려해야 할 때

## 언제 피해야 하는가

- React state로 충분한 지역 상태
- store snapshot이 매번 새 객체를 반환하는 경우

## 어떻게 사용하는가

1. subscribe 함수와 getSnapshot 함수를 만든다
2. 컴포넌트에서 useSyncExternalStore로 읽는다
3. snapshot identity 안정성을 보장한다

## 기본 코드 형태

```tsx
const value = useSyncExternalStore(
  store.subscribe,
  store.getSnapshot,
  store.getServerSnapshot,
);
```

## 실무 판단 기준

- 값을 읽고 바꾸는 컴포넌트가 적으면 가까운 local state에서 시작합니다.
- 둘 이상의 형제가 같은 값을 함께 바꾸면 가장 가까운 공통 부모로 올립니다.
- 서버에서 온 데이터, URL로 복원되어야 하는 값, 외부 store 값은 각각 다른 수명과 소유권으로 봅니다.
- 계산 가능한 값은 state로 저장하지 않고 렌더 중 계산합니다. 계산이 실제로 무거울 때만 memoization을 추가합니다.

## 코드 리뷰 체크리스트

- 상태의 단일 출처가 한 곳으로 설명되는가?
- 불가능한 상태 조합이 boolean 여러 개로 열려 있지 않은가?
- state를 올린 이유가 실제 공유 요구인지, 막연한 재사용 가능성인지 구분했는가?
- 서버 상태와 UI 제어 상태의 갱신 주기가 섞이지 않았는가?

## 흔한 실수

- 나중에 쓸 수 있다는 이유로 전역 store에 먼저 올립니다.
- props나 기존 state에서 계산할 수 있는 값을 별도 state와 effect로 동기화합니다.
- 객체 전체를 선택 상태로 저장해 원본 목록과 서로 다른 값을 만듭니다.

## 테스트와 검증 포인트

- 값을 바꾸는 사용자 흐름을 하나씩 따라가며 어떤 state가 바뀌는지 확인합니다.
- 리스트 추가/삭제/정렬, 탭 전환, URL 새로고침처럼 상태 보존과 초기화가 갈리는 케이스를 확인합니다.
- TypeScript union 또는 reducer를 쓰는 경우 exhaustive check로 빠진 전이가 없는지 봅니다.

## 예제 읽는 법

- `BadCase.tsx`에서 책임이 어디에 섞여 있는지 먼저 봅니다.
- `Example.tsx`에서 호출부 API, 상태 소유권, 변경 범위가 어떻게 줄었는지 비교합니다.
- 문서의 체크리스트를 기준으로 같은 패턴을 실제 코드 리뷰에 적용할 수 있는지 확인합니다.

## 관련 패턴

- [Provider Pattern](../../component-composition/provider-pattern/README.md)
- [Context Optimization](../../performance-rendering/context-optimization/README.md)

## 참고 자료

- [React: useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
