# index를 key로 사용

영문명: Index as Key
폴더: `anti-patterns/index-as-key`

## 한 줄 요약

동적 리스트에서 배열 index를 key로 쓰는 문제를 피합니다.

## 패턴 형태

- 분류: 안티패턴
- 형태: 문제 징후 / 리팩터링 가이드
- 핵심 질문: 지금 보이는 코드 냄새가 실제 버그와 변경 비용으로 이어지는가

## 왜 필요한가

항목을 추가/삭제/정렬하면 index가 바뀝니다. React는 같은 key를 같은 컴포넌트로 인식하므로, index가 key이면 기존 컴포넌트가 다른 데이터로 재사용됩니다. 입력 중인 텍스트가 다른 행으로 이동하는 버그가 대표적입니다.

안티패턴은 금지 목록이 아니라 리팩터링 신호입니다. React 공식 문서의 상태 구조 원칙, effect 사용 기준, key/state 보존 규칙을 기준으로 “왜 처음에는 편해 보였고, 어떤 변경에서 깨지는지”까지 설명해야 팀 리뷰에서 설득력이 생깁니다.

## 핵심 원리

- 안정적인 고유 id를 key로 사용한다
- 정적이고 순서가 절대 안 바뀌는 목록만 index가 허용된다
- id가 없으면 crypto.randomUUID()나 nanoid로 생성한다

## 언제 사용하는가

- 삭제/정렬/필터가 가능한 목록
- 각 항목이 내부 state를 가진 경우
- 동적 필드 배열

## 언제 피해야 하는가

- 순서와 길이가 절대 바뀌지 않는 정적 목록
- id가 없고 렌더 비용보다 생성 비용이 큰 극히 단순 케이스

## 어떻게 사용하는가

1. 데이터에 안정 id를 추가한다
2. 서버 id가 없으면 생성 시 uuid를 만든다
3. key는 화면 위치가 아니라 항목 identity를 나타내게 한다

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

## 예제에서 확인할 것

- 좋은 예에서는 참가자 id가 key라서 첫 항목을 제거해도 각 입력값이 같은 참가자에 붙어 있습니다.
- 나쁜 예에서는 index가 key라서 첫 항목 제거 후 DOM state가 화면 위치 기준으로 재사용됩니다.
- 동적 필드 배열, sortable table, drag and drop list처럼 항목 순서가 바뀌는 화면에서는 이 문제가 더 쉽게 드러납니다.

## 예제 읽는 법

- `BadCase.tsx`에서 문제가 되는 흐름을 먼저 재현합니다.
- `ImprovedCase.tsx`에서 책임이 어디로 이동했는지 확인합니다.
- `Example.tsx`는 개선안을 더 작은 화면 맥락에서 실행해 보는 기준으로 읽습니다.

## 관련 패턴

- [Dynamic Fields](../../forms/dynamic-fields/README.md)
- [List Rendering](../../performance-rendering/list-rendering/README.md)

## 참고 자료

- [React: Rendering Lists](https://react.dev/learn/rendering-lists)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
