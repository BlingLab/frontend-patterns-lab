import { Card } from '../../../shared/components/Card';

export default function FieldLevelValidationBadCase() {
  return (
    <Card title="필드 단위 검증" eyebrow="폼과 검증 / 나쁜 예">
      <p>필드 단위로 검증과 오류 표시를 분리합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>각 필드가 자신의 validate 함수를 갖는다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>검증 규칙이 폼 submit 핸들러에만 있으면 어떤 필드가 어떤 규칙을 갖는지 찾기 어렵습니다.</span>
        </div>
      </div>
    </Card>
  );
}
