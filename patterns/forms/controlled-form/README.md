# 제어 폼

영문명: Controlled Form
폴더: `forms/controlled-form`

## 한 줄 요약

입력 값을 React state로 관리해 화면과 데이터 흐름을 완전히 제어합니다.

## 패턴 형태

- 분류: 폼과 검증
- 형태: Controlled Form
- 목적: 입력, 검증, 제출을 어떻게 다룰 것인가

## 왜 필요한가

입력값이 다른 UI, 검증, 제출 버튼 상태와 즉시 연결돼야 할 때 DOM에만 값을 두면 제어가 어렵습니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

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

## 실무 예시

`Controlled Form`의 핵심은 입력 값을 React state로 관리해 화면과 데이터 흐름을 완전히 제어하는 방식입니다. 입력값, 검증, 서버 오류, 제출 잠금이 함께 필요한 업무 폼에서 구조를 잡을 때 사용합니다.

## 기본 코드 형태

```tsx
const [email, setEmail] = useState('');

<input value={email} onChange={(event) => setEmail(event.target.value)} />
```

## 구분 기준

이 패턴은 "사용자 입력의 소유권과 검증 책임을 어디에 둘 것인가"에 대한 답입니다. 값 변경, 오류 표시, 제출 흐름이 함께 움직이면 `Controlled Form` 패턴이 후보입니다.

패턴 유형으로는 `Controlled Form`에 가깝습니다. 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- 필드 오류와 폼 전체 오류가 구분되는가?
- 검증 시점과 제출 잠금 정책이 명확한가?
- 서버 오류가 UI 필드명으로 안전하게 매핑되는가?

## 흔한 실수

- 모든 검증을 submit 시점으로 미뤄 사용자가 늦게 오류를 봅니다.
- 서버 오류를 toast 하나로 처리해 필드 복구 위치를 잃습니다.
- 동적 필드에 index key를 사용해 입력 상태가 섞입니다.

## 적용 흐름

1. 각 input에 value와 onChange를 연결한다
2. state shape를 제출 payload와 가깝게 둔다
3. 파생 검증값은 중복 저장하지 않는다

## 적용하지 않을 신호

- 필드가 매우 많고 매 키 입력 렌더가 부담될 때
- 제출 시점에만 값이 필요할 때

## 예제 읽는 법

`Example.tsx`와 `BadCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Uncontrolled Form](../uncontrolled-form/README.md)
- [Field Level Validation](../field-level-validation/README.md)

## 참고 자료

- [React: <input>](https://react.dev/reference/react-dom/components/input)
