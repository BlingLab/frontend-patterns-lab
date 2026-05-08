# 다형성 컴포넌트

영문명: Polymorphic Component
폴더: `component-composition/polymorphic-component`

## 한 줄 요약

공통 스타일과 API는 유지하되, `as` 또는 `asChild` 같은 prop으로 실제 렌더링 element를 바꿀 수 있게 만드는 패턴입니다.

## 패턴 형태

- 분류: 컴포넌트 조합
- 형태: Element Polymorphism
- 핵심 질문: 같은 UI처럼 보이지만 실제 HTML 의미는 달라야 하는가

## 왜 필요한가

디자인 시스템의 `Button`은 저장, 삭제 같은 액션에도 쓰이고, 설정 페이지로 이동하는 링크에도 쓰입니다. 둘은 시각적으로 같을 수 있지만 HTML 의미는 다릅니다. 액션은 `button`, 페이지 이동은 `a` 또는 router link가 되어야 합니다.

같은 스타일 때문에 전부 `button`으로 만들면 링크 의미와 브라우저 기본 동작을 잃습니다. 반대로 `Button`, `LinkButton`, `RouterLinkButton`을 각각 만들면 스타일과 상태 처리가 중복됩니다.

Polymorphic component는 스타일과 공통 동작은 하나로 유지하면서 실제 element를 호출부가 선택하게 합니다. Radix의 `asChild`도 비슷한 문제를 해결합니다. primitive가 DOM element를 고정하지 않고 호출부의 element에 동작을 합성할 수 있게 합니다.

## 언제 사용하는가

- 버튼처럼 보이지만 실제로는 링크여야 하는 UI가 있을 때
- 디자인 시스템 컴포넌트가 여러 semantic element를 지원해야 할 때
- router link, anchor, button이 같은 variant와 size 스타일을 공유해야 할 때
- Headless/Slot 기반 primitive와 함께 호출부 element에 props를 합성해야 할 때
- 중복된 `ButtonLink`, `ExternalLinkButton`, `RouterButton` 컴포넌트가 늘어날 때

## 언제 피해야 하는가

- element 의미가 항상 하나로 고정되는 컴포넌트일 때
- `as` 타입을 맞추느라 팀 생산성이 크게 떨어질 때
- `button` 전용 props와 `a` 전용 props의 차이를 제대로 처리하지 못할 때
- 접근성 role을 임의로 바꿔 semantic을 흐릴 때
- 단순 className 재사용이면 CSS class나 작은 wrapper가 더 충분할 때

## 어떻게 사용하는가

1. 기본 element를 정합니다. 예: `button`
2. `as` prop으로 렌더링할 element type을 받습니다.
3. 공통 className과 사용자 className을 병합합니다.
4. element별로 의미가 다른 props를 문서화합니다. 예: `disabled` vs `aria-disabled`, `href`, `type`
5. 복잡도가 커지면 `asChild`/Slot 방식이나 별도 컴포넌트가 더 적절한지 검토합니다.

## 기본 코드 형태

```tsx
<PolymorphicButton>저장</PolymorphicButton>
<PolymorphicButton as="a" href="/settings">설정으로 이동</PolymorphicButton>
```

## 예제 읽는 법

- `Example.tsx`는 같은 `PolymorphicButton`을 `button`과 `a`로 렌더링합니다.
- `BadCase.tsx`는 시각적으로 같은 버튼 스타일을 `ActionButton`과 `LinkButton`에 중복 구현합니다.

## 실무 판단 기준

Polymorphic component는 "스타일은 하나인데 semantic element가 여러 개"일 때 쓸 가치가 있습니다. 단순히 다양한 모양을 만들기 위한 패턴이 아닙니다. 모양은 variant prop이 담당하고, polymorphism은 HTML 의미를 바꾸기 위한 장치입니다.

## 코드 리뷰 체크리스트

- `button`이어야 할 액션과 `a`이어야 할 이동을 의미에 맞게 구분하는가?
- 공통 className과 사용자 className이 안전하게 병합되는가?
- `disabled` 처리처럼 element별 의미 차이가 문서화되어 있는가?
- 타입이 너무 복잡해 사용자가 오류 메시지를 이해하기 어려운 상태는 아닌가?
- 단순 중복 제거 욕심 때문에 semantic을 흐리고 있지 않은가?

## 흔한 실수

- 모든 것을 `div`와 `role`로 해결하려고 합니다.
- `as="a"`인데 `href` 없이 버튼처럼 사용합니다.
- `disabled`를 anchor에 그대로 넘겨 실제 비활성화가 되지 않습니다.
- 타입 구현이 과해져 컴포넌트 사용보다 타입 디버깅이 어려워집니다.

## 관련 패턴

- [Slot Pattern](../slot-pattern/README.md): 특정 영역에 다른 element를 주입할 때
- [Headless Component](../headless-component/README.md): 동작은 제공하고 element는 호출부가 정할 때
- [Props Getter](../props-getter/README.md): element에 필요한 props를 합성할 때

## 참고 자료

- [Radix UI: Slot](https://www.radix-ui.com/primitives/docs/utilities/slot)
- [Radix UI: Composition](https://www.radix-ui.com/primitives/docs/guides/composition)
