import { Card } from '../../../shared/components/Card';

export default function UseControllableStateBadCase() {
  return (
    <Card title="제어 가능 상태 훅" eyebrow="훅과 로직 재사용 / 나쁜 예">
      <p>제어/비제어 상태를 하나의 훅으로 일관되게 처리합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>value prop 유무로 자동으로 controlled/uncontrolled를 판단한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>컴포넌트 라이브러리를 만들 때 controlled/uncontrolled를 각 컴포넌트마다 if문으로 처리하면 중복이 많고 실수가 생깁니다.</span>
        </div>
      </div>
    </Card>
  );
}
