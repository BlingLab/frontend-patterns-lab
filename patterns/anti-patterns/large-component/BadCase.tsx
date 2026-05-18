import { Card } from '../../../shared/components/Card';

export default function LargeComponentBadCase() {
  return (
    <Card title="거대한 컴포넌트" eyebrow="안티패턴 / 나쁜 예">
      <p>하나의 컴포넌트가 데이터, 상태, 표현을 모두 떠안습니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>단일 책임: 한 컴포넌트는 한 가지 이유로만 바뀌어야 한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>300줄 이상의 컴포넌트는 어디서 상태가 오고 어디서 이벤트가 발생하는지 추적이 어렵습니다.</span>
        </div>
      </div>
    </Card>
  );
}
