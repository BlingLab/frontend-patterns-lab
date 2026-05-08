import { Card } from '../../../shared/components/Card';

export default function DependentFieldsBadCase() {
  return (
    <Card title="Dependent Fields" eyebrow="Forms / Bad Case">
      <p>한 필드 값이 다른 필드 선택지를 결정합니다.</p>
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
