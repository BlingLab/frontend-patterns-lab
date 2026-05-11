# useMemo/useCallback 기준

영문명: useMemo / useCallback
폴더: `performance-rendering/usememo-usecallback`

## 한 줄 요약

값과 함수 identity 안정성이 필요한 지점에만 사용합니다.

## 패턴 형태

- 분류: 렌더링 성능
- 형태: Rendering Optimization / Measurement
- 핵심 질문: 측정된 렌더 비용을 가장 작은 변경으로 줄일 수 있는가

## 왜 필요한가

useMemo와 useCallback은 비용을 줄이는 것처럼 보이지만 캐시 관리와 deps 비교 비용이 있습니다. "모든 곳에 useCallback"은 오히려 코드를 복잡하게만 합니다. 정말 필요한 두 가지 상황: 비싼 계산, 안정적 참조가 필요할 때입니다.

React 공식 문서는 memoization을 보장 장치가 아니라 성능 최적화로 설명합니다. `memo`는 props의 얕은 비교에 의존하고, `useMemo`는 첫 렌더를 빠르게 하지 않습니다. 따라서 성능 문서는 “무엇을 적용할까”보다 “측정된 병목을 어떤 경계에서 줄일까”에 초점을 둡니다.

## 핵심 원리

- useCallback: memo된 자식에 넘기는 함수나 useEffect deps
- useMemo: 렌더마다 새로 계산하기 비싼 값
- 대부분의 경우 없어도 앱은 잘 동작한다

## 언제 사용하는가

- 비싼 계산 결과를 캐시할 때
- memoized child에 stable prop을 넘길 때
- effect dependency로 객체/함수를 안정화해야 할 때

## 언제 피해야 하는가

- 단순 계산이나 cheap render
- React Compiler나 구조 분리로 해결 가능한 경우

## 어떻게 사용하는가

1. 먼저 병목을 측정한다
2. 비싼 계산은 useMemo로 감싼다
3. memo child에 넘기는 콜백은 useCallback을 검토한다

## 기본 코드 형태

```tsx
const filteredItems = useMemo(() => filterItems(items, query), [items, query]);

const handleSelect = useCallback((id: string) => {
  setSelectedId(id);
}, []);

return <MemoizedList items={filteredItems} onSelect={handleSelect} />;
```

## 실무 판단 기준

- Profiler, console.time, 사용자 체감 재현으로 병목을 먼저 확인합니다.
- 상태 위치 조정과 컴포넌트 분리로 리렌더 범위를 줄인 뒤 memoization을 검토합니다.
- 큰 목록은 pagination, infinite query, virtualization 중 사용자 경험에 맞는 방식을 고릅니다.
- 초기 번들에 필요 없는 화면은 lazy loading과 Suspense boundary로 분리합니다.

## 코드 리뷰 체크리스트

- 최적화 전후를 비교할 측정 기준이 있는가?
- memoized 컴포넌트로 내려가는 props identity가 안정적인가?
- Context value가 자주 바뀌는 값과 안정적인 값을 함께 담고 있지 않은가?
- 가상화가 키보드 탐색, 스크린 리더, 브라우저 찾기 같은 요구와 충돌하지 않는가?

## 흔한 실수

- 느리다는 느낌만으로 모든 함수에 useCallback을 붙입니다.
- inline object/array props 때문에 memo 경계가 항상 깨집니다.
- 목록이 작은데 virtualization을 도입해 접근성과 구현 복잡도만 늘립니다.

## 테스트와 검증 포인트

- React DevTools Profiler에서 실제로 렌더 횟수와 커밋 시간이 줄었는지 확인합니다.
- production build와 저사양 CPU throttling에서 상호작용 지연을 다시 봅니다.
- 큰 목록은 스크롤, 검색, 항목 수정 후 focus와 선택 상태가 유지되는지 확인합니다.

## 예제 읽는 법

- `BadCase.tsx`에서 책임이 어디에 섞여 있는지 먼저 봅니다.
- `Example.tsx`에서 호출부 API, 상태 소유권, 변경 범위가 어떻게 줄었는지 비교합니다.
- 문서의 체크리스트를 기준으로 같은 패턴을 실제 코드 리뷰에 적용할 수 있는지 확인합니다.

## 관련 패턴

- [Overuse Memoization](../../anti-patterns/overuse-memoization/README.md)
- [Unstable Callbacks](../../anti-patterns/unstable-callbacks/README.md)

## 참고 자료

- [React: memo](https://react.dev/reference/react/memo)
- [React: useMemo](https://react.dev/reference/react/useMemo)
- [web.dev: Virtualize large lists with react-window](https://web.dev/articles/virtualize-long-lists-react-window)
