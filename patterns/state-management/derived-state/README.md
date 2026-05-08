# Derived State

## 한 줄 요약

저장하지 않아도 되는 값은 렌더 중 기존 값에서 계산합니다.

## 패턴 형태

- 분류: 상태 관리
- 형태: Computed State
- 목적: 상태를 어디에 두고 어떻게 흐르게 할 것인가

## 왜 필요한가

계산 가능한 값을 state로 중복 저장하면 동기화 effect와 버그가 생깁니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

## 언제 사용하는가

- 필터 결과, 총합, 선택 여부처럼 원본에서 계산 가능한 값일 때
- useEffect로 state를 다시 맞추는 코드가 보일 때
- 데이터 정규화와 표시 모델을 분리하고 싶을 때

## 언제 피해야 하는가

- 계산 비용이 커서 캐싱이 필요한 경우
- 사용자 입력처럼 원본과 독립적으로 변경되는 값

## 어떻게 사용하는가

1. 원본 state만 저장한다
2. 파생 값은 렌더 중 계산한다
3. 비싼 계산은 측정 후 useMemo를 검토한다

## 실무 예시

`Derived State`의 핵심은 저장하지 않아도 되는 값은 렌더 중 기존 값에서 계산하는 방식입니다. 목록 필터, 선택 상태, 편집 플로우처럼 값의 소유자가 헷갈리는 화면에서 먼저 검토합니다.

## 기본 코드 형태

```tsx
const [items, setItems] = useState<Item[]>([]);
const selectedItems = items.filter((item) => selectedIds.includes(item.id));
```

## 구분 기준

이 패턴은 "이 값의 소유자는 누구인가"에 대한 답입니다. 값이 서버, URL, 부모, 컴포넌트 내부 중 어디에 속하는지 먼저 나눈 뒤 `Derived State` 패턴을 선택합니다.

형태상으로는 `Computed State`에 속하므로, 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- 상태의 단일 출처가 명확한가?
- 저장하지 않아도 되는 파생 값을 state로 보관하지 않는가?
- 상태 변경이 필요한 컴포넌트 범위보다 더 넓게 퍼지지 않는가?

## 흔한 실수

- 공유될 가능성만 보고 너무 빨리 전역화합니다.
- 파생 값을 state로 중복 저장해 동기화 effect를 만듭니다.
- 서버 상태와 클라이언트 상태의 소유권을 한 store에 섞습니다.

## 적용 흐름

1. 원본 state만 저장한다
2. 파생 값은 렌더 중 계산한다
3. 비싼 계산은 측정 후 useMemo를 검토한다

## 적용하지 않을 신호

- 계산 비용이 커서 캐싱이 필요한 경우
- 사용자 입력처럼 원본과 독립적으로 변경되는 값

## 예제 읽는 법

`Example.tsx`와 `BadCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Use Effect For Derived State](../../anti-patterns/use-effect-for-derived-state/README.md)
- [Expensive Calculation](../../performance-rendering/expensive-calculation/README.md)

## 참고 자료

- [React: Sharing state between components](https://react.dev/learn/sharing-state-between-components)
- [React: Extracting state logic into a reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)
- [React: useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
