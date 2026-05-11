# children 조합

영문명: Children Composition
폴더: `component-composition/children-composition`

## 한 줄 요약

공통 레이아웃은 컴포넌트가 맡고, 실제 내용은 호출부가 `children`으로 채워 넣는 조합 패턴입니다.

## 패턴 형태

- 분류: 컴포넌트 조합
- 형태: Composition
- 핵심 질문: 이 컴포넌트가 "무엇을 감싸는지"까지 알아야 하는가, 아니면 "어떻게 감쌀지만" 알면 되는가

## 왜 필요한가

React에서 JSX 태그 안에 중첩한 내용은 `children` prop으로 전달됩니다. React 공식 문서도 `Card` 같은 wrapper 컴포넌트가 내부에 무엇이 렌더링되는지 몰라도 nested JSX를 감쌀 수 있다고 설명합니다.

이 패턴이 필요한 이유는 wrapper 컴포넌트가 내부 콘텐츠의 세부 구조까지 알기 시작하면 재사용성이 급격히 떨어지기 때문입니다. 처음에는 `UserCard`, `ProductCard`, `NoticeCard`처럼 prop을 몇 개 추가하는 정도로 보이지만, 요구사항이 늘면 wrapper 안에 `variant`, `showAvatar`, `showActions`, `isEmpty`, `isCompact` 같은 분기들이 쌓입니다. 그 순간 컴포넌트는 레이아웃 컴포넌트가 아니라 여러 화면의 정책을 모두 아는 거대한 조건문이 됩니다.

`children` composition은 이 책임을 나눕니다. wrapper는 테두리, 간격, 제목 영역, 접근성 구조 같은 반복되는 껍데기만 담당합니다. 내부에 들어갈 사용자 정보, 상품 정보, 빈 상태, 버튼 묶음은 호출부가 직접 JSX로 조립합니다.

## 핵심 원리

- wrapper는 테두리, 간격, 제목만 책임진다
- 내용 종류가 늘어도 wrapper 파일을 수정하지 않는다
- JSX 구조만 봐도 화면 구성이 이해된다

## 언제 사용하는가

- 카드, 패널, 모달 본문, 페이지 섹션처럼 바깥 구조는 반복되고 내용만 달라질 때
- 호출부에서 JSX를 직접 읽는 편이 prop 조합을 해석하는 것보다 명확할 때
- wrapper가 내부 콘텐츠의 데이터 타입을 몰라도 되는 경우
- 디자인 시스템의 `Card`, `Stack`, `Section`, `Toolbar`, `Surface` 같은 기반 컴포넌트를 만들 때
- props forwarding이 과해져서 `<Wrapper {...props} />`가 반복되고, 실제로는 내부 JSX를 넘기는 편이 더 단순할 때

## 언제 피해야 하는가

- wrapper가 children의 개수, 순서, 특정 컴포넌트 타입을 강하게 요구할 때
- 부모가 children 내부 상태를 읽거나 직접 제어해야 할 때
- header, footer, actions처럼 여러 영역의 의미가 분명해서 단일 `children`보다 named slot이 더 읽기 쉬울 때
- 내부 요소 사이에 접근성 연결이 필요해서 compound component나 context가 더 적절할 때
- children에 너무 많은 암묵적 규칙을 숨겨 호출부가 사용법을 추측해야 할 때

## 어떻게 사용하는가

1. 컴포넌트가 반복해서 제공할 껍데기 역할을 정합니다.
2. 바뀌는 콘텐츠 영역은 `children: React.ReactNode`로 받습니다.
3. wrapper는 children의 내부 props나 데이터 구조를 알지 않게 유지합니다.
4. 호출부는 필요한 도메인 컴포넌트를 직접 조합합니다.
5. children에 대한 제약이 필요해지면 단일 children이 맞는지, slot이나 compound component로 바꿔야 하는지 다시 판단합니다.

## 기본 코드 형태

```tsx
type PanelProps = {
  title: string;
  children: React.ReactNode;
};

function Panel({ title, children }: PanelProps) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function AccountPage({ user }: { user: User }) {
  return (
    <Panel title="계정 정보">
      <UserSummary user={user} />
      <AccountActions userId={user.id} />
    </Panel>
  );
}
```

`Panel`은 계정 정보가 무엇인지 모릅니다. 그저 제목과 본문 영역을 제공할 뿐입니다. 계정 데이터를 어떻게 보여줄지는 `AccountPage`가 결정합니다.

## 예제 읽는 법

- `Example.tsx`는 `DashboardSection`이 공통 구조만 맡고, 내부의 KPI와 알림 목록은 호출부가 children으로 조합하는 구조입니다.
- `BadCase.tsx`는 wrapper가 `variant`를 보고 내부 콘텐츠까지 직접 렌더링합니다. 요구사항이 추가될수록 wrapper에 분기와 도메인 props가 늘어나는 형태입니다.

## 나쁜 예가 나빠지는 과정

처음에는 아래 정도의 prop API가 괜찮아 보입니다.

```tsx
<DashboardCard type="revenue" amount={1200000} />
<DashboardCard type="notice" notices={notices} />
```

하지만 카드 종류가 늘어나면 `DashboardCard`는 매번 새 도메인 prop을 알아야 합니다.

- 매출 카드는 `amount`, `trend`, `currency`를 압니다.
- 공지 카드는 `notices`, `emptyMessage`를 압니다.
- 사용자 카드는 `user`, `avatarUrl`, `role`을 압니다.
- 액션 영역이 필요해지면 `primaryAction`, `secondaryAction`도 추가됩니다.

이 컴포넌트는 이제 "카드처럼 감싸는 컴포넌트"가 아니라 "대시보드의 모든 카드 정책을 아는 컴포넌트"가 됩니다. 이때 children composition으로 되돌리면 카드 껍데기와 카드 내용의 변경 이유가 분리됩니다.

## 실무 판단 기준

`children` composition을 적용할지는 다음 질문으로 판단합니다.

- wrapper가 children의 구체적인 데이터 타입을 몰라도 되는가?
- 호출부 JSX가 prop 조합보다 더 읽기 쉬운가?
- 새 콘텐츠 종류가 추가될 때 wrapper 파일을 수정하지 않아도 되는가?
- wrapper의 테스트가 "껍데기를 잘 렌더링하는가"로 충분한가?

위 질문에 대부분 yes라면 `children` composition이 적합합니다. 반대로 wrapper가 내부 요소의 상태, 선택값, 접근성 id를 조율해야 한다면 compound component나 slot pattern을 검토합니다.

## 코드 리뷰 체크리스트

- wrapper가 내부 콘텐츠의 도메인 props를 알지 않는가?
- `children`이 단순한 빈 구멍으로 쓰이고, 암묵적인 순서나 타입 제약을 강요하지 않는가?
- 호출부에서 JSX 구조만 봐도 화면 구성이 이해되는가?
- children이 너무 커져서 별도 컴포넌트로 추출해야 하는 상태는 아닌가?
- 단일 `children`보다 `header`, `footer`, `actions` 같은 slot prop이 더 적합한 상황은 아닌가?

## 흔한 실수

- `children`을 받지만 내부에서 `React.Children.only`, `cloneElement`로 특정 구조를 강제합니다.
- 모든 영역을 children 하나에 넣어 header/action/footer의 의미가 흐려집니다.
- wrapper가 `children`도 받고 `variant`별 내부 렌더링도 함께 처리합니다.
- 단순히 파일을 나눴을 뿐, 실제 변경 이유는 여전히 wrapper에 남아 있습니다.

## 테스트와 검증 포인트

- 새 콘텐츠 종류를 추가해도 wrapper 파일을 수정하지 않는지 확인합니다.
- wrapper 테스트가 레이아웃과 접근성 구조에만 집중하는지 확인합니다.
- children이 커졌을 때 별도 도메인 컴포넌트로 추출해도 wrapper API가 유지되는지 봅니다.

## 관련 패턴

- [Slot Pattern](../slot-pattern/README.md): 영역이 여러 개이고 각 영역의 의미를 이름으로 드러내야 할 때
- [Compound Component](../compound-component/README.md): 하위 컴포넌트들이 상태와 접근성 연결을 공유해야 할 때
- [Container Presenter](../container-presenter/README.md): 데이터 준비와 화면 표현의 책임을 분리해야 할 때

## 참고 자료

- [React: Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [React: Thinking in React](https://react.dev/learn/thinking-in-react)
