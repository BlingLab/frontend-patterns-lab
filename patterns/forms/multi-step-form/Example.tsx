import { Card } from '../../../shared/components/Card';

export default function MultiStepFormExample() {
  return (
    <Card title="단계형 폼" eyebrow="폼과 검증 / 좋은 예">
      <p>긴 폼을 단계별 상태와 검증으로 나눕니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>현재 step 인덱스로 어떤 화면을 보여줄지 결정한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>각 step에서 해당 필드만 검증한다</span>
        </div>
      </div>
    </Card>
  );
}
