# 비제어 폼

영문명: Uncontrolled Form
폴더: `forms/uncontrolled-form`

## 한 줄 요약

DOM이 입력 값을 보관하고 제출 시점에 값을 읽습니다.

## 패턴 형태

- 분류: 폼과 검증
- 형태: Uncontrolled Form
- 목적: 입력, 검증, 제출을 어떻게 다룰 것인가

## 왜 필요한가

간단한 폼에서 모든 키 입력을 React state로 올리면 코드와 렌더 비용이 불필요하게 커질 수 있습니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

## 언제 사용하는가

- 제출 시점에만 값이 필요할 때
- 필드 수가 많고 입력 중 렌더가 부담될 때
- 브라우저 기본 폼 동작을 활용하고 싶을 때

## 언제 피해야 하는가

- 입력 중 다른 UI를 즉시 바꿔야 할 때
- 값을 외부 상태와 항상 동기화해야 할 때

## 어떻게 사용하는가

1. defaultValue/defaultChecked를 사용한다
2. submit에서 FormData나 ref로 값을 읽는다
3. 초기값 변경과 reset 정책을 명확히 한다

## 실무 예시

`Uncontrolled Form`의 핵심은 DOM이 입력 값을 보관하고 제출 시점에 값을 읽습니다. 입력값, 검증, 서버 오류, 제출 잠금이 함께 필요한 업무 폼에서 구조를 잡을 때 사용합니다.

## 기본 코드 형태

```tsx
function SignupForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
  }

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## 구분 기준

이 패턴은 "사용자 입력의 소유권과 검증 책임을 어디에 둘 것인가"에 대한 답입니다. 값 변경, 오류 표시, 제출 흐름이 함께 움직이면 `Uncontrolled Form` 패턴이 후보입니다.

패턴 유형으로는 `Uncontrolled Form`에 가깝습니다. 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- 필드 오류와 폼 전체 오류가 구분되는가?
- 검증 시점과 제출 잠금 정책이 명확한가?
- 서버 오류가 UI 필드명으로 안전하게 매핑되는가?

## 흔한 실수

- 모든 검증을 submit 시점으로 미뤄 사용자가 늦게 오류를 봅니다.
- 서버 오류를 toast 하나로 처리해 필드 복구 위치를 잃습니다.
- 동적 필드에 index key를 사용해 입력 상태가 섞입니다.

## 적용 흐름

1. defaultValue/defaultChecked를 사용한다
2. submit에서 FormData나 ref로 값을 읽는다
3. 초기값 변경과 reset 정책을 명확히 한다

## 적용하지 않을 신호

- 입력 중 다른 UI를 즉시 바꿔야 할 때
- 값을 외부 상태와 항상 동기화해야 할 때

## 예제 읽는 법

`Example.tsx`와 `BadCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Controlled Form](../controlled-form/README.md)
- [Use Controllable State](../../hooks/use-controllable-state/README.md)

## 참고 자료

- [React: <input>](https://react.dev/reference/react-dom/components/input)
