import { Card } from '../../../shared/components/Card';

export default function ExpensiveCalculationBadCase() {
  return (
    <Card title="Expensive Calculation" eyebrow="Performance Rendering / Bad Case">
      <p>무거운 계산을 memoization 또는 사전 계산으로 제한합니다.</p>
      <div className="example-surface">
        <div>
          <strong>상황</strong>
          <span>요구사항이 커질 때 책임 경계를 명확히 해야 합니다.</span>
        </div>
        <div>
          <strong>판단</strong>
          <span>변경 이유, 재사용 범위, 테스트 단위를 기준으로 적용합니다.</span>
        </div>
      </div>
    </Card>
  );
}
