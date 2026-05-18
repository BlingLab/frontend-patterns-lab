# 제어 폼

영문명: Controlled Form
폴더: `forms/controlled-form`

## 한 줄 요약

입력 값을 React state로 직접 제어합니다.

## 패턴 형태

- 분류: 폼과 검증
- 형태: Form State / Validation / Submission Flow
- 핵심 질문: 입력 값, 검증, 제출 상태를 어느 경계에서 관리할 것인가

## 왜 필요한가

입력 값이 state에 있으면 실시간 유효성 검사, 조건부 필드 표시, 입력 포맷팅을 자연스럽게 할 수 있습니다. 단 필드가 많아질수록 렌더가 잦아지므로 React Hook Form 같은 라이브러리를 검토해야 합니다.

폼은 단순한 입력 모음이 아니라 값 소유권, 검증 시점, 서버 오류 매핑, 제출 중복 방지가 함께 움직이는 워크플로입니다. React input 문서는 controlled 입력과 uncontrolled 입력의 차이를 분명히 나누고, 복잡한 폼에서는 필드 단위와 폼 단위 책임을 분리하는 것이 중요합니다.

## 핵심 원리

- value + onChange로 입력을 완전히 제어한다
- 실시간 유효성 검사와 조건부 렌더링이 쉽다
- 필드가 많으면 렌더 최적화를 고려한다

## 언제 사용하는가

- 입력 중 검증이나 미리보기가 필요할 때
- submit 버튼 disabled 조건이 입력값에 의존할 때
- 폼 상태를 부모나 URL과 연결해야 할 때

## 언제 피해야 하는가

- 필드가 매우 많고 매 키 입력 렌더가 부담될 때
- 제출 시점에만 값이 필요할 때

## 어떻게 사용하는가

1. 각 input에 value와 onChange를 연결한다
2. state shape를 제출 payload와 가깝게 둔다
3. 파생 검증값은 중복 저장하지 않는다

## 기본 코드 형태

```tsx
const [email, setEmail] = useState('');

<input value={email} onChange={(event) => setEmail(event.target.value)} />
```

## 실무 판단 기준

- 입력값이 즉시 preview, validation, disabled 조건, dependent field에 영향을 주면 controlled form이 적합합니다.
- 필드 수가 많고 제출 시점에만 값이 필요하면 uncontrolled나 폼 라이브러리를 먼저 검토합니다.
- controlled input은 `value`와 `onChange`가 항상 한 쌍으로 움직여야 합니다.
- 입력 state가 커질수록 필드별 컴포넌트 분리나 reducer로 변경 경계를 정리합니다.

## 코드 리뷰 체크리스트

- `value`가 `undefined`와 문자열 사이를 오가며 controlled/uncontrolled 경고를 만들지 않는가?
- 타이핑마다 폼 전체가 불필요하게 비싼 계산을 다시 하지 않는가?
- 필드 값, 오류, touched/dirty 상태의 소유권이 한 흐름으로 설명되는가?
- 서버 오류가 들어왔을 때 해당 controlled field와 연결되는가?

## 흔한 실수

- 모든 입력을 한 부모 state에 넣어 타이핑마다 큰 화면을 리렌더합니다.
- `defaultValue`와 `value`를 섞어 초기값 이후 상태 동기화가 꼬입니다.
- 숫자 input 값을 바로 number로 변환해 빈 문자열을 표현하지 못합니다.
- field error를 value state와 다른 기준으로 관리해 오류가 늦게 사라집니다.

## 테스트와 검증 포인트

- 빠른 타이핑, IME 입력, 빈 문자열, 붙여넣기를 각각 확인합니다.
- 입력값에 따라 버튼 disabled, helper text, preview가 즉시 갱신되는지 봅니다.
- 서버 오류가 표시된 뒤 사용자가 값을 고치면 오류가 의도한 시점에 사라지는지 확인합니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 DOM 값과 React state가 서로 다른 출처가 되는 흐름을 봅니다.
- `Example.tsx`에서는 입력값이 React state 하나에서 오고, UI 조건도 같은 state를 기준으로 계산되는지 확인합니다.
- 실제 코드에서는 controlled가 필요한 필드와 제출 시점에만 읽어도 되는 필드를 섞어 쓸 수 있습니다.

## 관련 패턴

- [Uncontrolled Form](../uncontrolled-form/README.md)
- [Field Level Validation](../field-level-validation/README.md)

## 참고 자료

- [React DOM: input](https://react.dev/reference/react-dom/components/input)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React Hook Form: useFieldArray](https://react-hook-form.com/docs/usefieldarray)
