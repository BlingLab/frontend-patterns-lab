# 목록 렌더링

영문명: List Rendering
폴더: `performance-rendering/list-rendering`

## 한 줄 요약

큰 목록의 렌더 비용을 줄이고 key 안정성을 보장합니다.

## 패턴 형태

- 분류: 렌더링 성능
- 형태: Rendering Optimization / Measurement
- 핵심 질문: 측정된 렌더 비용을 가장 작은 변경으로 줄일 수 있는가

## 왜 필요한가

10,000개 항목을 한 번에 렌더하면 초기 렌더가 수초 걸립니다. 가상화(virtualization)는 보이는 항목만 렌더해 DOM 노드 수를 일정하게 유지합니다. 안정적인 key는 불필요한 DOM 재생성을 막습니다.

React 공식 문서는 memoization을 보장 장치가 아니라 성능 최적화로 설명합니다. `memo`는 props의 얕은 비교에 의존하고, `useMemo`는 첫 렌더를 빠르게 하지 않습니다. 따라서 성능 문서는 “무엇을 적용할까”보다 “측정된 병목을 어떤 경계에서 줄일까”에 초점을 둡니다.

## 핵심 원리

- 1000개 이상 목록에는 가상화(react-window, TanStack Virtual)를 검토한다
- 각 항목의 고유 id를 key로 쓴다
- 항목이 React.memo면 key 안정성과 props 안정성 모두 중요하다

## 언제 사용하는가

- 큰 테이블이나 피드
- 항목 컴포넌트가 무겁고 자주 갱신될 때
- 스크롤 성능 문제가 측정될 때

## 언제 피해야 하는가

- 목록 크기가 작아 최적화 비용이 더 큰 경우
- 접근성상 가상화가 부적절한 경우

## 어떻게 사용하는가

1. 안정적인 id를 key로 쓴다
2. 필요하면 pagination이나 virtualization을 적용한다
3. 항목 컴포넌트 props를 안정화한다

## 기본 코드 형태

```tsx
return visibleItems.map((item) => (
  <ProductRow key={item.id} product={item} />
));

// 항목 수가 커지면 보이는 범위만 렌더하는 virtualization을 검토한다.
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

- [Index As Key](../../anti-patterns/index-as-key/README.md)
- [Infinite Query](../../async-api/infinite-query/README.md)

## 참고 자료

- [React: Rendering Lists](https://react.dev/learn/rendering-lists)
- [web.dev: Virtualize large lists with react-window](https://web.dev/articles/virtualize-long-lists-react-window)
- [React: memo](https://react.dev/reference/react/memo)
- [React: useMemo](https://react.dev/reference/react/useMemo)
