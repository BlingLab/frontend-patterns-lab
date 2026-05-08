import { Card } from '../../../shared/components/Card';

export default function UseEffectForDerivedStateImprovedCase() {
  return (
    <Card title="파생 상태를 effect로 만들기" eyebrow="안티패턴 / 개선 예">
      <p>계산 가능한 값을 effect와 state로 중복 저장합니다.</p>
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
