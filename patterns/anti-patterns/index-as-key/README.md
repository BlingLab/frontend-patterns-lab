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
items.map((item) => <Row key={item.id} item={item} />);
```

## 실무 판단 기준

- key는 화면 위치가 아니라 항목 identity를 나타내야 합니다.
- 추가, 삭제, 정렬, 필터, drag and drop이 가능한 목록에서는 index key를 쓰지 않습니다.
- 항목 안에 input, checkbox, local state, animation state가 있으면 key 안정성이 사용자 버그로 바로 이어집니다.
- 서버 id가 아직 없다면 항목을 생성하는 시점에 client id를 만들고, 렌더 중에는 새 id를 만들지 않습니다.

## 코드 리뷰 체크리스트

- `.map((item, index) => <Row key={index} ...>)`가 동적 목록에 쓰이고 있지 않은가?
- 항목 삭제 후 input 값, focus, 펼침 상태가 같은 데이터에 남는가?
- 정렬이나 필터 후 선택 상태가 다른 행으로 이동하지 않는가?
- id가 없다는 이유로 렌더마다 `crypto.randomUUID()`를 호출하고 있지 않은가?

## 흔한 실수

- index key를 쓰면서 “현재는 정렬이 없다”고 가정하지만 나중에 삭제나 필터가 추가됩니다.
- 서버 id가 없어서 렌더 중 random id를 만들어 매 렌더 모든 행을 remount시킵니다.
- 같은 항목을 여러 탭이나 필터에서 보여주면서 화면 위치별 key를 써 state가 섞입니다.
- key 문제를 input을 controlled로 바꿔 숨기지만 focus나 animation state 문제는 남습니다.

## 테스트와 검증 포인트

- 두 번째 행에 값을 입력한 뒤 첫 번째 행을 삭제해 입력값이 같은 항목에 남는지 봅니다.
- 정렬, 필터, drag and drop 후 선택/확장/focus 상태가 데이터와 함께 이동하는지 확인합니다.
- 새 항목 추가 시 생성된 id가 이후 렌더에서도 유지되는지 확인합니다.
- 정적 목록이라 index를 허용한다면 “순서와 길이가 바뀌지 않는다”는 조건이 문서나 코드 구조로 드러나는지 봅니다.

## 예제에서 확인할 것

- 좋은 예에서는 참가자 id가 key라서 첫 항목을 제거해도 각 입력값이 같은 참가자에 붙어 있습니다.
- 나쁜 예에서는 index가 key라서 첫 항목 제거 후 DOM state가 화면 위치 기준으로 재사용됩니다.
- 동적 필드 배열, sortable table, drag and drop list처럼 항목 순서가 바뀌는 화면에서는 이 문제가 더 쉽게 드러납니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 첫 항목 삭제 후 입력값이나 행 상태가 화면 위치 기준으로 재사용되는지 봅니다.
- `ImprovedCase.tsx`에서는 항목 id가 key로 쓰여 삭제/정렬 후에도 state가 같은 데이터에 붙어 있는지 확인합니다.
- `forms/dynamic-fields` 문서와 함께 보면 폼 배열에서 index key가 왜 더 위험한지 연결해 볼 수 있습니다.

## 관련 패턴

- [Dynamic Fields](../../forms/dynamic-fields/README.md)
- [List Rendering](../../performance-rendering/list-rendering/README.md)

## 참고 자료

- [React: Rendering Lists](https://react.dev/learn/rendering-lists)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
