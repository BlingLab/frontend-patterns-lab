# 에러 경계

영문명: Error Boundary
폴더: `async-api/error-boundary`

## 한 줄 요약

렌더링 중 발생한 오류를 경계에서 잡아 대체 UI를 보여줍니다.

## 패턴 형태

- 분류: 비동기와 API 상태
- 형태: Render Error Boundary
- 목적: 서버 상태와 API 흐름을 어떻게 다룰 것인가

## 왜 필요한가

한 컴포넌트의 렌더 오류가 전체 앱을 흰 화면으로 만들 수 있습니다.

이 문서는 패턴 이름을 외우기 위한 것이 아니라, 리뷰 중 "이 책임은 어디에 있어야 하는가"를 판단하기 위한 기준입니다.

## 언제 사용하는가

- 위젯 단위로 실패를 격리하고 싶을 때
- 대시보드처럼 독립 영역이 많은 화면
- 복구 버튼이나 로그 전송이 필요한 경우

## 언제 피해야 하는가

- 이벤트 핸들러나 async 오류만 처리하려는 경우
- 오류를 숨기면 안 되는 핵심 플로우

## 어떻게 사용하는가

1. 경계 컴포넌트로 위험 영역을 감싼다
2. fallback UI와 retry 정책을 정한다
3. 로그/모니터링 연계를 추가한다

## 실무 예시

`Error Boundary`의 핵심은 렌더링 중 발생한 오류를 경계에서 잡아 대체 UI를 보여줍니다. 서버 데이터 조회와 변경이 있는 화면에서 loading, error, cache, invalidation 기준을 한 곳에 모을 때 사용합니다.

## 기본 코드 형태

```tsx
<ErrorBoundary fallback={<ErrorState onRetry={reload} />}>
  <DashboardWidget />
</ErrorBoundary>
```

## 구분 기준

이 패턴은 "원격 데이터의 생명주기를 어디서 관리할 것인가"에 대한 답입니다. fetch 자체보다 캐시, 상태 모델, 실패 복구 기준이 중요하면 `Error Boundary` 패턴을 검토합니다.

형태상으로는 `Render Error Boundary`에 속하므로, 같은 카테고리의 다른 패턴과 비교할 때 "API 모양", "상태 소유권", "변경 영향 범위"를 기준으로 구분합니다.

## 코드 리뷰 체크리스트

- query key 또는 요청 식별자가 안정적인가?
- loading, empty, error, success 상태가 분리되어 있는가?
- 쓰기 요청 이후 cache update 또는 invalidation 정책이 명확한가?

## 흔한 실수

- 컴포넌트가 API 응답 구조와 cache 정책을 직접 압니다.
- mutation 성공 후 어떤 query가 stale해지는지 정하지 않습니다.
- 요청 상태를 여러 boolean으로 중복 관리합니다.

## 적용 흐름

1. 경계 컴포넌트로 위험 영역을 감싼다
2. fallback UI와 retry 정책을 정한다
3. 로그/모니터링 연계를 추가한다

## 적용하지 않을 신호

- 이벤트 핸들러나 async 오류만 처리하려는 경우
- 오류를 숨기면 안 되는 핵심 플로우

## 예제 읽는 법

`Example.tsx`와 `BadCase.tsx`를 함께 봅니다. 좋은 예는 책임 경계와 호출부 API가 어떻게 정리되는지, 나쁜 예는 변경 이유가 어디서 섞이는지 확인하는 용도입니다.

## 실무 판단 기준

이 패턴을 적용했을 때 호출부가 더 읽기 쉬워지고, 변경 이유가 더 좁은 파일에 머물고, 테스트할 단위가 분명해지면 적용할 가치가 있습니다. 반대로 파일 수만 늘고 의사결정이 더 어려워지면 아직 적용 시점이 아닙니다.

## 관련 패턴

- [Error State](../../ui-state/error-state/README.md)
- [Suspense Boundary](../suspense-boundary/README.md)

## 참고 자료

- [TanStack Query: Overview](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React: Conditional rendering](https://react.dev/learn/conditional-rendering)
