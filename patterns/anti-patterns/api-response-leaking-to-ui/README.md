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
// BadCase.tsx에서 문제 지점을 확인한 뒤
// ImprovedCase.tsx에서 책임을 어디로 옮겼는지 비교한다.
```

## 실무 판단 기준

- 먼저 버그가 나는 사용자 흐름이나 변경 요구를 찾습니다.
- 문제를 만든 책임 경계를 좁혀 최소 리팩터링 단위로 나눕니다.
- 개선 후에는 불가능한 상태, 중복 소스, 불안정한 identity가 줄었는지 확인합니다.
- 예외적으로 괜찮은 단순 케이스까지 금지 규칙으로 만들지 않습니다.

## 코드 리뷰 체크리스트

- 문제 징후가 실제 변경 비용이나 사용자 버그로 이어지는가?
- 개선안이 책임을 더 명확히 만들고 테스트 단위를 좁히는가?
- 새 abstraction이 기존 코드보다 더 읽기 쉬운 API를 제공하는가?
- 예외 케이스와 적용하지 않을 신호가 문서화되어 있는가?

## 흔한 실수

- 문제 징후를 발견하자마자 큰 구조 개편으로 번집니다.
- 성능 문제와 가독성 문제를 구분하지 않고 memoization으로 가립니다.
- 개선 기준 없이 파일만 쪼개거나 store만 추가합니다.

## 테스트와 검증 포인트

- BadCase에서 어떤 변경이 깨지는지 먼저 재현합니다.
- ImprovedCase에서 같은 변경을 적용했을 때 수정 범위가 줄었는지 확인합니다.
- 정적 목록, 작은 컴포넌트, 임시 코드처럼 예외가 되는 상황을 리뷰에서 분리합니다.

## 예제 읽는 법

- `BadCase.tsx`에서 문제가 되는 흐름을 먼저 재현합니다.
- `ImprovedCase.tsx`에서 책임이 어디로 이동했는지 확인합니다.
- `Example.tsx`는 개선안을 더 작은 화면 맥락에서 실행해 보는 기준으로 읽습니다.

## 관련 패턴

- [API Adapter](../../async-api/api-adapter/README.md)
- [Query Hook Pattern](../../async-api/query-hook-pattern/README.md)

## 참고 자료

- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
