import { Card } from '../../../shared/components/Card';

export default function FormLevelValidationBadCase() {
  return (
    <Card title="폼 단위 검증" eyebrow="폼과 검증 / 나쁜 예">
      <p>여러 필드 간 규칙을 폼 단위에서 검증합니다.</p>
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
