# 지연 로딩

영문명: Lazy Loading
폴더: `performance-rendering/lazy-loading`

## 한 줄 요약

초기 화면에 필요 없는 코드를 늦게 불러옵니다.

## 패턴 형태

- 분류: Performance Rendering
- 형태: Code Splitting
- 목적: 렌더링 비용을 어떻게 줄이고 관찰할 것인가

## 왜 필요한가

모든 route와 큰 위젯을 초기 번들에 넣으면 첫 로딩 비용이 커집니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

## 언제 사용하는가

- 라우트 단위 화면
- 무거운 차트/에디터/관리 도구
- 사용자가 가끔만 여는 기능

## 언제 피해야 하는가

- 첫 화면 핵심 UI
- 작은 컴포넌트를 과하게 분할해 네트워크 요청만 늘리는 경우

## 어떻게 사용하는가

1. lazy import 경계를 정한다
2. Suspense fallback을 레이아웃에 맞춘다
3. prefetch가 필요한 경로를 검토한다

## 실무 예시

`Lazy Loading`의 핵심은 초기 화면에 필요 없는 코드를 늦게 불러옵니다. Profiler나 사용자 체감으로 느린 지점이 확인된 뒤 렌더 범위와 계산 비용을 줄일 때 사용합니다.

## 기본 코드 형태

```tsx
const visibleItems = useMemo(() => {
  return expensiveFilter(items, filter);
}, [items, filter]);

return <SlowList items={visibleItems} />;
```

## 구분 기준

이 패턴은 "측정된 렌더 비용을 어디서 줄일 것인가"에 대한 답입니다. 먼저 병목을 확인하고, 구조 분리와 memoization 중 가장 작은 변경을 선택합니다.

형태상으로는 `Code Splitting`에 속하므로, 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- Profiler나 측정값으로 병목이 확인되었는가?
- 최적화가 props identity나 state colocation 문제를 실제로 해결하는가?
- memoization으로 읽기 어려운 dependency가 늘어나지 않았는가?

## 흔한 실수

- 측정 없이 memoization을 먼저 적용합니다.
- inline object와 unstable callback 때문에 memo 경계가 무력해집니다.
- 큰 목록 문제를 CSS나 spinner로만 가리려 합니다.

## 적용 흐름

1. lazy import 경계를 정한다
2. Suspense fallback을 레이아웃에 맞춘다
3. prefetch가 필요한 경로를 검토한다

## 적용하지 않을 신호

- 첫 화면 핵심 UI
- 작은 컴포넌트를 과하게 분할해 네트워크 요청만 늘리는 경우

## 예제 읽는 법

`Example.tsx`와 `BadCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Suspense Boundary](../../async-api/suspense-boundary/README.md)
- [Component Splitting](../component-splitting/README.md)

## 참고 자료

- [React: memo](https://react.dev/reference/react/memo)
- [React: useMemo](https://react.dev/reference/react/useMemo)
- [web.dev: Virtualize large lists with react-window](https://web.dev/articles/virtualize-long-lists-react-window)
