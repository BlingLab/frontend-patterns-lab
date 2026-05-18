import { Card } from '../../../shared/components/Card';

export default function UnnecessaryGlobalStateImprovedCase() {
  return (
    <Card title="불필요한 전역 상태" eyebrow="안티패턴 / 개선 예">
      <p>지역 상태로 충분한 값을 전역 store에 올립니다.</p>
      <div className="example-surface">
        <div>
          <strong>개선 방향</strong>
          <span>지역 상태로 충분한 값을 전역 store에 올리는 문제를 피합니다.</span>
        </div>
        <div>
          <strong>유지 기준</strong>
          <span>지역 상태는 컴포넌트가 unmount되면 자동으로 정리된다</span>
        </div>
      </div>
    </Card>
  );
}
