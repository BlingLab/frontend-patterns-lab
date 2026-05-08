# throttle 훅

영문명: useThrottle
폴더: `hooks/use-throttle`

## 한 줄 요약

반복 이벤트를 정해진 주기 안에서 최대 한 번만 처리합니다.

## 패턴 형태

- 분류: 훅과 로직 재사용
- 형태: Timing Hook
- 목적: 재사용 로직을 어떻게 분리할 것인가

## 왜 필요한가

scroll, resize, pointermove 같은 이벤트를 모두 처리하면 렌더와 계산 비용이 커집니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

## 언제 사용하는가

- 스크롤 위치 추적
- 윈도우 리사이즈 계산
- 드래그 중 미리보기 갱신

## 언제 피해야 하는가

- 마지막 입력값이 반드시 보장돼야 할 때
- 사용자 입력 완료 후 실행이 더 자연스러운 경우

## 어떻게 사용하는가

1. 마지막 실행 시각을 기억한다
2. 주기 안의 이벤트는 무시하거나 예약한다
3. leading/trailing 정책을 정한다

## 실무 예시

`Use Throttle`의 핵심은 반복 이벤트를 정해진 주기 안에서 최대 한 번만 처리하는 방식입니다. 컴포넌트마다 반복되는 이벤트, 타이머, 비동기, DOM 구독 로직을 재사용 경계로 묶을 때 유용합니다.

## 기본 코드 형태

```tsx
export function useUseThrottle(input: Input) {
  // 상태, 이벤트, cleanup을 훅 내부에 둔다.
  return { value, setValue, reset };
}
```

## 구분 기준

이 패턴은 "반복되는 절차 로직을 어떤 훅 API로 감출 것인가"에 대한 답입니다. JSX 재사용보다 상태 전이, 구독, cleanup, 이벤트 정책 재사용이 핵심이면 `Use Throttle` 패턴을 봅니다.

패턴 유형으로는 `Timing Hook`에 가깝습니다. 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- 훅 이름이 도메인 의도를 드러내는가?
- 반환값이 컴포넌트에 필요한 최소 API인가?
- effect, timer, event listener cleanup이 훅 내부에서 보장되는가?

## 흔한 실수

- 한 번만 쓰는 로직까지 훅으로 분리해 읽기 경로를 늘립니다.
- 훅이 너무 많은 값을 반환해 사실상 숨겨진 컴포넌트가 됩니다.
- dependency와 cleanup을 호출부에 떠넘깁니다.

## 적용 흐름

1. 마지막 실행 시각을 기억한다
2. 주기 안의 이벤트는 무시하거나 예약한다
3. leading/trailing 정책을 정한다

## 적용하지 않을 신호

- 마지막 입력값이 반드시 보장돼야 할 때
- 사용자 입력 완료 후 실행이 더 자연스러운 경우

## 예제 읽는 법

`Example.tsx`와 `BadCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Use Debounce](../use-debounce/README.md)
- [Use Event Listener](../use-event-listener/README.md)

## 참고 자료

- [React: Reusing logic with custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React: useEffect](https://react.dev/reference/react/useEffect)
