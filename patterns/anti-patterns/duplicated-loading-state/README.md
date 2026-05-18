# 중복 로딩 상태

영문명: Duplicated Loading State
폴더: `anti-patterns/duplicated-loading-state`

## 한 줄 요약

같은 요청 상태를 여러 boolean으로 중복 관리하는 문제를 피합니다.

## 패턴 형태

- 분류: 안티패턴
- 형태: 문제 징후 / 리팩터링 가이드
- 핵심 질문: 지금 보이는 코드 냄새가 실제 버그와 변경 비용으로 이어지는가

## 왜 필요한가

isLoading, isError, isSuccess를 각각 boolean state로 관리하면 isLoading=false이면서 isError=false이면서 isSuccess=false인 초기 상태, 그리고 isLoading=true이면서 isSuccess=true인 불가능한 상태가 생깁니다.

안티패턴은 금지 목록이 아니라 리팩터링 신호입니다. React 공식 문서의 상태 구조 원칙, effect 사용 기준, key/state 보존 규칙을 기준으로 “왜 처음에는 편해 보였고, 어떤 변경에서 깨지는지”까지 설명해야 팀 리뷰에서 설득력이 생깁니다.

## 핵심 원리

- status: 'idle' | 'loading' | 'success' | 'error' 하나로 표현한다
- 불가능한 상태 조합이 타입 수준에서 차단된다
- switch(status)로 렌더 분기가 exhaustive하게 된다

## 언제 사용하는가

- 요청 상태 boolean이 3개 이상일 때
- loading과 error가 동시에 true가 되는 버그
- 상태별 화면 분기가 반복될 때

## 언제 피해야 하는가

- 단순 액션 pending 하나만 필요한 경우
- 서버 상태 라이브러리의 상태를 그대로 사용하는 경우

## 어떻게 사용하는가

1. 명시적 request status union으로 바꾼다
2. 상태별 필요한 데이터만 담는다
3. 화면은 status 기준으로 분기한다

## 기본 코드 형태

```tsx
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Data }
  | { status: 'error'; error: Error };
```

## 실무 판단 기준

- 같은 요청의 상태는 여러 boolean이 아니라 하나의 status로 표현합니다.
- 성공 데이터와 실패 메시지는 해당 status 안에 함께 묶어 다른 상태에서 접근하지 못하게 합니다.
- 요청 시작, 성공, 실패, 재시도 전이를 표로 그렸을 때 빠진 경로가 없어야 합니다.
- 단순 버튼 pending 하나라면 boolean도 충분하지만, idle/success/error까지 표현하면 union이 더 안전합니다.

## 코드 리뷰 체크리스트

- 같은 요청을 설명하는 boolean state가 3개 이상으로 흩어져 있지 않은가?
- loading, success, error가 동시에 보이는 불가능한 조합을 만들 수 있는가?
- 성공 데이터와 에러 메시지가 해당 status 안에만 존재하는가?
- 화면 분기가 status 하나를 기준으로 읽히는가?

## 흔한 실수

- 요청 시작 때 이전 success를 끄지 않아 로딩과 성공 메시지가 함께 보입니다.
- 실패 처리 때 isLoading을 false로 바꾸지 않아 spinner와 에러가 동시에 보입니다.
- 데이터, 에러, 상태가 따로 움직여 UI가 어떤 요청 결과인지 추적하기 어렵습니다.

## 테스트와 검증 포인트

- 요청 시작, 성공, 실패, 재시도를 순서대로 눌러 불가능한 조합이 생기지 않는지 봅니다.
- 성공 후 다시 요청할 때 이전 성공 메시지가 loading 화면에 남지 않는지 확인합니다.
- 실패 후 재시도할 때 이전 error와 새 loading이 동시에 노출되지 않는지 확인합니다.

## 예제 읽는 법

- `BadCase.tsx`에서 `요청 시작`, `실패 표시`를 차례로 눌러 봅니다. 저장 중, 완료, 실패 메시지가 동시에 보이는 충돌 상태가 됩니다.
- `Example.tsx`는 `idle | loading | success | error` union 중 하나만 저장해 같은 흐름에서 한 상태만 렌더합니다.
- 실제 코드에서는 서버 상태 라이브러리를 쓰더라도, 직접 만든 UI state가 같은 요청 상태를 중복 표현하지 않는지 확인합니다.

## 관련 패턴

- [Request Status Model](../../async-api/request-status-model/README.md)
- [Loading / Empty / Error](../../ui-state/loading-empty-error/README.md)

## 참고 자료

- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
