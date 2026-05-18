# effect cleanup 누락

영문명: Effect Cleanup Missing
폴더: `anti-patterns/effect-cleanup-missing`

## 한 줄 요약

구독, 타이머, 외부 연결을 cleanup하지 않는 문제를 피합니다.

## 패턴 형태

- 분류: 안티패턴
- 형태: 문제 징후 / 리팩터링 가이드
- 핵심 질문: 지금 보이는 코드 냄새가 실제 버그와 변경 비용으로 이어지는가

## 왜 필요한가

setInterval, addEventListener, WebSocket처럼 외부 리소스를 점유하는 코드를 useEffect에서 정리하지 않으면 컴포넌트가 unmount돼도 계속 실행됩니다. 메모리 누수와 setState 경고가 발생합니다.

안티패턴은 금지 목록이 아니라 리팩터링 신호입니다. React 공식 문서의 상태 구조 원칙, effect 사용 기준, key/state 보존 규칙을 기준으로 “왜 처음에는 편해 보였고, 어떤 변경에서 깨지는지”까지 설명해야 팀 리뷰에서 설득력이 생깁니다.

## 핵심 원리

- effect return 함수에서 반드시 cleanup한다
- clearInterval, removeEventListener, ws.close()가 cleanup에 들어간다
- React StrictMode에서 mount→unmount→mount를 두 번 하므로 cleanup이 빠지면 바로 보인다

## 언제 사용하는가

- addEventListener, setInterval, WebSocket 구독
- 외부 라이브러리 인스턴스 연결
- effect가 외부 시스템을 시작하는 경우

## 언제 피해야 하는가

- 렌더 중 계산 가능한 값
- React state만 업데이트하는 로직

## 어떻게 사용하는가

1. effect에서 외부 시스템을 시작한다
2. return cleanup에서 해제한다
3. dependency 변경 시 재연결되는 흐름을 확인한다

## 기본 코드 형태

```tsx
useEffect(() => {
  const id = window.setInterval(tick, 1000);

  return () => window.clearInterval(id);
}, [tick]);
```

## 실무 판단 기준

- effect가 React 밖의 시스템을 시작하면 cleanup도 같은 effect 안에 있어야 합니다.
- timer, DOM event, WebSocket, BroadcastChannel, observer, 외부 라이브러리 instance는 모두 해제 경로를 확인합니다.
- dependency가 바뀌면 이전 연결을 끊고 새 연결을 만드는 흐름까지 고려합니다.
- StrictMode에서 mount, cleanup, mount가 반복되어도 중복 구독이나 중복 타이머가 남지 않아야 합니다.

## 코드 리뷰 체크리스트

- `addEventListener`가 있으면 같은 target/type/listener/options로 `removeEventListener`가 있는가?
- `setInterval`이나 `setTimeout` id가 cleanup에서 clear되는가?
- WebSocket, subscription, observer 같은 객체가 `close`, `unsubscribe`, `disconnect` 되는가?
- cleanup 함수가 stale callback이나 바뀐 dependency 때문에 잘못된 리소스를 해제하지 않는가?

## 흔한 실수

- 이벤트 리스너를 익명 함수로 등록해 cleanup에서 같은 함수를 제거하지 못합니다.
- dependency 변경마다 새 interval을 만들지만 이전 interval을 clear하지 않습니다.
- WebSocket 연결을 닫지 않아 unmount 후에도 메시지 handler가 setState를 호출합니다.
- cleanup 누락을 숨기려고 `isMounted` flag만 추가하고 실제 외부 리소스는 해제하지 않습니다.

## 테스트와 검증 포인트

- 컴포넌트를 mount, unmount, remount했을 때 listener나 timer가 하나만 남는지 확인합니다.
- dependency 값을 바꿨을 때 이전 구독이 해제되고 새 구독만 살아 있는지 봅니다.
- 테스트에서는 fake timer나 spy로 `clearInterval`, `removeEventListener`, `unsubscribe` 호출을 확인합니다.
- 브라우저 콘솔에서 unmount 후 setState 경고나 중복 로그가 없는지 확인합니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 컴포넌트를 숨겼다가 다시 보여줄 때 timer나 listener가 누적되는 흐름을 봅니다.
- `ImprovedCase.tsx`에서는 effect가 시작한 외부 작업을 return cleanup에서 정확히 해제하는지 확인합니다.
- 반복되는 DOM 이벤트 cleanup은 `hooks/use-event-listener` 패턴처럼 훅으로 감싸 재사용할 수 있습니다.

## 관련 패턴

- [Use Event Listener](../../hooks/use-event-listener/README.md)
- [Use Effect For Derived State](../use-effect-for-derived-state/README.md)

## 참고 자료

- [React: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
