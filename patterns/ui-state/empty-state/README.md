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

- 빈 상태가 “아직 만든 것이 없음”인지, “필터 결과가 없음”인지, “권한 때문에 볼 수 없음”인지 먼저 구분합니다.
- 처음 사용하는 빈 상태에는 생성, 초대, 가져오기처럼 다음 행동을 둡니다.
- 필터 결과 없음은 전체 데이터 없음과 다르게 reset filter, 검색어 지우기 같은 복구 액션을 둡니다.
- 사용자가 당장 할 수 있는 행동이 없다면 이유와 다음 확인 경로를 짧게 알려줍니다.

## 코드 리뷰 체크리스트

- loading이 끝나기 전에 빈 상태가 먼저 보이지 않는가?
- 빈 상태 문구가 현재 화면의 데이터 종류를 구체적으로 말하는가?
- primary action이 빈 상태를 벗어나는 실제 행동으로 연결되는가?
- 검색/필터 빈 상태와 최초 빈 상태가 같은 문구와 액션을 공유하지 않는가?

## 흔한 실수

- 서버 오류를 빈 배열로 fallback해 “항목 없음”으로 숨깁니다.
- “데이터가 없습니다”만 보여주고 무엇을 만들거나 바꿔야 하는지 알려주지 않습니다.
- 필터 결과가 없을 때 새 항목 생성 버튼만 보여줘 사용자가 검색 조건 문제를 놓칩니다.
- 빈 상태가 카드/배너처럼 과하게 커져 목록 레이아웃의 맥락을 잃습니다.

## 테스트와 검증 포인트

- 최초 데이터 없음, 필터 결과 없음, 권한 없음, 로딩 직후 empty 전환을 각각 확인합니다.
- reset filter나 create 버튼이 실제로 다음 상태로 전환되는지 확인합니다.
- 빈 상태가 목록 제목, 필터 바, 페이지 액션과 시각적으로 연결되어 있는지 봅니다.

## 예제 읽는 법

- `BadCase.tsx`에서는 빈 결과를 막다른 문구로만 처리하는 지점을 봅니다.
- `Example.tsx`에서는 빈 이유와 다음 행동이 함께 제시되는지 확인합니다.
- 실제 화면에서는 검색 결과 없음과 최초 빈 상태를 별도 시나리오로 나눠 리뷰합니다.

## 관련 패턴

- [Loading / Empty / Error](../loading-empty-error/README.md)
- [Error State](../error-state/README.md)

## 참고 자료

- [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [WAI-ARIA APG: Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [MDN: aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled)
