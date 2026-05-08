# 서버 오류 매핑

영문명: Server Error Mapping
폴더: `forms/server-error-mapping`

## 한 줄 요약

서버 오류를 필드 오류와 폼 전체 오류로 변환합니다.

## 패턴 형태

- 분류: 폼과 검증
- 형태: Error Mapping
- 목적: 입력, 검증, 제출을 어떻게 다룰 것인가

## 왜 필요한가

API 오류 형태를 그대로 노출하면 사용자가 어디를 고쳐야 하는지 알기 어렵고 UI가 서버 스키마에 묶입니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

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

## 실무 예시

`Server Error Mapping`의 핵심은 서버 오류를 필드 오류와 폼 전체 오류로 변환하는 방식입니다. 입력값, 검증, 서버 오류, 제출 잠금이 함께 필요한 업무 폼에서 구조를 잡을 때 사용합니다.

## 기본 코드 형태

```ts
function mapServerErrors(error: ApiError) {
  return {
    fieldErrors: error.fields ?? {},
    formError: error.message ?? null,
  };
}
```

## 구분 기준

이 패턴은 "사용자 입력의 소유권과 검증 책임을 어디에 둘 것인가"에 대한 답입니다. 값 변경, 오류 표시, 제출 흐름이 함께 움직이면 `Server Error Mapping` 패턴이 후보입니다.

형태상으로는 `Error Mapping`에 속하므로, 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- 필드 오류와 폼 전체 오류가 구분되는가?
- 검증 시점과 제출 잠금 정책이 명확한가?
- 서버 오류가 UI 필드명으로 안전하게 매핑되는가?

## 흔한 실수

- 모든 검증을 submit 시점으로 미뤄 사용자가 늦게 오류를 봅니다.
- 서버 오류를 toast 하나로 처리해 필드 복구 위치를 잃습니다.
- 동적 필드에 index key를 사용해 입력 상태가 섞입니다.

## 적용 흐름

1. 서버 error code를 UI field name으로 매핑한다
2. fieldErrors와 global error를 나눈다
3. 알 수 없는 오류는 안전한 기본 메시지로 처리한다

## 적용하지 않을 신호

- 서버 오류가 단순 toast로 충분한 비폼 액션
- 클라이언트 검증으로 충분히 막을 수 있는 오류만 있을 때

## 예제 읽는 법

`Example.tsx`와 `BadCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Toast vs Inline Error](../../ui-state/toast-vs-inline-error/README.md)
- [API Adapter](../../async-api/api-adapter/README.md)

## 참고 자료

- [React: <input>](https://react.dev/reference/react-dom/components/input)
