# 제출 잠금

영문명: Submit Lock
폴더: `forms/submit-lock`

## 한 줄 요약

제출 중 같은 액션이 다시 실행되지 않도록 잠급니다.

## 패턴 형태

- 분류: 폼과 검증
- 형태: Form State / Validation / Submission Flow
- 핵심 질문: 입력 값, 검증, 제출 상태를 어느 경계에서 관리할 것인가

## 왜 필요한가

결제 버튼을 빠르게 두 번 누르면 중복 결제가 발생할 수 있습니다. isSubmitting 상태로 버튼을 disabled 처리하면 처음 제출이 완료되기 전까지 다시 제출할 수 없습니다.

폼은 단순한 입력 모음이 아니라 값 소유권, 검증 시점, 서버 오류 매핑, 제출 중복 방지가 함께 움직이는 워크플로입니다. React input 문서는 controlled 입력과 uncontrolled 입력의 차이를 분명히 나누고, 복잡한 폼에서는 필드 단위와 폼 단위 책임을 분리하는 것이 중요합니다.

## 핵심 원리

- 제출 시작 시 isSubmitting=true, 완료/실패 시 false로 되돌린다
- 버튼을 disabled 처리하고 loading 표시를 보여준다
- 서버 요청이 아닌 UI에서도 중복 방지가 필요하다

## 언제 사용하는가

- 결제, 저장, 생성처럼 중복 요청 비용이 있는 액션
- 버튼과 키보드 제출이 모두 가능한 폼
- 요청 중 pending UI가 필요한 경우

## 언제 피해야 하는가

- 멱등 API라 중복 제출이 자연스럽게 허용되는 경우
- 자동 저장처럼 여러 요청을 병합해야 하는 경우

## 어떻게 사용하는가

1. submit 시작 시 lock을 건다
2. 완료/실패 시 lock을 해제한다
3. 버튼 disabled와 pending label을 함께 제공한다

## 기본 코드 형태

```tsx
if (isSubmitting) return;

setSubmitting(true);
try {
  await submit(values);
} finally {
  setSubmitting(false);
}
```

## 실무 판단 기준

- submit lock은 같은 요청이 동시에 여러 번 나가면 안 되는 액션에 둡니다.
- UI 버튼 disabled만 믿지 말고 submit handler 초입에서도 pending 상태를 guard합니다.
- 실패 후에는 사용자가 다시 시도할 수 있도록 lock을 반드시 풀어야 합니다.
- 멱등 API나 서버 idempotency key가 있더라도 클라이언트 pending 표현은 별도로 필요합니다.

## 코드 리뷰 체크리스트

- 빠른 더블 클릭, Enter 반복, 모바일 탭 반복이 같은 guard를 통과하는가?
- pending 중 버튼 disabled, aria-busy, loading label이 같이 바뀌는가?
- 성공, 실패, throw 모든 경로에서 lock이 해제되거나 다음 상태로 전이되는가?
- 같은 화면의 서로 다른 submit 액션이 lock state를 부적절하게 공유하지 않는가?

## 흔한 실수

- 버튼만 disabled 처리하고 Enter submit이나 직접 handler 호출은 막지 않습니다.
- catch 경로에서 pending을 false로 돌리지 않아 폼이 영구 잠금 상태가 됩니다.
- 여러 submit 버튼이 하나의 `isSubmitting`을 공유해 독립 액션까지 모두 막습니다.
- pending 중에도 입력값을 계속 바꿀 수 있어 요청 payload와 화면 상태가 달라집니다.

## 테스트와 검증 포인트

- 더블 클릭과 Enter 연타에서 요청 함수가 한 번만 호출되는지 확인합니다.
- 실패 응답 후 다시 제출할 수 있는지 확인합니다.
- pending 중 label, disabled, aria-busy가 동시에 갱신되는지 봅니다.
- 페이지 이동이나 unmount 시 pending 업데이트가 경고를 만들지 않는지 확인합니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 버튼을 빠르게 눌렀을 때 같은 submit이 여러 번 실행되는지 봅니다.
- `Example.tsx`에서는 hook이나 guard가 UI disabled와 실제 submit 방지를 같은 상태로 묶는지 확인합니다.
- 실제 코드에서는 서버 mutation hook의 `isPending`과 로컬 submit lock이 중복되지 않도록 역할을 나눕니다.

## 관련 패턴

- [Pending State](../../ui-state/pending-state/README.md)
- [Mutation Hook Pattern](../../async-api/mutation-hook-pattern/README.md)

## 참고 자료

- [React DOM: input](https://react.dev/reference/react-dom/components/input)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React Hook Form: useFieldArray](https://react-hook-form.com/docs/usefieldarray)
