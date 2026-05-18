import { Card } from '../../../shared/components/Card';

export default function UseControllableStateExample() {
  return (
    <Card title="제어 가능 상태 훅" eyebrow="훅과 로직 재사용 / 좋은 예">
      <p>제어/비제어 상태를 하나의 훅으로 일관되게 처리합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>value prop 유무로 자동으로 controlled/uncontrolled를 판단한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>onChange는 항상 일관되게 호출된다</span>
        </div>
      </div>
    </Card>
  );
}
