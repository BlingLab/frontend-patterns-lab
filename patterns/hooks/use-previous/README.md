# 이전 값 훅

영문명: usePrevious
폴더: `hooks/use-previous`

## 한 줄 요약

직전 렌더의 값을 ref에 보관해 현재 값과 비교합니다.

## 패턴 형태

- 분류: 훅과 로직 재사용
- 형태: Ref Hook
- 목적: 재사용 로직을 어떻게 분리할 것인가

## 왜 필요한가

이전 값과 현재 값의 차이를 보고 애니메이션, 로그, 변경 감지를 해야 할 때가 있습니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

## 언제 사용하는가

- 값 변화 방향을 계산할 때
- 이전 props와 비교해 이벤트를 남길 때
- 렌더에는 필요하지만 변경이 렌더를 유발하면 안 될 때

## 언제 피해야 하는가

- 이전 값 자체가 화면 상태라 렌더를 유발해야 할 때
- 복잡한 히스토리가 필요한 경우

## 어떻게 사용하는가

1. useRef에 이전 값을 저장한다
2. effect에서 렌더 후 현재 값을 ref에 넣는다
3. undefined 초기 상태를 처리한다

## 실무 예시

`Use Previous`의 핵심은 직전 렌더의 값을 ref에 보관해 현재 값과 비교하는 방식입니다. 컴포넌트마다 반복되는 이벤트, 타이머, 비동기, DOM 구독 로직을 재사용 경계로 묶을 때 유용합니다.

## 기본 코드 형태

```tsx
export function useUsePrevious(input: Input) {
  // 상태, 이벤트, cleanup을 훅 내부에 둔다.
  return { value, setValue, reset };
}
```

## 구분 기준

이 패턴은 "반복되는 절차 로직을 어떤 훅 API로 감출 것인가"에 대한 답입니다. JSX 재사용보다 상태 전이, 구독, cleanup, 이벤트 정책 재사용이 핵심이면 `Use Previous` 패턴을 봅니다.

형태상으로는 `Ref Hook`에 속하므로, 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- 훅 이름이 도메인 의도를 드러내는가?
- 반환값이 컴포넌트에 필요한 최소 API인가?
- effect, timer, event listener cleanup이 훅 내부에서 보장되는가?

## 흔한 실수

- 한 번만 쓰는 로직까지 훅으로 분리해 읽기 경로를 늘립니다.
- 훅이 너무 많은 값을 반환해 사실상 숨겨진 컴포넌트가 됩니다.
- dependency와 cleanup을 호출부에 떠넘깁니다.

## 적용 흐름

1. useRef에 이전 값을 저장한다
2. effect에서 렌더 후 현재 값을 ref에 넣는다
3. undefined 초기 상태를 처리한다

## 적용하지 않을 신호

- 이전 값 자체가 화면 상태라 렌더를 유발해야 할 때
- 복잡한 히스토리가 필요한 경우

## 예제 읽는 법

`Example.tsx`와 `BadCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Render Tracking](../../performance-rendering/render-tracking/README.md)
- [Derived State](../../state-management/derived-state/README.md)

## 참고 자료

- [React: Reusing logic with custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React: useEffect](https://react.dev/reference/react/useEffect)
