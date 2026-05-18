import { Card } from '../../../shared/components/Card';

export default function OveruseMemoizationExample() {
  return (
    <Card title="메모이제이션 남용" eyebrow="안티패턴 / 문제 예">
      <p>비용보다 복잡도가 큰 memoization을 남발합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>단순 원시값, 짧은 계산에는 useMemo가 불필요하다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>useCallback은 memo된 자식에 넘기는 함수에만 쓴다</span>
        </div>
      </div>
    </Card>
  );
}
