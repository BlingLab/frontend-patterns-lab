# 이벤트 구독 훅

영문명: useEventListener
폴더: `hooks/use-event-listener`

## 한 줄 요약

DOM 이벤트 구독과 해제를 훅 경계 안에 둡니다.

## 패턴 형태

- 분류: Hooks
- 형태: DOM Event Hook
- 목적: 재사용 로직을 어떻게 분리할 것인가

## 왜 필요한가

컴포넌트마다 add/removeEventListener를 직접 쓰면 dependency와 cleanup 버그가 반복됩니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

## 언제 사용하는가

- window, document, element 이벤트를 구독할 때
- 구독 대상이 props로 바뀔 수 있을 때
- cleanup 규칙을 강제하고 싶을 때

## 언제 피해야 하는가

- React synthetic event로 충분한 버튼/입력 이벤트
- 구독 대상이 외부 라이브러리 API인 경우 별도 adapter가 필요한 때

## 어떻게 사용하는가

1. target, event type, listener를 받는다
2. effect에서 등록하고 cleanup한다
3. listener identity와 dependency를 안정화한다

## 실무 예시

`Use Event Listener`의 핵심은 DOM 이벤트 구독과 해제를 훅 경계 안에 둡니다. 컴포넌트마다 반복되는 이벤트, 타이머, 비동기, DOM 구독 로직을 재사용 경계로 묶을 때 유용합니다.

## 기본 코드 형태

```tsx
export function useUseEventListener(input: Input) {
  // 상태, 이벤트, cleanup을 훅 내부에 둔다.
  return { value, setValue, reset };
}
```

## 구분 기준

이 패턴은 "반복되는 절차 로직을 어떤 훅 API로 감출 것인가"에 대한 답입니다. JSX 재사용보다 상태 전이, 구독, cleanup, 이벤트 정책 재사용이 핵심이면 `Use Event Listener` 패턴을 봅니다.

형태상으로는 `DOM Event Hook`에 속하므로, 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- 훅 이름이 도메인 의도를 드러내는가?
- 반환값이 컴포넌트에 필요한 최소 API인가?
- effect, timer, event listener cleanup이 훅 내부에서 보장되는가?

## 흔한 실수

- 한 번만 쓰는 로직까지 훅으로 분리해 읽기 경로를 늘립니다.
- 훅이 너무 많은 값을 반환해 사실상 숨겨진 컴포넌트가 됩니다.
- dependency와 cleanup을 호출부에 떠넘깁니다.

## 적용 흐름

1. target, event type, listener를 받는다
2. effect에서 등록하고 cleanup한다
3. listener identity와 dependency를 안정화한다

## 적용하지 않을 신호

- React synthetic event로 충분한 버튼/입력 이벤트
- 구독 대상이 외부 라이브러리 API인 경우 별도 adapter가 필요한 때

## 예제 읽는 법

`Example.tsx`와 `BadCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Effect Cleanup Missing](../../anti-patterns/effect-cleanup-missing/README.md)
- [Use Outside Click](../use-outside-click/README.md)

## 참고 자료

- [React: Reusing logic with custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React: useEffect](https://react.dev/reference/react/useEffect)
