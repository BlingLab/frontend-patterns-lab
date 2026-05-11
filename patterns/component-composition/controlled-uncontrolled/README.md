# 제어/비제어 컴포넌트

영문명: Controlled / Uncontrolled
폴더: `component-composition/controlled-uncontrolled`

## 한 줄 요약

컴포넌트가 내부 상태로도 동작하고, 필요하면 `value/onChange` 또는 `checked/onCheckedChange`로 외부에서 제어될 수도 있게 만드는 상태 소유권 패턴입니다.

## 패턴 형태

- 분류: 컴포넌트 조합
- 형태: State Ownership API
- 핵심 질문: 이 컴포넌트의 상태를 컴포넌트 내부가 소유해야 하는가, 호출부가 소유해야 하는가

## 왜 필요한가

React의 form 문서는 controlled input과 uncontrolled input을 명확히 구분합니다. `value`나 `checked`를 넘기면 React state가 값을 제어하고, 이 경우 값을 동기적으로 갱신하는 `onChange`가 필요합니다. 반대로 `defaultValue`나 `defaultChecked`는 초기값만 지정하고 이후 값은 DOM 또는 컴포넌트 내부 상태가 관리합니다. React는 하나의 input이 생명주기 동안 controlled와 uncontrolled 사이를 오가면 안 된다고 설명합니다.

디자인 시스템 컴포넌트도 같은 문제가 있습니다. `Switch`, `Tabs`, `Dialog`, `Select` 같은 컴포넌트는 간단히 쓸 때는 내부 상태가 편합니다.

```tsx
<Switch defaultChecked />
```

하지만 폼 상태, URL state, 서버 저장 상태, 부모 컴포넌트의 조건과 연결해야 할 때는 외부 제어가 필요합니다.

```tsx
<Switch checked={enabled} onCheckedChange={setEnabled} />
```

둘 중 하나만 지원하면 사용성이 치우칩니다. 내부 상태만 지원하면 상위 상태와 동기화하기 어렵고, 외부 제어만 지원하면 간단한 화면에서도 매번 state를 만들어야 합니다.

## 핵심 원리

- value prop이 없으면 내부 상태로 동작한다
- value + onChange가 있으면 외부가 상태를 소유한다
- defaultValue로 초기값을 주되 이후 제어는 내부에 맡길 수 있다

## 언제 사용하는가

- 디자인 시스템의 입력형 컴포넌트를 만들 때
- 간단한 사용과 외부 제어 사용을 모두 지원해야 할 때
- 상태를 form library, URL state, parent state와 연결할 수 있어야 할 때
- `Dialog open`, `Tabs value`, `Switch checked`, `Select value`처럼 소유권이 상황마다 달라질 수 있을 때
- 라이브러리 컴포넌트처럼 다양한 사용자가 다양한 상태 관리 방식을 선택해야 할 때

## 언제 피해야 하는가

- 컴포넌트가 항상 특정 외부 상태와 연결되어야 하는 도메인 컴포넌트일 때
- 내부 상태를 숨기면 디버깅이 어려운 복잡한 workflow일 때
- controlled/uncontrolled 전환을 런타임에 허용해야 하는 설계일 때
- 단순 presentational component라 상태 소유권 문제가 없는 경우
- 서버 상태나 URL이 명확한 단일 출처인데 내부 상태를 추가하면 동기화 문제가 생기는 경우

## 어떻게 사용하는가

1. `value` 또는 `checked`가 `undefined`가 아니면 controlled로 판단합니다.
2. controlled일 때는 내부 state를 변경하지 않고 change callback만 호출합니다.
3. uncontrolled일 때는 `defaultValue` 또는 `defaultChecked`로 내부 state를 초기화합니다.
4. controlled 여부는 컴포넌트 생명주기 중 바뀌지 않는 것을 전제로 합니다.
5. API 문서에 controlled 사용과 uncontrolled 사용 예시를 둘 다 제공합니다.

## 기본 코드 형태

```tsx
function Switch({ checked, defaultChecked = false, onCheckedChange }: SwitchProps) {
  const [isChecked, setChecked] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  return (
    <button aria-pressed={isChecked} onClick={() => setChecked(!isChecked)}>
      {isChecked ? '켜짐' : '꺼짐'}
    </button>
  );
}
```

사용자는 상황에 따라 상태 소유권을 선택합니다.

```tsx
<Switch defaultChecked />
<Switch checked={enabled} onCheckedChange={setEnabled} />
```

## 예제 읽는 법

- `Example.tsx`는 같은 `ToggleSwitch`를 uncontrolled 방식과 controlled 방식으로 각각 사용합니다.
- `BadCase.tsx`는 내부 상태와 외부 prop을 동시에 섞어 사용합니다. 부모가 `checked`를 바꿔도 내부 상태가 따로 움직여 실제 UI와 외부 상태가 어긋날 수 있습니다.

## 나쁜 예가 나빠지는 과정

가장 흔한 실수는 prop으로 받은 값을 내부 state의 초기값으로만 쓰는 것입니다.

```tsx
function Switch({ checked }: { checked: boolean }) {
  const [internalChecked, setInternalChecked] = useState(checked);
  // ...
}
```

이 코드는 처음에는 동작해 보입니다. 하지만 부모가 `checked`를 바꿔도 내부 state는 자동으로 바뀌지 않습니다. 반대로 사용자가 내부 state를 바꾸면 부모 상태와 UI 상태가 서로 다른 값을 가질 수 있습니다.

두 번째 실수는 `checked`가 있으면 controlled처럼 보이지만 클릭 시 내부 state도 함께 바꾸는 것입니다. 상태 출처가 두 개가 되면 어떤 값이 최종 UI를 결정하는지 알기 어렵습니다.

## 실무 판단 기준

이 패턴을 적용할지는 컴포넌트가 "라이브러리 성격"인지로 판단합니다. 여러 화면에서 같은 컴포넌트를 쓰고 어떤 화면은 간단한 내부 상태를 원하며, 어떤 화면은 폼이나 URL과 연결해야 한다면 controlled/uncontrolled API가 적합합니다.

반대로 특정 화면 전용 도메인 컴포넌트라면 상태 소유자를 하나로 고정하는 편이 더 명확합니다.

## 코드 리뷰 체크리스트

- controlled 여부를 `value !== undefined` 또는 `checked !== undefined`로 일관되게 판단하는가?
- controlled일 때 내부 state를 갱신하지 않는가?
- uncontrolled일 때 `defaultValue` 변경을 매번 내부 state에 다시 덮어쓰지 않는가?
- controlled와 uncontrolled 전환을 경고하거나 문서로 금지하는가?
- callback 이름이 값의 의미를 드러내는가? 예: `onCheckedChange`, `onValueChange`

## 흔한 실수

- `value || internalValue`처럼 falsy 값을 잘못 처리해 `false`, `0`, 빈 문자열이 깨집니다.
- `defaultValue`가 바뀔 때마다 내부 상태를 재초기화합니다.
- controlled prop과 internal state를 동시에 UI 렌더링에 사용합니다.
- `onChange` 없이 `value`만 받아 읽기 전용 컴포넌트가 됩니다.
- controlled/uncontrolled 모드 전환을 허용해 디버깅이 어려워집니다.

## 테스트와 검증 포인트

- controlled와 uncontrolled 모드를 각각 렌더링해 상태 소유자가 섞이지 않는지 확인합니다.
- defaultValue 변경이 이후 내부 상태를 덮어쓰지 않는지 확인합니다.
- value만 있고 onChange가 없는 읽기 전용/오사용 케이스를 문서화합니다.

## 관련 패턴

- [Use Controllable State](../../hooks/use-controllable-state/README.md): 상태 소유권 분기를 훅으로 재사용할 때
- [Controlled Form](../../forms/controlled-form/README.md): 폼 입력 전체를 React state로 제어할 때
- [Uncontrolled Form](../../forms/uncontrolled-form/README.md): 제출 시점에만 값을 읽는 폼을 만들 때

## 참고 자료

- [React: input](https://react.dev/reference/react-dom/components/input)
- [React: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
