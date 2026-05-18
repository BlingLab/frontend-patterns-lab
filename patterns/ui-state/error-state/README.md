# 에러 상태

영문명: Error State
폴더: `ui-state/error-state`

## 한 줄 요약

복구 가능한 오류를 명확한 메시지와 액션으로 보여줍니다.

## 패턴 형태

- 분류: UI 상태 표현
- 형태: Feedback State / Recovery Path
- 핵심 질문: 현재 상태와 다음 행동을 사용자가 바로 이해할 수 있는가

## 왜 필요한가

오류 코드만 보여주거나 아무것도 안 보여주면 사용자가 무엇을 해야 하는지 모릅니다. 무슨 문제인지, 어떻게 해결할 수 있는지를 명확히 하면 사용자 이탈을 줄일 수 있습니다.

UI 상태 문서는 데이터 구조보다 사용자 피드백을 중심으로 봐야 합니다. 같은 실패라도 사용자가 고칠 수 있는 필드 오류, 일시적 시스템 오류, 복구 불가능한 오류는 표시 위치와 다음 행동이 다릅니다. 접근성 관점에서는 disabled, modal, error message가 focus와 보조 기술에 어떻게 전달되는지도 함께 봅니다.

## 핵심 원리

- 다시 시도 버튼으로 복구 경로를 제공한다
- 오류 코드보다 사용자 언어로 설명한다
- 오류 유형에 따라 retry/refresh/go-home 등 적절한 액션을 제공한다

## 언제 사용하는가

- 재시도 가능한 네트워크 오류
- 부분 위젯 실패
- 권한이나 입력 문제처럼 사용자가 조치할 수 있는 오류

## 언제 피해야 하는가

- 개발자만 알아야 하는 stack trace 노출
- 보안상 원인을 자세히 말하면 안 되는 오류

## 어떻게 사용하는가

1. 사용자 언어로 원인을 요약한다
2. 재시도/이전/문의 같은 액션을 제공한다
3. 로그용 세부정보는 별도 채널로 보낸다

## 기본 코드 형태

```tsx
<ErrorState
  title="데이터를 불러오지 못했습니다"
  description="네트워크 상태를 확인한 뒤 다시 시도해 주세요."
  action={<Button onClick={retry}>다시 시도</Button>}
/>
```

## 실무 판단 기준

- 사용자가 해결할 수 있는 오류인지, 시스템이 복구해야 하는 오류인지 먼저 구분합니다.
- 재시도가 의미 있는 오류에는 retry를, 입력 수정이 필요한 오류에는 해당 필드나 설정 화면으로 가는 행동을 둡니다.
- 전체 화면을 막는 오류와 일부 영역만 실패한 오류를 같은 컴포넌트로 처리하지 않습니다.
- 기술적 원인은 로그에 남기고, 화면 문구는 사용자가 할 수 있는 행동 중심으로 씁니다.

## 코드 리뷰 체크리스트

- 오류가 발생한 영역과 사용자 행동 위치가 가까운가?
- 같은 화면에서 빈 상태, 권한 없음, 네트워크 오류가 구분되어 보이는가?
- retry가 같은 실패를 무한 반복하지 않도록 pending/disabled 처리가 있는가?
- `role="alert"`나 live region으로 중요한 오류가 보조 기술에 전달되는가?

## 흔한 실수

- 서버 500, 네트워크 끊김, 권한 없음, 입력 오류를 모두 같은 “오류가 발생했습니다”로 처리합니다.
- retry 버튼은 있지만 누르면 중복 요청이 여러 번 나갑니다.
- 필드 오류를 페이지 상단 toast로만 보여줘 사용자가 수정 위치를 찾지 못합니다.
- 개발자용 오류 메시지를 그대로 노출해 사용자에게 불필요한 세부 정보를 보여줍니다.

## 테스트와 검증 포인트

- 네트워크 오류, 서버 오류, 권한 오류, validation 오류를 각각 강제로 만들어 확인합니다.
- retry 중 버튼이 pending 상태가 되고 중복 클릭이 막히는지 확인합니다.
- 부분 실패 영역만 오류 UI로 바뀌고 성공한 영역은 유지되는지 확인합니다.
- 오류 후 복구 성공 시 alert가 사라지고 focus 흐름이 어색하지 않은지 봅니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 오류를 단순 문구로만 숨기거나 복구 행동 없이 끝내는 흐름을 봅니다.
- `Example.tsx`에서는 오류 원인, 영향 범위, 다음 행동이 함께 드러나는지 확인합니다.
- 실제 코드에서는 Error Boundary가 잡을 오류와 화면 상태로 처리할 오류를 분리합니다.

## 관련 패턴

- [Error Boundary](../../async-api/error-boundary/README.md)
- [Toast vs Inline Error](../toast-vs-inline-error/README.md)

## 참고 자료

- [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [WAI-ARIA APG: Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [MDN: aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled)
