import { Card } from '../../../shared/components/Card';

export default function PropsDrillingMisunderstandingExample() {
  return (
    <Card title="props drilling 오해" eyebrow="안티패턴 / 문제 예">
      <p>props 전달 자체를 문제로 오해하고 과한 Context를 씁니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>2-3단계 props 전달은 정상이다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>5단계 이상이거나 완전히 무관한 컴포넌트를 통과할 때 Context를 검토한다</span>
        </div>
      </div>
    </Card>
  );
}
