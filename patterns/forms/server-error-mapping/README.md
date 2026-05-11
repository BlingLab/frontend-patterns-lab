# 서버 오류 매핑

영문명: Server Error Mapping
폴더: `forms/server-error-mapping`

## 한 줄 요약

서버 오류를 필드 오류와 폼 전체 오류로 변환합니다.

## 패턴 형태

- 분류: 폼과 검증
- 형태: Form State / Validation / Submission Flow
- 핵심 질문: 입력 값, 검증, 제출 상태를 어느 경계에서 관리할 것인가

## 왜 필요한가

이메일 중복처럼 클라이언트에서 미리 알 수 없는 오류는 서버가 응답해야 합니다. 이 응답을 폼 필드 옆에 정확히 표시하지 않으면 사용자가 무엇이 잘못됐는지 모릅니다.

폼은 단순한 입력 모음이 아니라 값 소유권, 검증 시점, 서버 오류 매핑, 제출 중복 방지가 함께 움직이는 워크플로입니다. React input 문서는 controlled 입력과 uncontrolled 입력의 차이를 분명히 나누고, 복잡한 폼에서는 필드 단위와 폼 단위 책임을 분리하는 것이 중요합니다.

## 핵심 원리

- 서버 응답의 field 이름으로 각 필드 에러를 setError 한다
- 전역 오류는 별도 영역에 표시한다
- 422 Unprocessable Entity 응답의 errors 배열을 매핑하는 게 일반적이다

## 언제 사용하는가

- 서버가 필드별 validation error를 반환할 때
- 중복 이메일, 권한 실패 등 서버 판단이 필요한 경우
- 폼 라이브러리와 API 오류 구조가 다를 때

## 언제 피해야 하는가

- 서버 오류가 단순 toast로 충분한 비폼 액션
- 클라이언트 검증으로 충분히 막을 수 있는 오류만 있을 때

## 어떻게 사용하는가

1. 서버 error code를 UI field name으로 매핑한다
2. fieldErrors와 global error를 나눈다
3. 알 수 없는 오류는 안전한 기본 메시지로 처리한다

## 기본 코드 형태

```ts
function mapServerErrors(error: ApiError) {
  return {
    fieldErrors: error.fields ?? {},
    formError: error.message ?? null,
  };
}
```

## 실무 판단 기준

- 입력 중 값이 UI 조건과 즉시 연결되면 controlled form을 씁니다.
- 제출 시점에만 값이 필요하고 필드 수가 많으면 uncontrolled 접근을 검토합니다.
- 단일 필드 규칙은 필드 가까이에 두고, 교차 필드 규칙은 폼 레벨에서 다룹니다.
- 서버 오류는 필드 오류와 폼 전체 오류로 변환해 사용자가 고칠 위치를 알 수 있게 합니다.

## 코드 리뷰 체크리스트

- 값 소유자가 React state, DOM, 폼 라이브러리 중 어디인지 명확한가?
- 검증 시점이 onChange, onBlur, submit 중 사용자 경험에 맞게 선택되었는가?
- 제출 중복, 서버 오류, dirty 상태가 서로 다른 모델로 표현되는가?
- 동적 필드 배열에 안정적인 id가 있는가?

## 흔한 실수

- 모든 필드를 controlled로 만들어 타이핑마다 큰 폼 전체가 리렌더됩니다.
- 서버 오류를 toast 하나로만 보여줘 사용자가 어떤 필드를 고칠지 알 수 없습니다.
- index를 key로 쓰는 동적 필드에서 중간 삭제 후 입력 값이 다른 행으로 이동합니다.

## 테스트와 검증 포인트

- 빈 값, 잘못된 값, 서버 거절, 중복 제출을 각각 재현합니다.
- 키보드 제출, Enter, 빠른 더블 클릭, 뒤로 가기/단계 이동을 확인합니다.
- 동적 필드는 추가, 삭제, 재정렬 후 오류 메시지와 값이 같은 항목에 남는지 봅니다.

## 예제에서 확인할 것

- 좋은 예는 서버 validation 응답을 `fieldErrors`와 `formError`로 나눠 각 입력 가까이에 보여줍니다.
- 나쁜 예는 서버 오류를 하나의 전역 메시지로만 보여줘 사용자가 이메일과 팀 이름 중 무엇을 고쳐야 하는지 알기 어렵습니다.
- 서버 오류 매핑 함수는 UI와 분리된 순수 함수로 두면 응답 스키마 변경을 작은 테스트로 검증할 수 있습니다.

## 예제 읽는 법

- `BadCase.tsx`에서 책임이 어디에 섞여 있는지 먼저 봅니다.
- `Example.tsx`에서 호출부 API, 상태 소유권, 변경 범위가 어떻게 줄었는지 비교합니다.
- 문서의 체크리스트를 기준으로 같은 패턴을 실제 코드 리뷰에 적용할 수 있는지 확인합니다.

## 관련 패턴

- [Toast vs Inline Error](../../ui-state/toast-vs-inline-error/README.md)
- [API Adapter](../../async-api/api-adapter/README.md)

## 참고 자료

- [React Hook Form: setError](https://react-hook-form.com/docs/useform/seterror)
- [React DOM: input](https://react.dev/reference/react-dom/components/input)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React Hook Form: useFieldArray](https://react-hook-form.com/docs/usefieldarray)
