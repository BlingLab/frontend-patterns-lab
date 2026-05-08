# 에러 상태

영문명: Error State
폴더: `ui-state/error-state`

## 한 줄 요약

복구 가능한 오류를 명확한 메시지와 액션으로 보여줍니다.

## 패턴 형태

- 분류: UI State
- 형태: Recoverable Error UI
- 목적: 로딩, 빈 상태, 에러, pending을 어떻게 표현할 것인가

## 왜 필요한가

오류를 콘솔이나 toast에만 두면 사용자는 화면을 어떻게 회복해야 할지 알 수 없습니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

## 언제 사용하는가

- 재시도 가능한 네트워크 오류
- 부분 위젯 실패
- 권한이나 입력 문제처럼 사용자가 조치할 수 있는 오류

## 언제 피해야 하는가

- 개발자만 알아야 하는 stack trace 노출
- 보안상 원인을 자세히 말하면 안 되는 오류

## 어떻게 사용하는가

1. 사용자 언어로 원인을 요약한다
2. 재시도/이전/문의 같은 액션을 제공한다
3. 로그용 세부정보는 별도 채널로 보낸다

## 실무 예시

`Error State`의 핵심은 복구 가능한 오류를 명확한 메시지와 액션으로 보여줍니다. 사용자가 현재 화면 상태를 오해하지 않도록 로딩, 실패, 빈 결과, 처리 중 상태를 분리할 때 사용합니다.

## 기본 코드 형태

```tsx
if (state.status === 'loading') return <LoadingState />;
if (state.status === 'error') return <ErrorState onRetry={retry} />;
if (state.status === 'success' && state.data.length === 0) return <EmptyState />;
return <Content data={state.data} />;
```

## 구분 기준

이 패턴은 "지금 화면이 어떤 상태이고 사용자가 무엇을 할 수 있는가"를 표현하는 문제입니다. 데이터 구조보다 피드백과 다음 행동이 핵심이면 `Error State` 패턴을 봅니다.

형태상으로는 `Recoverable Error UI`에 속하므로, 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- 사용자가 현재 상태를 한눈에 이해할 수 있는가?
- 복구 가능한 상태에는 다음 행동이 제공되는가?
- loading, empty, error가 서로 잘못 대체되지 않는가?

## 흔한 실수

- 빈 결과를 오류처럼 보여주거나 오류를 빈 상태처럼 숨깁니다.
- pending 상태 없이 버튼만 disabled 처리합니다.
- 사용자가 할 수 있는 다음 행동을 제공하지 않습니다.

## 적용 흐름

1. 사용자 언어로 원인을 요약한다
2. 재시도/이전/문의 같은 액션을 제공한다
3. 로그용 세부정보는 별도 채널로 보낸다

## 적용하지 않을 신호

- 개발자만 알아야 하는 stack trace 노출
- 보안상 원인을 자세히 말하면 안 되는 오류

## 예제 읽는 법

`Example.tsx`와 `BadCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Error Boundary](../../async-api/error-boundary/README.md)
- [Toast vs Inline Error](../toast-vs-inline-error/README.md)

## 참고 자료

- [React: Conditional rendering](https://react.dev/learn/conditional-rendering)
- [WAI-ARIA APG: Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
