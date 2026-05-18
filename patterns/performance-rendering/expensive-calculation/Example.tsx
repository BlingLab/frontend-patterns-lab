import { Card } from '../../../shared/components/Card';

export default function ExpensiveCalculationExample() {
  return (
    <Card title="비싼 계산 처리" eyebrow="렌더링 성능 / 좋은 예">
      <p>무거운 계산을 memoization 또는 사전 계산으로 제한합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>useMemo의 deps가 바뀔 때만 재계산한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>실제로 비싼지 console.time으로 먼저 측정한다</span>
        </div>
      </div>
    </Card>
  );
}
