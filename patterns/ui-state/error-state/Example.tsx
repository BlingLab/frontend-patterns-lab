import { Card } from '../../../shared/components/Card';

export default function ErrorStateExample() {
  return (
    <Card title="Error State" eyebrow="UI State / Example">
      <p>복구 가능한 오류를 명확한 액션과 함께 보여줍니다.</p>
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
