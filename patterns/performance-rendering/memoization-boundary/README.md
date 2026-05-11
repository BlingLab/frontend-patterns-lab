# 메모이제이션 경계

영문명: Memoization Boundary
폴더: `performance-rendering/memoization-boundary`

## 한 줄 요약

memoization을 비용이 큰 하위 트리의 경계에 둡니다.

## 패턴 형태

- 분류: 렌더링 성능
- 형태: Rendering Optimization / Measurement
- 핵심 질문: 측정된 렌더 비용을 가장 작은 변경으로 줄일 수 있는가

## 왜 필요한가

부모가 리렌더될 때마다 자식도 리렌더됩니다. 렌더 비용이 큰 자식을 React.memo로 감싸면 props가 바뀌지 않는 한 리렌더를 건너뜁니다. 단, 모든 컴포넌트에 적용하면 memo 비교 비용이 오히려 더 커집니다.

React 공식 문서는 memoization을 보장 장치가 아니라 성능 최적화로 설명합니다. `memo`는 props의 얕은 비교에 의존하고, `useMemo`는 첫 렌더를 빠르게 하지 않습니다. 따라서 성능 문서는 “무엇을 적용할까”보다 “측정된 병목을 어떤 경계에서 줄일까”에 초점을 둡니다.

## 핵심 원리

- 비용이 큰 자식에만 적용하고 기본 컴포넌트에는 불필요하다
- props에 인라인 객체/함수가 있으면 memo가 효과없다
- 측정 먼저, 최적화는 병목 확인 후에 한다

## 언제 사용하는가

- 렌더 비용이 큰 하위 트리가 안정적인 props를 받을 때
- 부모가 자주 렌더되지만 자식 결과는 자주 안 바뀔 때
- Profiler로 병목이 확인됐을 때

## 언제 피해야 하는가

- 측정 없이 습관적으로 memo를 붙이는 경우
- props가 매번 새 객체/함수라 memo가 무력한 경우

## 어떻게 사용하는가

1. Profiler로 느린 지점을 찾는다
2. 경계 컴포넌트 props를 안정화한다
3. memo 적용 전후를 비교한다

## 기본 코드 형태

```tsx
const MemoizedChart = memo(function Chart({ data }: { data: ChartPoint[] }) {
  return <ExpensiveChart data={data} />;
});

function Report({ rows }: { rows: Row[] }) {
  const chartData = useMemo(() => buildChartData(rows), [rows]);
  return <MemoizedChart data={chartData} />;
}
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

- [useMemo / useCallback](../usememo-usecallback/README.md)
- [Inline Object Props](../../anti-patterns/inline-object-props/README.md)

## 참고 자료

- [React: memo](https://react.dev/reference/react/memo)
- [React: useMemo](https://react.dev/reference/react/useMemo)
- [web.dev: Virtualize large lists with react-window](https://web.dev/articles/virtualize-long-lists-react-window)
