import { Card } from '../../../shared/components/Card';

export default function OveruseMemoizationImprovedCase() {
  return (
    <Card title="메모이제이션 남용" eyebrow="안티패턴 / 개선 예">
      <p>비용보다 복잡도가 큰 memoization을 남발합니다.</p>
      <div className="example-surface">
        <div>
          <strong>개선 방향</strong>
          <span>측정 없이 memo/useMemo/useCallback을 남발하는 문제를 피합니다.</span>
        </div>
        <div>
          <strong>유지 기준</strong>
          <span>useCallback은 memo된 자식에 넘기는 함수에만 쓴다</span>
        </div>
      </div>
    </Card>
  );
}
