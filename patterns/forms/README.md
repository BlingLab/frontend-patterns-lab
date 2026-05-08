# Forms

폼 값의 소유권, 검증 위치, 서버 오류, 제출 흐름을 설계하는 패턴입니다.

## 이 카테고리의 질문

입력, 검증, 제출을 어떻게 다룰 것인가

## 언제 이 카테고리로 들어오는가

- 입력값과 검증 규칙이 늘어난다
- 서버 오류를 사용자에게 정확히 보여줘야 한다
- 중복 제출과 단계 이동을 제어해야 한다

## 빠른 선택 가이드

| 찾고 있는 문제 | 먼저 볼 패턴 | 패턴 형태 |
| --- | --- | --- |
| 입력 값을 React state로 관리해 화면과 데이터 흐름을 완전히 제어합니다. | [Controlled Form](./controlled-form/README.md) | Controlled Form |
| DOM이 입력 값을 보관하고 제출 시점에 값을 읽습니다. | [Uncontrolled Form](./uncontrolled-form/README.md) | Uncontrolled Form |
| 각 필드의 규칙과 오류 메시지를 필드 가까이에 둡니다. | [Field Level Validation](./field-level-validation/README.md) | Validation Boundary |
| 여러 필드의 조합을 폼 단위에서 검증합니다. | [Form Level Validation](./form-level-validation/README.md) | Cross-field Validation |
| 서버 오류를 필드 오류와 폼 전체 오류로 변환합니다. | [Server Error Mapping](./server-error-mapping/README.md) | Error Mapping |
| 초기값과 현재값을 비교해 변경 여부를 추적합니다. | [Dirty State](./dirty-state/README.md) | Form State |
| 제출 중 같은 액션이 다시 실행되지 않도록 잠급니다. | [Submit Lock](./submit-lock/README.md) | Submit Guard |
| 한 필드의 값이 다른 필드의 선택지나 유효성을 결정합니다. | [Dependent Fields](./dependent-fields/README.md) | Dependent Form State |
| 반복 가능한 필드 배열을 안정적인 id와 함께 추가/삭제합니다. | [Dynamic Fields](./dynamic-fields/README.md) | Field Array |
| 긴 폼을 단계별 상태와 검증으로 나눕니다. | [Multi Step Form](./multi-step-form/README.md) | Wizard Flow |

## 읽는 순서

1. 위 표에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.

## 참고 자료

- [React: <input>](https://react.dev/reference/react-dom/components/input)
