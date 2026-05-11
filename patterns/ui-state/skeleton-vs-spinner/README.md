# 스켈레톤 vs 스피너

영문명: Skeleton vs Spinner
폴더: `ui-state/skeleton-vs-spinner`

## 한 줄 요약

대기 시간과 레이아웃 예측 가능성에 따라 skeleton과 spinner를 선택합니다.

## 패턴 형태

- 분류: UI 상태 표현
- 형태: Feedback State / Recovery Path
- 핵심 질문: 현재 상태와 다음 행동을 사용자가 바로 이해할 수 있는가

## 왜 필요한가

skeleton은 "여기에 무언가 올 것이다"라는 예측을 줘 체감 대기 시간을 줄이고 레이아웃 시프트를 방지합니다. 반면 전체 페이지 전환처럼 최종 레이아웃을 예측할 수 없으면 spinner가 맞습니다.

UI 상태 문서는 데이터 구조보다 사용자 피드백을 중심으로 봐야 합니다. 같은 실패라도 사용자가 고칠 수 있는 필드 오류, 일시적 시스템 오류, 복구 불가능한 오류는 표시 위치와 다음 행동이 다릅니다. 접근성 관점에서는 disabled, modal, error message가 focus와 보조 기술에 어떻게 전달되는지도 함께 봅니다.

## 핵심 원리

- skeleton: 내용 레이아웃이 예측 가능한 카드, 목록에 사용한다
- spinner: 전체 페이지 로딩, 레이아웃 불확실 시 사용한다
- skeleton이 있으면 사용자가 레이아웃 시프트를 덜 경험한다

## 언제 사용하는가

- 레이아웃이 예측 가능하고 콘텐츠만 늦게 올 때 skeleton
- 짧거나 크기를 알 수 없는 작업에는 spinner
- 버튼 내부 작업에는 작은 pending indicator

## 언제 피해야 하는가

- 가짜 skeleton이 실제 레이아웃과 달라 layout shift를 만들 때
- 너무 짧은 요청에 큰 skeleton이 깜빡일 때

## 어떻게 사용하는가

1. 콘텐츠 영역 크기를 고정한다
2. 예상 구조가 있으면 skeleton을 쓴다
3. 액션 단위 작업은 버튼 pending으로 표현한다

## 기본 코드 형태

```tsx
return isInitialPageLoad ? (
  <Spinner label="페이지를 불러오는 중" />
) : (
  <ArticleSkeleton />
);
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

- [Pending State](../pending-state/README.md)
- [Loading / Empty / Error](../loading-empty-error/README.md)

## 참고 자료

- [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [WAI-ARIA APG: Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [MDN: aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled)
