# Context 최적화

영문명: Context Optimization
폴더: `performance-rendering/context-optimization`

## 한 줄 요약

Context value와 Provider 범위를 쪼개 불필요한 렌더를 줄입니다.

## 패턴 형태

- 분류: 렌더링 성능
- 형태: Rendering Optimization / Measurement
- 핵심 질문: 측정된 렌더 비용을 가장 작은 변경으로 줄일 수 있는가

## 왜 필요한가

Context value가 바뀌면 useContext를 호출하는 모든 컴포넌트가 리렌더됩니다. 자주 바뀌는 값과 거의 안 바뀌는 값을 같은 Context에 넣으면 불필요한 리렌더가 퍼집니다.

React 공식 문서는 memoization을 보장 장치가 아니라 성능 최적화로 설명합니다. `memo`는 props의 얕은 비교에 의존하고, `useMemo`는 첫 렌더를 빠르게 하지 않습니다. 따라서 성능 문서는 “무엇을 적용할까”보다 “측정된 병목을 어떤 경계에서 줄일까”에 초점을 둡니다.

## 핵심 원리

- 자주 바뀌는 값과 안정적인 값을 별도 Context로 분리한다
- 상태와 dispatch를 다른 Context에 분리하는 방법도 효과적이다
- Context 대신 Zustand 같은 selector 기반 store가 더 효율적일 수 있다

## 언제 사용하는가

- Provider value가 자주 바뀔 때
- 일부 소비자만 특정 값에 관심 있을 때
- Context 때문에 넓은 하위 트리가 렌더될 때

## 언제 피해야 하는가

- Context 소비자가 적고 값이 거의 바뀌지 않을 때
- 상태를 가까이 두는 것만으로 해결되는 경우

## 어떻게 사용하는가

1. 읽기 전용 값과 변경 함수를 분리한다
2. Provider 범위를 필요한 영역으로 좁힌다
3. value 객체 identity를 안정화한다

## 기본 코드 형태

```tsx
const ThemeValueContext = createContext<Theme>('light');
const ThemeDispatchContext = createContext<(theme: Theme) => void>(() => {});

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeDispatchContext.Provider value={setTheme}>
      <ThemeValueContext.Provider value={theme}>{children}</ThemeValueContext.Provider>
    </ThemeDispatchContext.Provider>
  );
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

- [Provider Pattern](../../component-composition/provider-pattern/README.md)
- [External Store](../../state-management/external-store/README.md)

## 참고 자료

- [React: Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [React: memo](https://react.dev/reference/react/memo)
- [React: useMemo](https://react.dev/reference/react/useMemo)
- [web.dev: Virtualize large lists with react-window](https://web.dev/articles/virtualize-long-lists-react-window)
