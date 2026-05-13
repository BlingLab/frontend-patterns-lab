# 동적 필드

영문명: Dynamic Fields
폴더: `forms/dynamic-fields`

## 한 줄 요약

반복 가능한 필드 배열을 안정적인 id와 함께 추가/삭제합니다.

## 패턴 형태

- 분류: 폼과 검증
- 형태: Form State / Validation / Submission Flow
- 핵심 질문: 입력 값, 검증, 제출 상태를 어느 경계에서 관리할 것인가

## 왜 필요한가

팀원 이메일을 여러 개 입력하는 폼에서 index를 key로 쓰면, 중간 항목을 삭제할 때 입력값이 꼬입니다. 각 항목에 고유 id를 부여하면 추가/삭제 시 상태가 안정됩니다.

폼은 단순한 입력 모음이 아니라 값 소유권, 검증 시점, 서버 오류 매핑, 제출 중복 방지가 함께 움직이는 워크플로입니다. React input 문서는 controlled 입력과 uncontrolled 입력의 차이를 분명히 나누고, 복잡한 폼에서는 필드 단위와 폼 단위 책임을 분리하는 것이 중요합니다.

## 핵심 원리

- 항목마다 고유 id를 생성해 key로 쓴다
- 추가는 배열 append, 삭제는 id 기준 filter로 처리한다
- React Hook Form useFieldArray가 이 패턴을 제공한다

## 언제 사용하는가

- 주소, 옵션, 멤버처럼 행을 추가/삭제하는 폼
- 각 행이 자체 오류와 dirty 상태를 가질 때
- 정렬이나 삭제가 가능한 리스트 입력

## 언제 피해야 하는가

- 고정 필드 수가 명확한 폼
- 서버 스키마가 동적 필드를 허용하지 않는 경우

## 어떻게 사용하는가

1. 각 행에 안정적인 id를 둔다
2. 추가/삭제/정렬 함수를 캡슐화한다
3. 오류도 id 또는 field path로 관리한다

## 기본 코드 형태

```tsx
const [items, setItems] = useState([{ id: crypto.randomUUID(), label: '' }]);

setItems((current) => [...current, { id: crypto.randomUUID(), label: '' }]);

return items.map((item) => <Field key={item.id} value={item.label} />);
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
- 중간 행을 삭제한 뒤 사용자가 입력하던 값과 focus가 의도한 행에 남는지 확인합니다.
- 서버가 `members[1].email`처럼 index 기반 오류를 돌려줄 때, 현재 UI 행과 오류가 어긋나지 않는지 점검합니다.

## 예제 읽는 법

- `BadCase.tsx`에서 두 번째 입력값을 직접 수정한 뒤 첫 번째 행을 삭제해 봅니다. `key={index}` 때문에 DOM이 같은 위치에 재사용되면서 값이 다른 멤버에 붙을 수 있습니다.
- `Example.tsx`는 각 행에 `crypto.randomUUID()`로 만든 id를 두고, 값 변경과 삭제를 모두 id 기준으로 처리합니다.
- 실제 코드 리뷰에서는 key만 보지 말고 오류 매핑, dirty 상태, 서버 제출 payload가 같은 식별자를 공유하는지도 함께 확인합니다.

## 관련 패턴

- [Index As Key](../../anti-patterns/index-as-key/README.md)
- [Field Level Validation](../field-level-validation/README.md)

## 참고 자료

- [React Hook Form: useFieldArray](https://react-hook-form.com/docs/usefieldarray)
- [React: Rendering Lists](https://react.dev/learn/rendering-lists)
- [React DOM: input](https://react.dev/reference/react-dom/components/input)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
