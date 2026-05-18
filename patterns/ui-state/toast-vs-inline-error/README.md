# 토스트 vs 인라인 오류

영문명: Toast vs Inline Error
폴더: `ui-state/toast-vs-inline-error`

## 한 줄 요약

오류의 복구 위치에 따라 toast와 inline 메시지를 선택합니다.

## 패턴 형태

- 분류: UI 상태 표현
- 형태: Feedback State / Recovery Path
- 핵심 질문: 현재 상태와 다음 행동을 사용자가 바로 이해할 수 있는가

## 왜 필요한가

폼 필드 오류를 toast로 보내면 사용자가 어떤 필드를 고쳐야 하는지 모릅니다. 반대로 전역 시스템 오류를 모든 폼 필드 아래 표시하면 연관성이 없습니다. 오류 위치와 복구 행동이 맞아야 합니다.

UI 상태 문서는 데이터 구조보다 사용자 피드백을 중심으로 봐야 합니다. 같은 실패라도 사용자가 고칠 수 있는 필드 오류, 일시적 시스템 오류, 복구 불가능한 오류는 표시 위치와 다음 행동이 다릅니다. 접근성 관점에서는 disabled, modal, error message가 focus와 보조 기술에 어떻게 전달되는지도 함께 봅니다.

## 핵심 원리

- inline: 특정 필드/영역과 직접 연관된 오류
- toast: 어디서든 볼 수 있는 일시적 알림, 성공 메시지
- 치명적 오류는 페이지 전체 에러 상태로 표현한다

## 언제 사용하는가

- 사용자가 같은 위치에서 고칠 수 있으면 inline
- 작업 결과 알림이나 전역 실패는 toast
- 폼 오류는 field/global error로 분리

## 언제 피해야 하는가

- 중요 오류를 자동 사라지는 toast에만 두는 경우
- 동일 오류를 toast와 inline에 중복 노출하는 경우

## 어떻게 사용하는가

1. 오류 원인과 복구 위치를 분류한다
2. 복구 가능한 입력 오류는 inline으로 둔다
3. 전역 시스템 오류는 toast나 banner로 알린다

## 기본 코드 형태

```tsx
if (error.field === 'email') {
  return <FieldError id="email-error">이미 사용 중인 이메일입니다.</FieldError>;
}

toast.error('저장하지 못했습니다. 잠시 후 다시 시도해 주세요.');
```

## 실무 판단 기준

- 사용자가 고칠 위치가 화면 안에 있으면 inline error를 우선합니다.
- 일시적 네트워크 실패, 저장 완료, 백그라운드 작업 실패처럼 특정 필드에 묶이지 않는 피드백은 toast가 적합합니다.
- toast는 사라지는 UI라서 사용자가 반드시 수정해야 하는 정보의 유일한 출처가 되면 안 됩니다.
- 폼 제출 실패는 서버 오류 매핑을 거쳐 field error와 form error로 나누고, toast는 보조 알림으로만 둡니다.

## 코드 리뷰 체크리스트

- 오류를 고칠 입력 필드가 있는데 toast로만 보여주고 있지 않은가?
- inline error가 `aria-describedby`와 `aria-invalid`로 입력과 연결되어 있는가?
- toast가 중복으로 쌓이거나 같은 오류를 여러 번 말하지 않는가?
- form-level error와 field-level error가 서로 다른 위치와 문구로 구분되는가?

## 흔한 실수

- 이메일 형식 오류를 toast로 보여줘 사용자가 어떤 입력을 고쳐야 하는지 찾게 만듭니다.
- 저장 성공 toast와 inline 성공 메시지를 동시에 보여줘 피드백이 중복됩니다.
- toast 자동 닫힘 시간 안에 읽지 못하면 중요한 오류 정보가 사라집니다.
- 서버 오류를 모두 전역 toast로 보내 필드별 오류 매핑 기회를 잃습니다.

## 테스트와 검증 포인트

- 필드 오류, 폼 전체 오류, 네트워크 오류, 저장 성공을 각각 발생시켜 표시 위치를 확인합니다.
- toast가 사라진 뒤에도 사용자가 해결해야 할 inline 오류는 화면에 남아 있는지 봅니다.
- 같은 요청을 빠르게 반복했을 때 toast가 과도하게 쌓이지 않는지 확인합니다.
- 스크린 리더가 inline error와 toast 알림을 각각 적절한 우선순위로 읽는지 점검합니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 사용자가 고칠 위치가 있는 오류까지 toast로 흘려보내는 흐름을 봅니다.
- `Example.tsx`에서는 필드 오류는 입력 가까이에, 시스템 오류는 toast에 배치되는 기준을 확인합니다.
- 실제 코드에서는 서버 오류 매핑 결과가 field error인지 form error인지 먼저 정한 뒤 toast 사용 여부를 결정합니다.

## 관련 패턴

- [Server Error Mapping](../../forms/server-error-mapping/README.md)
- [Error State](../error-state/README.md)

## 참고 자료

- [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [WAI-ARIA APG: Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [MDN: aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled)
