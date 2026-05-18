# 비활성 상태

영문명: Disabled State
폴더: `ui-state/disabled-state`

## 한 줄 요약

액션이 불가능한 상태와 이유를 명확히 표현합니다.

## 패턴 형태

- 분류: UI 상태 표현
- 형태: Feedback State / Recovery Path
- 핵심 질문: 현재 상태와 다음 행동을 사용자가 바로 이해할 수 있는가

## 왜 필요한가

버튼이 왜 비활성 상태인지 모르면 사용자가 좌절합니다. 비활성 버튼에 tooltip이나 도움말을 붙여 "무엇을 해야 활성화되는지" 알려주면 UX가 크게 개선됩니다.

UI 상태 문서는 데이터 구조보다 사용자 피드백을 중심으로 봐야 합니다. 같은 실패라도 사용자가 고칠 수 있는 필드 오류, 일시적 시스템 오류, 복구 불가능한 오류는 표시 위치와 다음 행동이 다릅니다. 접근성 관점에서는 disabled, modal, error message가 focus와 보조 기술에 어떻게 전달되는지도 함께 봅니다.

## 핵심 원리

- 단순 disabled 속성만으론 이유를 전달하지 못한다
- tooltip이나 helper text로 비활성 이유를 명시한다
- aria-disabled와 함께 스크린 리더도 고려한다

## 언제 사용하는가

- 필수 입력이 부족한 제출 버튼
- 권한이나 상태 때문에 실행할 수 없는 액션
- 선택 항목이 있어야 가능한 bulk action

## 언제 피해야 하는가

- 사용자가 이유를 알아야 하는데 tooltip/문구가 없는 경우
- disabled 때문에 focus와 설명 접근성이 사라지는 경우

## 어떻게 사용하는가

1. 불가능한 조건을 계산한다
2. 가능하면 가까운 위치에 이유를 보여준다
3. 권한 문제와 입력 문제를 구분한다

## 기본 코드 형태

```tsx
const disabledReason = !hasSelection ? '항목을 먼저 선택하세요.' : undefined;

<Button disabled={Boolean(disabledReason)} aria-describedby="bulk-action-help">
  선택 항목 삭제
</Button>
<p id="bulk-action-help">{disabledReason}</p>
```

## 실무 판단 기준

- disabled는 “불가능함”을 표현하고, helper text는 “무엇을 하면 가능해지는지”를 설명합니다.
- 입력 부족, 권한 부족, 처리 중, 선택 없음처럼 비활성 이유를 구분합니다.
- 사용자가 이유를 알아야 하는 주요 액션은 버튼 주변에 설명을 둡니다. tooltip만으로 이유를 숨기지 않습니다.
- 실제 제출 방지는 disabled UI와 별개로 submit handler나 서버에서도 검증합니다.

## 코드 리뷰 체크리스트

- disabled 조건이 여러 곳에 흩어져 버튼과 설명이 서로 다른 이유를 말하지 않는가?
- `aria-describedby`로 버튼과 비활성 사유가 연결되어 있는가?
- pending 때문에 잠긴 버튼과 조건 미충족 때문에 잠긴 버튼의 문구가 구분되는가?
- 링크처럼 disabled 속성이 없는 요소에는 `aria-disabled`, click 방지, focus 정책이 함께 설계되어 있는가?

## 흔한 실수

- 버튼만 흐리게 만들고 사용자가 왜 누를 수 없는지 알 수 없게 둡니다.
- disabled 버튼에만 tooltip을 달아 키보드 사용자가 이유를 확인하지 못합니다.
- 처리 중 중복 제출 방지와 권한 부족 상태를 같은 disabled 문구로 처리합니다.
- 프론트에서만 disabled 처리하고 실제 action handler에서는 조건을 다시 검사하지 않습니다.

## 테스트와 검증 포인트

- 선택 없음, 필수 입력 누락, 권한 없음, pending 상태를 각각 확인합니다.
- 키보드와 스크린 리더에서 비활성 사유가 액션 근처에서 읽히는지 확인합니다.
- 조건이 충족되면 버튼, 설명, submit 가능 여부가 동시에 갱신되는지 봅니다.
- 강제로 handler를 호출해도 서버 요청이 부적절하게 나가지 않는지 확인합니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 disabled 조건만 있고 이유가 화면에 연결되지 않는 지점을 봅니다.
- `Example.tsx`에서는 비활성 사유가 버튼 가까이에 있고 `aria-describedby`로 연결되는지 확인합니다.
- 실제 제품 코드에서는 disabled reason을 문자열로 계산해 UI와 guard가 같은 출처를 쓰게 만들면 유지보수가 쉽습니다.

## 관련 패턴

- [Field Level Validation](../../forms/field-level-validation/README.md)
- [Pending State](../pending-state/README.md)

## 참고 자료

- [MDN: aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled)
- [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [WAI-ARIA APG: Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
