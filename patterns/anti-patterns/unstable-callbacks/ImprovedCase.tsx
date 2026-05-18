import { Card } from '../../../shared/components/Card';

export default function UnstableCallbacksImprovedCase() {
  return (
    <Card title="불안정한 콜백" eyebrow="안티패턴 / 개선 예">
      <p>불안정한 콜백이 하위 컴포넌트 렌더를 유발합니다.</p>
      <div className="example-surface">
        <div>
          <strong>개선 방향</strong>
          <span>불안정한 콜백 때문에 하위 컴포넌트 렌더가 퍼지는 문제를 피합니다.</span>
        </div>
        <div>
          <strong>유지 기준</strong>
          <span>함수가 매 렌더마다 새로 만들어지면 === 비교에서 false다</span>
        </div>
      </div>
    </Card>
  );
}
