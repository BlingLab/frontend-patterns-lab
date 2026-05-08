# Use Async

## 한 줄 요약

비동기 작업의 loading/data/error 상태를 공통 모델로 다룹니다.

## 패턴 형태

- 분류: Hooks
- 형태: Async Hook
- 목적: 재사용 로직을 어떻게 분리할 것인가

## 왜 필요한가

요청 상태를 화면마다 직접 만들면 중복과 race condition이 늘어납니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

## 언제 사용하는가

- 작은 로컬 비동기 작업
- TanStack Query까지는 필요 없는 단발 요청
- 컴포넌트 내부에서 요청 상태를 명확히 보여주고 싶을 때

## 언제 피해야 하는가

- 서버 캐시, 재시도, 동기화가 필요한 데이터
- 여러 화면이 공유하는 서버 상태

## 어떻게 사용하는가

1. 요청 시작 시 loading으로 바꾼다
2. 성공/실패 상태를 명시한다
3. unmount 후 setState를 막는다

## 실무 예시

`Use Async`의 핵심은 비동기 작업의 loading/data/error 상태를 공통 모델로 다룹니다. 컴포넌트마다 반복되는 이벤트, 타이머, 비동기, DOM 구독 로직을 재사용 경계로 묶을 때 유용합니다.

## 기본 코드 형태

```tsx
export function useUseAsync(input: Input) {
  // 상태, 이벤트, cleanup을 훅 내부에 둔다.
  return { value, setValue, reset };
}
```

## 구분 기준

이 패턴은 "반복되는 절차 로직을 어떤 훅 API로 감출 것인가"에 대한 답입니다. JSX 재사용보다 상태 전이, 구독, cleanup, 이벤트 정책 재사용이 핵심이면 `Use Async` 패턴을 봅니다.

형태상으로는 `Async Hook`에 속하므로, 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- 훅 이름이 도메인 의도를 드러내는가?
- 반환값이 컴포넌트에 필요한 최소 API인가?
- effect, timer, event listener cleanup이 훅 내부에서 보장되는가?

## 흔한 실수

- 한 번만 쓰는 로직까지 훅으로 분리해 읽기 경로를 늘립니다.
- 훅이 너무 많은 값을 반환해 사실상 숨겨진 컴포넌트가 됩니다.
- dependency와 cleanup을 호출부에 떠넘깁니다.

## 적용 흐름

1. 요청 시작 시 loading으로 바꾼다
2. 성공/실패 상태를 명시한다
3. unmount 후 setState를 막는다

## 적용하지 않을 신호

- 서버 캐시, 재시도, 동기화가 필요한 데이터
- 여러 화면이 공유하는 서버 상태

## 예제 읽는 법

`Example.tsx`와 `BadCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Query Hook Pattern](../../async-api/query-hook-pattern/README.md)
- [Request Status Model](../../async-api/request-status-model/README.md)

## 참고 자료

- [React: Reusing logic with custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React: useEffect](https://react.dev/reference/react/useEffect)
