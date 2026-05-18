import { Card } from '../../../shared/components/Card';

export default function FieldLevelValidationExample() {
  return (
    <Card title="필드 단위 검증" eyebrow="폼과 검증 / 좋은 예">
      <p>필드 단위로 검증과 오류 표시를 분리합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>각 필드가 자신의 validate 함수를 갖는다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>포커스를 잃을 때(onBlur) 해당 필드만 검증한다</span>
        </div>
      </div>
    </Card>
  );
}
