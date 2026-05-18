import { Card } from '../../../shared/components/Card';

export default function LargeComponentImprovedCase() {
  return (
    <Card title="거대한 컴포넌트" eyebrow="안티패턴 / 개선 예">
      <p>하나의 컴포넌트가 데이터, 상태, 표현을 모두 떠안습니다.</p>
      <div className="example-surface">
        <div>
          <strong>개선 방향</strong>
          <span>하나의 컴포넌트가 데이터, 상태, 표현을 모두 떠안는 문제를 피합니다.</span>
        </div>
        <div>
          <strong>유지 기준</strong>
          <span>데이터 로딩과 렌더링을 분리하면 재사용이 쉬워진다</span>
        </div>
      </div>
    </Card>
  );
}
