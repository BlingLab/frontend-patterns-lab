import { Card } from '../../../shared/components/Card';

export default function ContextOptimizationBadCase() {
  return (
    <Card title="Context 최적화" eyebrow="렌더링 성능 / 나쁜 예">
      <p>Context 변경 범위를 줄여 불필요한 렌더를 막습니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>자주 바뀌는 값과 안정적인 값을 별도 Context로 분리한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>Context value가 바뀌면 useContext를 호출하는 모든 컴포넌트가 리렌더됩니다.</span>
        </div>
      </div>
    </Card>
  );
}
