import { Card } from '../../../shared/components/Card';

export default function PropsDrillingMisunderstandingBadCase() {
  return (
    <Card title="props drilling 오해" eyebrow="안티패턴 / 나쁜 예">
      <p>props 전달 자체를 문제로 오해하고 과한 Context를 씁니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>2-3단계 props 전달은 정상이다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>2-3단계 props 전달은 자연스럽고 명시적입니다.</span>
        </div>
      </div>
    </Card>
  );
}
