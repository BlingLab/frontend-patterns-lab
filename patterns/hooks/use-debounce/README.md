# debounce 훅

영문명: useDebounce
폴더: `hooks/use-debounce`

## 한 줄 요약

연속 입력을 일정 시간 멈춘 뒤 한 번만 반영합니다.

## 패턴 형태

- 분류: Hooks
- 형태: Timing Hook
- 목적: 재사용 로직을 어떻게 분리할 것인가

## 왜 필요한가

검색어 입력마다 요청이나 무거운 계산을 실행하면 성능과 서버 비용이 커집니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

## 언제 사용하는가

- 검색 입력 후 API 요청을 늦출 때
- 자동 저장을 사용자가 멈춘 뒤 실행할 때
- 비싼 필터링을 입력마다 하지 않으려 할 때

## 언제 피해야 하는가

- 즉시 반응해야 하는 키보드 조작
- 마지막 값이 아니라 일정 주기 값이 필요한 경우

## 어떻게 사용하는가

1. 원본 값을 state로 받고 지연 값을 별도로 만든다
2. effect에서 timer를 설정하고 cleanup한다
3. delay를 요구사항에 맞게 문서화한다

## 실무 예시

`Use Debounce`의 핵심은 연속 입력을 일정 시간 멈춘 뒤 한 번만 반영하는 방식입니다. 컴포넌트마다 반복되는 이벤트, 타이머, 비동기, DOM 구독 로직을 재사용 경계로 묶을 때 유용합니다.

## 기본 코드 형태

```tsx
export function useUseDebounce(input: Input) {
  // 상태, 이벤트, cleanup을 훅 내부에 둔다.
  return { value, setValue, reset };
}
```

## 구분 기준

이 패턴은 "반복되는 절차 로직을 어떤 훅 API로 감출 것인가"에 대한 답입니다. JSX 재사용보다 상태 전이, 구독, cleanup, 이벤트 정책 재사용이 핵심이면 `Use Debounce` 패턴을 봅니다.

형태상으로는 `Timing Hook`에 속하므로, 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- 훅 이름이 도메인 의도를 드러내는가?
- 반환값이 컴포넌트에 필요한 최소 API인가?
- effect, timer, event listener cleanup이 훅 내부에서 보장되는가?

## 흔한 실수

- 한 번만 쓰는 로직까지 훅으로 분리해 읽기 경로를 늘립니다.
- 훅이 너무 많은 값을 반환해 사실상 숨겨진 컴포넌트가 됩니다.
- dependency와 cleanup을 호출부에 떠넘깁니다.

## 적용 흐름

1. 원본 값을 state로 받고 지연 값을 별도로 만든다
2. effect에서 timer를 설정하고 cleanup한다
3. delay를 요구사항에 맞게 문서화한다

## 적용하지 않을 신호

- 즉시 반응해야 하는 키보드 조작
- 마지막 값이 아니라 일정 주기 값이 필요한 경우

## 예제 읽는 법

`Example.tsx`와 `BadCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Use Throttle](../use-throttle/README.md)
- [Query Hook Pattern](../../async-api/query-hook-pattern/README.md)

## 참고 자료

- [React: Reusing logic with custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React: useEffect](https://react.dev/reference/react/useEffect)
