# Slot Pattern

## 한 줄 요약

컴포넌트의 여러 영역을 `header`, `actions`, `footer`처럼 이름 있는 ReactNode prop으로 열어두는 조합 패턴입니다.

## 패턴 형태

- 분류: 컴포넌트 조합
- 형태: Named Composition
- 핵심 질문: `children` 하나로는 부족하고, 영역의 의미를 이름으로 드러내야 하는가

## 왜 필요한가

`children` composition은 하나의 빈 영역을 열어두는 데 강합니다. 하지만 실제 화면에는 여러 교체 영역이 자주 등장합니다. 페이지 헤더에는 제목, 설명, 우측 액션이 있고, 카드에는 본문과 footer가 있으며, 리스트 섹션에는 필터, 정렬, 빈 상태 액션이 붙습니다.

이때 모든 것을 `children` 하나에 넣으면 호출부가 자유롭긴 하지만 구조의 의미가 흐려집니다. 반대로 `showExportButton`, `onCreate`, `showFilter`, `countLabel`, `footerText`처럼 세부 props를 계속 추가하면 컴포넌트가 호출부의 모든 요구를 옵션으로 떠안게 됩니다.

Slot pattern은 중간 지점입니다. 레이아웃 컴포넌트는 "이 위치에는 actions가 들어간다", "이 위치에는 description이 들어간다"처럼 영역의 의미와 배치를 책임집니다. 호출부는 각 영역에 들어갈 JSX를 직접 제공합니다.

## 언제 사용하는가

- 화면 구조 안에 교체 가능한 영역이 둘 이상일 때
- `children` 하나만으로는 header, actions, footer의 의미가 모호할 때
- 기본 레이아웃과 간격은 유지하면서 특정 영역의 UI만 바꾸고 싶을 때
- 버튼, 필터, 보조 설명, 상태 배지를 호출부가 직접 조합해야 할 때
- prop 옵션이 계속 늘어나서 컴포넌트가 `showX`, `onY`, `labelZ` 조합으로 커질 때

## 언제 피해야 하는가

- 교체 영역이 하나뿐이라 `children`이 더 단순할 때
- slot이 6개, 7개 이상으로 늘어 컴포넌트가 페이지 빌더처럼 변할 때
- slot 내부가 부모 상태와 강하게 결합되어 독립 JSX로 보기 어려울 때
- slot마다 복잡한 상호작용 상태를 공유해야 해서 compound component가 더 적절할 때
- 이름 있는 slot보다 데이터 배열과 renderer가 더 자연스러운 목록 UI일 때

## 어떻게 사용하는가

1. 레이아웃 안에서 의미 있는 교체 영역을 식별합니다.
2. 각 영역을 `ReactNode` prop으로 정의합니다.
3. 필수 slot과 선택 slot을 구분합니다.
4. 선택 slot이 없을 때의 간격, fallback, 렌더링 여부를 정합니다.
5. slot prop이 많아지면 컴포넌트 책임이 너무 넓어진 것은 아닌지 다시 나눕니다.

## 기본 코드 형태

```tsx
type PageHeaderProps = {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
};

function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        {description ? <div>{description}</div> : null}
      </div>
      {actions ? <div className="actions">{actions}</div> : null}
    </header>
  );
}

<PageHeader
  title="멤버"
  description={<MemberCount count={members.length} />}
  actions={<Button>초대</Button>}
/>
```

`PageHeader`는 멤버 수를 어떻게 계산하는지, 초대 버튼이 어떤 mutation을 호출하는지 모릅니다. 대신 description과 actions의 위치, 간격, 반응형 배치만 책임집니다.

## 예제 읽는 법

- `Example.tsx`는 `PageHeader`가 `description`과 `actions` slot을 열어두고 호출부가 각각 카운터와 버튼 묶음을 주입합니다.
- `BadCase.tsx`는 header가 `showInvite`, `showExport`, `memberCount` 같은 세부 옵션을 직접 받아 내부 분기로 UI를 만듭니다.

## 나쁜 예가 나빠지는 과정

옵션 props 방식은 처음에는 간단합니다.

```tsx
<PageHeader title="멤버" showInvite showExport memberCount={24} />
```

하지만 액션이 늘어나면 header는 점점 더 많은 도메인 정책을 알게 됩니다.

- 초대 버튼은 권한이 있을 때만 보여야 합니다.
- 내보내기 버튼은 loading 상태와 disabled 이유가 필요합니다.
- 어떤 화면은 description에 검색 결과 요약을 보여줍니다.
- 어떤 화면은 actions 자리에 segmented control을 넣습니다.

이 요구를 모두 prop으로 만들면 header는 페이지별 예외를 계속 흡수합니다. slot으로 열어두면 header는 배치만 담당하고, 각 화면이 필요한 액션 JSX를 직접 구성합니다.

## 실무 판단 기준

다음 조건이 보이면 slot pattern을 검토합니다.

- 교체 영역의 위치와 의미는 고정되어 있습니다.
- 각 영역 안의 구체적인 UI는 화면마다 달라집니다.
- wrapper가 내부 액션의 이벤트, 권한, loading 상태를 몰라도 됩니다.
- 호출부에서 JSX를 넘기는 편이 boolean prop 조합보다 명확합니다.

반대로 slot이 많아져 호출부가 빈칸 채우기처럼 느껴지면 컴포넌트가 너무 큰 것입니다. 이 경우 레이아웃을 더 작은 컴포넌트로 나누거나 compound component를 검토합니다.

## 코드 리뷰 체크리스트

- slot 이름이 화면에서의 의미를 정확히 드러내는가?
- 선택 slot이 없을 때 불필요한 빈 여백이나 구분선이 남지 않는가?
- slot 내부의 이벤트와 상태가 부모 컴포넌트에 과하게 새어 나오지 않는가?
- boolean prop으로 표현하던 UI 변형을 slot으로 바꾸면서 API가 실제로 단순해졌는가?
- slot 수가 너무 많아 컴포넌트 책임이 넓어진 것은 아닌가?

## 흔한 실수

- `left`, `right`, `top`처럼 위치 이름만 쓰고 의미를 드러내지 않습니다.
- slot과 boolean option을 함께 제공해 같은 영역을 두 방식으로 제어하게 만듭니다.
- slot fallback이 복잡해져 호출부보다 내부 분기가 더 커집니다.
- `actions` slot 안의 버튼 간격까지 호출부가 매번 맞추게 만듭니다.

## 관련 패턴

- [Children Composition](../children-composition/README.md): 교체 영역이 하나뿐일 때
- [Compound Component](../compound-component/README.md): 여러 하위 컴포넌트가 상태와 접근성 연결을 공유해야 할 때
- [Polymorphic Component](../polymorphic-component/README.md): slot에 들어갈 요소의 태그 자체를 바꿔야 할 때

## 참고 자료

- [React: Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [Radix UI: Slot](https://www.radix-ui.com/primitives/docs/utilities/slot)
- [Radix UI: Composition](https://www.radix-ui.com/primitives/docs/guides/composition)
