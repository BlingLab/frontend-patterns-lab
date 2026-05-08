import { Card } from '../../../shared/components/Card';

export default function RenderTrackingBadCase() {
  return (
    <Card title="렌더 추적" eyebrow="렌더링 성능 / 나쁜 예">
      <p>렌더 횟수를 관찰해 병목을 찾습니다.</p>
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
