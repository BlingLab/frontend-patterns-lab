# 컴포넌트 분리

영문명: Component Splitting
폴더: `performance-rendering/component-splitting`

## 한 줄 요약

변경 빈도가 다른 영역을 컴포넌트로 분리합니다.

## 패턴 형태

- 분류: 렌더링 성능
- 형태: Rendering Optimization / Measurement
- 핵심 질문: 측정된 렌더 비용을 가장 작은 변경으로 줄일 수 있는가

## 왜 필요한가

타이머처럼 자주 바뀌는 부분과 정적인 콘텐츠가 같은 컴포넌트에 있으면, 타이머가 바뀔 때마다 정적 콘텐츠도 리렌더됩니다. 분리하면 바뀌는 부분만 리렌더되고 나머지는 건드리지 않습니다.

React 공식 문서는 memoization을 보장 장치가 아니라 성능 최적화로 설명합니다. `memo`는 props의 얕은 비교에 의존하고, `useMemo`는 첫 렌더를 빠르게 하지 않습니다. 따라서 성능 문서는 “무엇을 적용할까”보다 “측정된 병목을 어떤 경계에서 줄일까”에 초점을 둡니다.

## 핵심 원리

- 변경 빈도가 다른 UI를 별도 컴포넌트로 추출한다
- memo 없이도 리렌더 범위를 좁힐 수 있다
- 상태를 소유하는 컴포넌트 범위가 리렌더 범위다

## 언제 사용하는가

- 입력 영역과 무거운 미리보기가 함께 있을 때
- 일부 영역만 자주 바뀔 때
- 컴포넌트가 읽기 어려울 만큼 커졌을 때

## 언제 피해야 하는가

- 분리 후 props 전달이 더 복잡해지는 경우
- 작은 정적 UI를 과하게 파일로 나누는 경우

## 어떻게 사용하는가

1. 상태 변경 빈도를 기준으로 영역을 나눈다
2. 자주 바뀌는 state를 가까이 둔다
3. 느린 영역은 memo boundary 후보로 본다

## 기본 코드 형태

```tsx
function Dashboard() {
  return (
    <>
      <LiveCounter />
      <SlowReport />
    </>
  );
}

function LiveCounter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
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

- [State Colocation](../../state-management/state-colocation/README.md)
- [Large Component](../../anti-patterns/large-component/README.md)

## 참고 자료

- [React: memo](https://react.dev/reference/react/memo)
- [React: useMemo](https://react.dev/reference/react/useMemo)
- [web.dev: Virtualize large lists with react-window](https://web.dev/articles/virtualize-long-lists-react-window)
