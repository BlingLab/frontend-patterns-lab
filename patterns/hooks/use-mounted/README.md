# 마운트 여부 훅

영문명: useMounted
폴더: `hooks/use-mounted`

## 한 줄 요약

마운트 여부를 ref로 추적해 비동기 완료 후 안전하게 확인합니다.

## 패턴 형태

- 분류: 훅과 로직 재사용
- 형태: Lifecycle Guard Hook
- 목적: 재사용 로직을 어떻게 분리할 것인가

## 왜 필요한가

비동기 작업 완료 시점에 컴포넌트가 이미 사라졌을 수 있습니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

## 언제 사용하는가

- legacy API나 취소 불가능한 promise를 다룰 때
- 비동기 완료 후 DOM/상태 작업을 보호해야 할 때
- 테스트에서 unmount 시나리오를 다룰 때

## 언제 피해야 하는가

- AbortController로 취소 가능한 fetch
- 상태 업데이트를 아예 상위 캐시 계층에 맡길 수 있을 때

## 어떻게 사용하는가

1. mount 시 ref를 true로 둔다
2. cleanup에서 false로 바꾼다
3. 비동기 완료 전에 ref를 확인한다

## 실무 예시

`Use Mounted`의 핵심은 마운트 여부를 ref로 추적해 비동기 완료 후 안전하게 확인하는 방식입니다. 컴포넌트마다 반복되는 이벤트, 타이머, 비동기, DOM 구독 로직을 재사용 경계로 묶을 때 유용합니다.

## 기본 코드 형태

```tsx
export function useUseMounted(input: Input) {
  // 상태, 이벤트, cleanup을 훅 내부에 둔다.
  return { value, setValue, reset };
}
```

## 구분 기준

이 패턴은 "반복되는 절차 로직을 어떤 훅 API로 감출 것인가"에 대한 답입니다. JSX 재사용보다 상태 전이, 구독, cleanup, 이벤트 정책 재사용이 핵심이면 `Use Mounted` 패턴을 봅니다.

패턴 유형으로는 `Lifecycle Guard Hook`에 가깝습니다. 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- 훅 이름이 도메인 의도를 드러내는가?
- 반환값이 컴포넌트에 필요한 최소 API인가?
- effect, timer, event listener cleanup이 훅 내부에서 보장되는가?

## 흔한 실수

- 한 번만 쓰는 로직까지 훅으로 분리해 읽기 경로를 늘립니다.
- 훅이 너무 많은 값을 반환해 사실상 숨겨진 컴포넌트가 됩니다.
- dependency와 cleanup을 호출부에 떠넘깁니다.

## 적용 흐름

1. mount 시 ref를 true로 둔다
2. cleanup에서 false로 바꾼다
3. 비동기 완료 전에 ref를 확인한다

## 적용하지 않을 신호

- AbortController로 취소 가능한 fetch
- 상태 업데이트를 아예 상위 캐시 계층에 맡길 수 있을 때

## 예제 읽는 법

`Example.tsx`와 `BadCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Use Async](../use-async/README.md)
- [Effect Cleanup Missing](../../anti-patterns/effect-cleanup-missing/README.md)

## 참고 자료

- [React: Reusing logic with custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React: useEffect](https://react.dev/reference/react/useEffect)
