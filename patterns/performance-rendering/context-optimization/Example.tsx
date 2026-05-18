import { Card } from '../../../shared/components/Card';

export default function ContextOptimizationExample() {
  return (
    <Card title="Context 최적화" eyebrow="렌더링 성능 / 좋은 예">
      <p>Context 변경 범위를 줄여 불필요한 렌더를 막습니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>자주 바뀌는 값과 안정적인 값을 별도 Context로 분리한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>상태와 dispatch를 다른 Context에 분리하는 방법도 효과적이다</span>
        </div>
      </div>
    </Card>
  );
}
