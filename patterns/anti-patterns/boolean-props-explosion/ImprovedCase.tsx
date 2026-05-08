import { Card } from '../../../shared/components/Card';

export default function BooleanPropsExplosionImprovedCase() {
  return (
    <Card title="boolean props 폭발" eyebrow="안티패턴 / 개선 예">
      <p>boolean prop 조합이 컴포넌트 상태 공간을 폭발시킵니다.</p>
      <div className="example-surface">
        <div>
          <strong>상황</strong>
          <span>요구사항이 커질 때 책임 경계를 명확히 해야 합니다.</span>
        </div>
        <div>
          <strong>판단</strong>
          <span>변경 이유, 재사용 범위, 테스트 단위를 기준으로 적용합니다.</span>
        </div>
      </div>
    </Card>
  );
}
