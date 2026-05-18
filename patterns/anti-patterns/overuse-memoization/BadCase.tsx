import { Card } from '../../../shared/components/Card';

export default function OveruseMemoizationBadCase() {
  return (
    <Card title="메모이제이션 남용" eyebrow="안티패턴 / 나쁜 예">
      <p>비용보다 복잡도가 큰 memoization을 남발합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>단순 원시값, 짧은 계산에는 useMemo가 불필요하다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>모든 함수에 useCallback, 모든 값에 useMemo를 쓰면 코드가 복잡해지고 오히려 deps 비교 비용이 생깁니다.</span>
        </div>
      </div>
    </Card>
  );
}
