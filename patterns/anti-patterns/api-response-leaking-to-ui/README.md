# API 응답 UI 누수

영문명: API Response Leaking to UI
폴더: `anti-patterns/api-response-leaking-to-ui`

## 한 줄 요약

서버 응답 구조가 UI 컴포넌트까지 새는 문제를 피합니다.

## 패턴 형태

- 분류: 안티패턴
- 형태: 문제 징후 / 리팩터링 가이드
- 핵심 질문: 지금 보이는 코드 냄새가 실제 버그와 변경 비용으로 이어지는가

## 왜 필요한가

user_name, created_at 같은 서버 snake_case를 컴포넌트 props로 직접 받으면, 서버 API가 바뀔 때 UI 컴포넌트 파일들을 모두 수정해야 합니다. adapter 계층에서 UI 타입으로 변환하면 변경 격리가 됩니다.

안티패턴은 금지 목록이 아니라 리팩터링 신호입니다. React 공식 문서의 상태 구조 원칙, effect 사용 기준, key/state 보존 규칙을 기준으로 “왜 처음에는 편해 보였고, 어떤 변경에서 깨지는지”까지 설명해야 팀 리뷰에서 설득력이 생깁니다.

## 핵심 원리

- 서버 타입을 직접 컴포넌트 props에 쓰지 않는다
- adapter/transform 함수로 서버 타입을 UI 타입으로 변환한다
- 서버 스키마 변경이 UI 코드에 영향을 주지 않게 된다

## 언제 사용하는가

- snake_case 응답을 UI에서 직접 읽는 경우
- 서버 null/optional 처리가 컴포넌트마다 반복될 때
- 여러 API 버전을 화면이 알아야 할 때

## 언제 피해야 하는가

- 작은 내부 도구에서 API와 UI 모델이 사실상 동일한 경우
- 별도 도메인 계층이 이미 변환을 담당하는 경우

## 어떻게 사용하는가

1. adapter에서 UI 모델로 변환한다
2. 컴포넌트 prop은 UI 언어로 정의한다
3. 변환 로직을 단위 테스트한다

## 기본 코드 형태

```tsx
function toUserViewModel(response: ApiUser): UserViewModel {
  return {
    name: response.user_name,
    joinedAtLabel: formatDate(response.created_at),
  };
}
```

## 실무 판단 기준

- API 응답 타입은 네트워크 경계 안에서 끝내고, 화면 컴포넌트는 UI 언어의 타입을 받게 합니다.
- snake_case, nullable 필드, 서버 enum, 날짜 문자열 변환은 adapter에서 처리합니다.
- 같은 응답을 여러 화면에서 쓰더라도 각 화면이 필요한 view model은 다를 수 있습니다.
- 아주 작은 내부 도구처럼 API와 UI 수명이 완전히 같은 경우에는 adapter를 과하게 만들지 않습니다.

## 코드 리뷰 체크리스트

- 컴포넌트 props에 `user_name`, `created_at`, `is_deleted` 같은 서버 필드명이 직접 들어오지 않는가?
- null fallback, 날짜 포맷, 서버 status 해석이 여러 컴포넌트에 반복되지 않는가?
- API 버전 변경 시 adapter 테스트만 고치면 되는가, 화면 파일을 줄줄이 고쳐야 하는가?
- UI 모델 이름이 사용자가 보는 개념과 맞는가?

## 흔한 실수

- 서버 응답을 그대로 전역 store에 넣고 모든 컴포넌트가 API 스키마를 알게 만듭니다.
- 각 컴포넌트에서 `user_name ?? '이름 없음'` 같은 fallback을 반복합니다.
- adapter가 단순 rename을 넘어서 화면 상태와 side effect까지 처리해 또 다른 거대한 계층이 됩니다.
- 서버 enum을 UI className에 바로 연결해 API 값 변경이 스타일 깨짐으로 이어집니다.

## 테스트와 검증 포인트

- API 필드명이 바뀌거나 null이 추가됐을 때 adapter 테스트가 먼저 실패하는지 확인합니다.
- 날짜, 통화, status label 같은 표시 규칙이 한 곳에서 검증되는지 봅니다.
- 컴포넌트 테스트는 API 응답이 아니라 UI 모델 fixture로 작성할 수 있어야 합니다.
- 서버 응답 샘플을 추가해 adapter가 누락 필드와 예상 밖 enum을 어떻게 처리하는지 확인합니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 서버 필드명이 UI 마크업까지 흘러 들어가는 지점을 찾습니다.
- `ImprovedCase.tsx`에서는 adapter가 API 응답을 화면에 필요한 이름, 포맷, fallback으로 바꾸는 경계를 확인합니다.
- 실제 코드에서는 query hook 안에서 adapter를 호출해 컴포넌트가 이미 변환된 데이터를 받게 만드는 방식이 실용적입니다.

## 관련 패턴

- [API Adapter](../../async-api/api-adapter/README.md)
- [Query Hook Pattern](../../async-api/query-hook-pattern/README.md)

## 참고 자료

- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
