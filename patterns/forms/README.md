# 폼과 검증

영문명: Forms

React 폼의 controlled/uncontrolled 입력, 검증, 서버 오류, dirty 상태, 제출 흐름을 다룹니다.

## 이 카테고리의 질문

입력, 검증, 제출을 어떻게 다룰 것인가

## 언제 이 카테고리로 들어오는가

- React 입력값, 검증, 제출 상태가 복잡하다
- field error와 server error를 어디서 다룰지 애매하다
- 동적 필드나 단계형 폼이 필요하다

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

## 읽는 순서

1. 위 표에서 현재 문제와 가장 가까운 항목을 고릅니다.
2. 개별 README의 "언제 사용하는가"와 "언제 피해야 하는가"를 먼저 봅니다.
3. React 예제 파일에서 좋은 예와 나쁜 예를 비교합니다.
4. 관련 패턴으로 이동해 대안이나 보완 패턴을 확인합니다.
