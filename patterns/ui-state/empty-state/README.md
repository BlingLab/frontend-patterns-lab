# 빈 상태

영문명: Empty State
폴더: `ui-state/empty-state`

## 한 줄 요약

빈 결과를 막다른 화면이 아니라 다음 행동으로 연결합니다.

## 패턴 형태

- 분류: UI 상태 표현
- 형태: Feedback State / Recovery Path
- 핵심 질문: 현재 상태와 다음 행동을 사용자가 바로 이해할 수 있는가

## 왜 필요한가

"결과가 없습니다" 텍스트만 있으면 사용자는 다음에 무엇을 해야 할지 모릅니다. 일러스트, 설명, 액션 버튼을 함께 제공하면 빈 상태가 전환점이 됩니다.

UI 상태 문서는 데이터 구조보다 사용자 피드백을 중심으로 봐야 합니다. 같은 실패라도 사용자가 고칠 수 있는 필드 오류, 일시적 시스템 오류, 복구 불가능한 오류는 표시 위치와 다음 행동이 다릅니다. 접근성 관점에서는 disabled, modal, error message가 focus와 보조 기술에 어떻게 전달되는지도 함께 봅니다.

## 핵심 원리

- 검색 결과 없음: 다른 검색어 시도, 필터 초기화 CTA를 제공한다
- 데이터 없음: 첫 항목 생성 CTA를 제공한다
- 이미지 + 제목 + 설명 + 버튼 구조가 효과적이다

## 언제 사용하는가

- 첫 사용 상태
- 검색 결과 없음
- 필터 조건 때문에 목록이 비었을 때

## 언제 피해야 하는가

- 로딩 중인 상태를 empty로 오해하게 만드는 경우
- 권한 오류를 empty로 숨기는 경우

## 어떻게 사용하는가

1. 원인을 구분한다
2. 생성, 필터 초기화, 도움말 같은 다음 행동을 제공한다
3. 공간을 과하게 쓰지 않는다

## 기본 코드 형태

```tsx
if (projects.length === 0) {
  return <EmptyState title="프로젝트가 없습니다" action={<CreateProjectButton />} />;
}

return <ProjectList projects={projects} />;
```

## 실무 판단 기준

- loading, empty, error, success를 한 목록 화면에서 모두 분기합니다.
- 사용자가 수정할 위치가 명확하면 inline 메시지를 쓰고, 전역 알림은 toast를 씁니다.
- 파괴적 행동은 confirm dialog로 한 번 더 확인하되 취소와 focus 흐름을 명확히 합니다.
- disabled 상태는 이유와 해결 방법을 가까운 위치에 설명합니다.

## 코드 리뷰 체크리스트

- 현재 상태를 한눈에 이해할 수 있는 시각적 신호가 있는가?
- 복구 가능한 상태에 retry, reset, create, edit 같은 다음 행동이 있는가?
- 비활성 컨트롤의 이유가 tooltip, helper text, aria 속성으로 전달되는가?
- modal/dialog는 focus 이동과 닫기 동작이 예측 가능한가?

## 흔한 실수

- 빈 결과를 에러처럼 보여주거나 에러를 빈 상태처럼 숨깁니다.
- 버튼을 disabled만 하고 처리 중인지, 권한이 없는지, 입력이 부족한지 설명하지 않습니다.
- toast로 폼 필드 오류를 보내 사용자가 화면에서 고칠 위치를 찾지 못합니다.

## 테스트와 검증 포인트

- 느린 응답, 빈 데이터, 서버 오류, 권한 없음, 입력 부족 상태를 각각 강제로 만들어 확인합니다.
- 키보드만으로 confirm dialog를 열고 닫고 취소할 수 있는지 확인합니다.
- 스크린 리더가 상태 메시지와 비활성 사유를 읽을 수 있는지 aria-describedby 같은 연결을 점검합니다.

## 예제 읽는 법

- `BadCase.tsx`에서 책임이 어디에 섞여 있는지 먼저 봅니다.
- `Example.tsx`에서 호출부 API, 상태 소유권, 변경 범위가 어떻게 줄었는지 비교합니다.
- 문서의 체크리스트를 기준으로 같은 패턴을 실제 코드 리뷰에 적용할 수 있는지 확인합니다.

## 관련 패턴

- [Loading / Empty / Error](../loading-empty-error/README.md)
- [Error State](../error-state/README.md)

## 참고 자료

- [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [WAI-ARIA APG: Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [MDN: aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled)
