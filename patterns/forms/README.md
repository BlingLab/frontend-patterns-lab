# 폼과 검증

영문명: Forms

폼은 입력값, 검증, 서버 오류, dirty 상태, 제출 잠금이 함께 움직이는 워크플로입니다. controlled/uncontrolled 선택보다 값이 언제 필요하고 어느 경계에서 검증해야 하는지가 더 중요합니다.

## 이 카테고리의 질문

입력, 검증, 제출을 어떻게 다룰 것인가

## 언제 이 카테고리로 들어오는가

- 입력값이 여러 UI 조건과 연결되어 폼 컴포넌트가 커질 때
- 필드 단위 오류와 폼 전체 오류가 섞일 때
- 서버 validation 오류를 어디에 보여줄지 애매할 때
- 동적 필드나 단계형 폼에서 값과 오류가 꼬일 때

## 먼저 판단할 순서

1. 입력 중 값이 필요한지, 제출 시점에만 필요한지로 controlled/uncontrolled를 고릅니다.
2. 필드 하나로 판단 가능한 규칙은 field-level validation에 둡니다.
3. 여러 필드를 함께 봐야 하는 규칙은 form-level validation에 둡니다.
4. 서버 오류는 field error와 form error로 매핑합니다.
5. dirty, submit lock, dependent/dynamic/multi-step 흐름은 별도 상태 모델로 분리합니다.

## 빠른 선택 가이드

| 찾고 있는 문제 | 먼저 볼 패턴 | 영문명 |
| --- | --- | --- |
| 입력 값을 React state로 직접 제어합니다. | [제어 폼](./controlled-form/README.md) | Controlled Form |
| DOM이 입력 값을 보관하고 제출 시점에 값을 읽습니다. | [비제어 폼](./uncontrolled-form/README.md) | Uncontrolled Form |
| 각 필드의 규칙과 오류 메시지를 필드 가까이에 둡니다. | [필드 단위 검증](./field-level-validation/README.md) | Field Level Validation |
| 여러 필드의 조합을 폼 단위에서 검증합니다. | [폼 단위 검증](./form-level-validation/README.md) | Form Level Validation |
| 서버 오류를 필드 오류와 폼 전체 오류로 변환합니다. | [서버 오류 매핑](./server-error-mapping/README.md) | Server Error Mapping |
| 초기값과 현재값을 비교해 변경 여부를 추적합니다. | [변경 여부 상태](./dirty-state/README.md) | Dirty State |
| 제출 중 같은 액션이 다시 실행되지 않도록 잠급니다. | [제출 잠금](./submit-lock/README.md) | Submit Lock |
| 한 필드의 값이 다른 필드의 선택지나 유효성을 결정합니다. | [의존 필드](./dependent-fields/README.md) | Dependent Fields |
| 반복 가능한 필드 배열을 안정적인 id와 함께 추가/삭제합니다. | [동적 필드](./dynamic-fields/README.md) | Dynamic Fields |
| 긴 폼을 단계별 상태와 검증으로 나눕니다. | [단계형 폼](./multi-step-form/README.md) | Multi Step Form |

## 선택 신호

| 코드에서 보이는 신호 | 우선 검토할 패턴 |
| --- | --- |
| 입력 즉시 UI가 바뀜 | 제어 폼 |
| 제출 시점 값만 필요 | 비제어 폼 |
| 단일 필드 규칙 | 필드 단위 검증 |
| 교차 필드 규칙 | 폼 단위 검증 |
| 서버 validation 응답 처리 | 서버 오류 매핑 |
| 반복 가능한 필드 배열 | 동적 필드 |

## 패턴별 핵심 메모

- [제어 폼](./controlled-form/README.md) (Controlled Form): 입력 값이 state에 있으면 실시간 유효성 검사, 조건부 필드 표시, 입력 포맷팅을 자연스럽게 할 수 있습니다. 단 필드가 많아질수록 렌더가 잦아지므로 React Hook Form 같은 라이브러리를 검토해야 합니다. 핵심: value + onChange로 입력을 완전히 제어한다.
- [비제어 폼](./uncontrolled-form/README.md) (Uncontrolled Form): 단순한 로그인 폼처럼 제출 시점에만 값이 필요하고 중간에 값을 읽을 필요가 없다면, 불필요한 리렌더를 피하기 위해 uncontrolled form이 더 적합합니다. 핵심: ref.current.value로 제출 시점에만 값을 읽는다.
- [필드 단위 검증](./field-level-validation/README.md) (Field Level Validation): 검증 규칙이 폼 submit 핸들러에만 있으면 어떤 필드가 어떤 규칙을 갖는지 찾기 어렵습니다. 필드 레벨로 분리하면 규칙과 UI가 함께 있어 유지보수가 쉽습니다. 핵심: 각 필드가 자신의 validate 함수를 갖는다.
- [폼 단위 검증](./form-level-validation/README.md) (Form Level Validation): "비밀번호 확인"처럼 두 필드를 비교하는 규칙은 필드 레벨에서 처리하기 어렵습니다. Zod schema나 폼 레벨 validate 함수에서 전체 값을 받아 교차 검증합니다. 핵심: 교차 필드 규칙(비밀번호 일치, 날짜 범위)을 처리한다.
- [서버 오류 매핑](./server-error-mapping/README.md) (Server Error Mapping): 이메일 중복처럼 클라이언트에서 미리 알 수 없는 오류는 서버가 응답해야 합니다. 이 응답을 폼 필드 옆에 정확히 표시하지 않으면 사용자가 무엇이 잘못됐는지 모릅니다. 핵심: 서버 응답의 field 이름으로 각 필드 에러를 setError 한다.
- [변경 여부 상태](./dirty-state/README.md) (Dirty State): "저장되지 않은 변경사항이 있습니다" 경고나 저장 버튼 활성화를 위해 폼이 변경됐는지 알아야 합니다. 초기값과 현재값을 비교하면 됩니다. 핵심: 초기값(defaultValues)을 별도로 보관한다.
- [제출 잠금](./submit-lock/README.md) (Submit Lock): 결제 버튼을 빠르게 두 번 누르면 중복 결제가 발생할 수 있습니다. isSubmitting 상태로 버튼을 disabled 처리하면 처음 제출이 완료되기 전까지 다시 제출할 수 없습니다. 핵심: 제출 시작 시 isSubmitting=true, 완료/실패 시 false로 되돌린다.
- [의존 필드](./dependent-fields/README.md) (Dependent Fields): "국가"를 선택하면 "도시" 목록이 바뀌는 종속 관계를 구현할 때, 두 필드가 독립적이면 국가 변경 시 도시 선택이 유효하지 않은 값을 유지할 수 있습니다. 의존 관계를 명시적으로 처리해야 합니다. 핵심: 부모 필드 값이 바뀌면 자식 필드를 리셋한다.
- [동적 필드](./dynamic-fields/README.md) (Dynamic Fields): 팀원 이메일을 여러 개 입력하는 폼에서 index를 key로 쓰면, 중간 항목을 삭제할 때 입력값이 꼬입니다. 각 항목에 고유 id를 부여하면 추가/삭제 시 상태가 안정됩니다. 핵심: 항목마다 고유 id를 생성해 key로 쓴다.
- [단계형 폼](./multi-step-form/README.md) (Multi Step Form): 회원가입처럼 입력 항목이 많은 폼을 한 페이지에 모으면 사용자가 부담을 느낍니다. 단계로 나누면 각 단계를 검증하고 넘어가므로 오류를 일찍 발견하고 완료율이 높아집니다. 핵심: 현재 step 인덱스로 어떤 화면을 보여줄지 결정한다.

## 코드 리뷰 질문

- 값 소유자가 React state, DOM, 폼 라이브러리 중 어디인지 명확한가?
- 검증 시점이 사용자 경험에 맞는가?
- 서버 오류가 사용자가 고칠 필드 가까이에 표시되는가?
- 동적 필드가 index가 아니라 안정 id로 관리되는가?

## 같이 볼 카테고리

- [상태 관리](../state-management/README.md): form state와 derived/dirty state를 나눌 때
- [비동기와 API 상태](../async-api/README.md): submit mutation과 서버 응답을 다룰 때
- [UI 상태 표현](../ui-state/README.md): error, pending, disabled 표시를 설계할 때

## 읽는 순서

1. 빠른 선택 가이드에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. React 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 코드 리뷰 질문으로 실제 코드에 적용할 수 있는지 확인합니다.
5. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.

## 참고 자료

- [React DOM: input](https://react.dev/reference/react-dom/components/input)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React Hook Form: useFieldArray](https://react-hook-form.com/docs/usefieldarray)
