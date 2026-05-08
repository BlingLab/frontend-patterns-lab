# 폼 단위 검증

영문명: Form Level Validation
폴더: `forms/form-level-validation`

## 한 줄 요약

여러 필드의 조합을 폼 단위에서 검증합니다.

## 패턴 형태

- 분류: Forms
- 형태: Cross-field Validation
- 목적: 입력, 검증, 제출을 어떻게 다룰 것인가

## 왜 필요한가

비밀번호 확인, 날짜 범위처럼 필드 하나만 봐서는 판단할 수 없는 규칙이 있습니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

## 언제 사용하는가

- 두 값의 일치 여부
- 시작일/종료일 범위
- 조건부 필수 입력

## 언제 피해야 하는가

- 필드 독립 규칙까지 모두 중앙화해 메시지가 멀어질 때
- 서버 검증 결과를 클라이언트가 흉내내는 경우

## 어떻게 사용하는가

1. 전체 form value를 입력으로 받는 validator를 만든다
2. fieldErrors와 formError를 구분한다
3. submit 전과 의존 필드 변경 시 재검증한다

## 실무 예시

`Form Level Validation`의 핵심은 여러 필드의 조합을 폼 단위에서 검증하는 방식입니다. 입력값, 검증, 서버 오류, 제출 잠금이 함께 필요한 업무 폼에서 구조를 잡을 때 사용합니다.

## 기본 코드 형태

```ts
function validateForm(values: SignupValues) {
  if (values.password !== values.confirmPassword) {
    return { confirmPassword: '비밀번호가 일치하지 않습니다.' };
  }
  return {};
}
```

## 구분 기준

이 패턴은 "사용자 입력의 소유권과 검증 책임을 어디에 둘 것인가"에 대한 답입니다. 값 변경, 오류 표시, 제출 흐름이 함께 움직이면 `Form Level Validation` 패턴이 후보입니다.

형태상으로는 `Cross-field Validation`에 속하므로, 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- 필드 오류와 폼 전체 오류가 구분되는가?
- 검증 시점과 제출 잠금 정책이 명확한가?
- 서버 오류가 UI 필드명으로 안전하게 매핑되는가?

## 흔한 실수

- 모든 검증을 submit 시점으로 미뤄 사용자가 늦게 오류를 봅니다.
- 서버 오류를 toast 하나로 처리해 필드 복구 위치를 잃습니다.
- 동적 필드에 index key를 사용해 입력 상태가 섞입니다.

## 적용 흐름

1. 전체 form value를 입력으로 받는 validator를 만든다
2. fieldErrors와 formError를 구분한다
3. submit 전과 의존 필드 변경 시 재검증한다

## 적용하지 않을 신호

- 필드 독립 규칙까지 모두 중앙화해 메시지가 멀어질 때
- 서버 검증 결과를 클라이언트가 흉내내는 경우

## 예제 읽는 법

`Example.tsx`와 `BadCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Field Level Validation](../field-level-validation/README.md)
- [Dependent Fields](../dependent-fields/README.md)

## 참고 자료

- [React: <input>](https://react.dev/reference/react-dom/components/input)
