import { Card } from '../../../shared/components/Card';

export default function PropsDrillingMisunderstandingImprovedCase() {
  return (
    <Card title="props drilling 오해" eyebrow="안티패턴 / 개선 예">
      <p>props 전달 자체를 문제로 오해하고 과한 Context를 씁니다.</p>
      <div className="example-surface">
        <div>
          <strong>개선 방향</strong>
          <span>props 전달 자체를 문제로 오해해 Context를 남용하는 일을 피합니다.</span>
        </div>
        <div>
          <strong>유지 기준</strong>
          <span>5단계 이상이거나 완전히 무관한 컴포넌트를 통과할 때 Context를 검토한다</span>
        </div>
      </div>
    </Card>
  );
}
