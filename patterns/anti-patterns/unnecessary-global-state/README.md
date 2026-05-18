# 불필요한 전역 상태

영문명: Unnecessary Global State
폴더: `anti-patterns/unnecessary-global-state`

## 한 줄 요약

지역 상태로 충분한 값을 전역 store에 올리는 문제를 피합니다.

## 패턴 형태

- 분류: 안티패턴
- 형태: 문제 징후 / 리팩터링 가이드
- 핵심 질문: 지금 보이는 코드 냄새가 실제 버그와 변경 비용으로 이어지는가

## 왜 필요한가

모달 open 여부, 입력 폼 값처럼 한 화면에서만 쓰이는 상태를 Zustand store에 넣으면, store가 비대해지고 컴포넌트 간 의존성이 늘어납니다. 지역 상태는 컴포넌트와 함께 살다 사라져야 합니다.

안티패턴은 금지 목록이 아니라 리팩터링 신호입니다. React 공식 문서의 상태 구조 원칙, effect 사용 기준, key/state 보존 규칙을 기준으로 “왜 처음에는 편해 보였고, 어떤 변경에서 깨지는지”까지 설명해야 팀 리뷰에서 설득력이 생깁니다.

## 핵심 원리

- 전역 store에 올리기 전에 "다른 화면에서도 쓰나?"를 묻는다
- 지역 상태는 컴포넌트가 unmount되면 자동으로 정리된다
- store가 커질수록 디버깅과 테스트가 어려워진다

## 언제 사용하는가

- 한 화면에서만 쓰는 modal open 상태
- 컴포넌트 내부 선택 상태
- 일시적인 입력값

## 언제 피해야 하는가

- 라우트 간 유지되어야 하는 상태
- 여러 독립 영역이 같은 값을 공유해야 하는 경우

## 어떻게 사용하는가

1. 사용 범위를 확인한다
2. 가장 가까운 컴포넌트로 state를 내린다
3. 공유 필요가 생기면 단계적으로 올린다

## 기본 코드 형태

```tsx
function SettingsPanel() {
  const [isOpen, setOpen] = useState(false);
  return <Dialog open={isOpen} onOpenChange={setOpen} />;
}
```

## 실무 판단 기준

- 상태가 라우트 이동, 새로고침, 여러 독립 영역 사이에서 유지되어야 하는지 먼저 확인합니다.
- 한 화면에서만 쓰이고 unmount 때 사라지는 것이 자연스러운 값은 local state가 기본입니다.
- 전역 store는 공유 범위를 넓히는 도구이므로 테스트와 디버깅 비용도 함께 늘어납니다.
- 나중에 필요해질 가능성보다 현재 실제 소비자 수를 기준으로 판단합니다.

## 코드 리뷰 체크리스트

- store state를 읽는 컴포넌트가 하나뿐인데 전역에 올라가 있지 않은가?
- modal open, selected tab, draft input처럼 화면 수명과 같은 값이 store에 남아 있지 않은가?
- 페이지를 떠난 뒤에도 이전 화면의 임시 상태가 다음 진입에 영향을 주지 않는가?
- local state로 내리면 store action과 테스트 fixture가 줄어드는가?

## 흔한 실수

- 모든 modal open 여부를 하나의 UI store에 모아 화면 간 의존성을 만듭니다.
- 폼 draft를 전역에 보관해 취소하거나 페이지를 떠난 뒤에도 값이 남습니다.
- store에 올린 뒤 selector 최적화와 reset action이 추가로 필요해집니다.

## 테스트와 검증 포인트

- 화면을 닫거나 route를 떠났을 때 임시 상태가 자연스럽게 초기화되는지 확인합니다.
- 같은 컴포넌트를 두 번 렌더했을 때 각 인스턴스가 독립 상태를 가져야 하는지 봅니다.
- local state로 내린 뒤 store 관련 테스트와 reset 코드가 줄어드는지 확인합니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 한 화면의 임시 상태가 전역 store에 남아 다른 화면이나 재진입에 영향을 주는 흐름을 봅니다.
- `ImprovedCase.tsx`에서는 상태를 사용하는 컴포넌트 가까이에 내려 수명과 소유권이 줄어드는지 확인합니다.
- 실제 코드에서는 공유 요구가 생겼을 때만 부모, URL, store 순서로 단계적으로 넓힙니다.

## 관련 패턴

- [Local State First](../../state-management/local-state-first/README.md)
- [State Colocation](../../state-management/state-colocation/README.md)

## 참고 자료

- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
