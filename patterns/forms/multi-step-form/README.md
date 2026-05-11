# 단계형 폼

영문명: Multi Step Form
폴더: `forms/multi-step-form`

## 한 줄 요약

긴 폼을 단계별 상태와 검증으로 나눕니다.

## 패턴 형태

- 분류: 폼과 검증
- 형태: Form State / Validation / Submission Flow
- 핵심 질문: 입력 값, 검증, 제출 상태를 어느 경계에서 관리할 것인가

## 왜 필요한가

회원가입처럼 입력 항목이 많은 폼을 한 페이지에 모으면 사용자가 부담을 느낍니다. 단계로 나누면 각 단계를 검증하고 넘어가므로 오류를 일찍 발견하고 완료율이 높아집니다.

폼은 단순한 입력 모음이 아니라 값 소유권, 검증 시점, 서버 오류 매핑, 제출 중복 방지가 함께 움직이는 워크플로입니다. React input 문서는 controlled 입력과 uncontrolled 입력의 차이를 분명히 나누고, 복잡한 폼에서는 필드 단위와 폼 단위 책임을 분리하는 것이 중요합니다.

## 핵심 원리

- 현재 step 인덱스로 어떤 화면을 보여줄지 결정한다
- 각 step에서 해당 필드만 검증한다
- 전체 데이터는 상위에서 관리하고 단계별로 나눠 보여준다

## 언제 사용하는가

- 가입, 결제, 온보딩처럼 정보량이 큰 폼
- 단계별 저장이나 검증이 필요한 경우
- 뒤로가기와 진행률이 UX에 중요한 경우

## 언제 피해야 하는가

- 필드가 적어 한 화면이 더 빠른 경우
- 단계 간 의존성이 너무 강해 분리가 오히려 혼란스러운 경우

## 어떻게 사용하는가

1. 전체 form state는 유지한다
2. 현재 step의 필드만 검증한다
3. step 이동 조건과 저장 전략을 문서화한다

## 기본 코드 형태

```tsx
const [step, setStep] = useState<Step>('account');
const errors = validateStep(step, values);

<Button disabled={hasErrors(errors)} onClick={goNext}>Next</Button>
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

## 예제 읽는 법

- `BadCase.tsx`에서 책임이 어디에 섞여 있는지 먼저 봅니다.
- `Example.tsx`에서 호출부 API, 상태 소유권, 변경 범위가 어떻게 줄었는지 비교합니다.
- 문서의 체크리스트를 기준으로 같은 패턴을 실제 코드 리뷰에 적용할 수 있는지 확인합니다.

## 관련 패턴

- [State Machine](../../state-management/state-machine/README.md)
- [Form Level Validation](../form-level-validation/README.md)

## 참고 자료

- [React DOM: input](https://react.dev/reference/react-dom/components/input)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React Hook Form: useFieldArray](https://react-hook-form.com/docs/usefieldarray)
