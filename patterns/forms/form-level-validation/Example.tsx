import { Card } from '../../../shared/components/Card';

export default function FormLevelValidationExample() {
  return (
    <Card title="폼 단위 검증" eyebrow="폼과 검증 / 좋은 예">
      <p>여러 필드 간 규칙을 폼 단위에서 검증합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>교차 필드 규칙(비밀번호 일치, 날짜 범위)을 처리한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>Zod/Yup schema를 폼 레벨에서 적용한다</span>
        </div>
      </div>
    </Card>
  );
}
