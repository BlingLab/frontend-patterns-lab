import { Card } from '../../../shared/components/Card';

export default function ExpensiveCalculationBadCase() {
  return (
    <Card title="비싼 계산 처리" eyebrow="렌더링 성능 / 나쁜 예">
      <p>무거운 계산을 memoization 또는 사전 계산으로 제한합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>useMemo의 deps가 바뀔 때만 재계산한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>대용량 데이터 정렬, 복잡한 필터링을 매 렌더마다 실행하면 타이핑 한 번에도 수십 ms가 걸릴 수 있습니다.</span>
        </div>
      </div>
    </Card>
  );
}
