import { Card } from '../../../shared/components/Card';

export default function ControlledFormExample() {
  return (
    <Card title="제어 폼" eyebrow="폼과 검증 / 좋은 예">
      <p>입력 값을 React 상태로 직접 제어합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>value + onChange로 입력을 완전히 제어한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>실시간 유효성 검사와 조건부 렌더링이 쉽다</span>
        </div>
      </div>
    </Card>
  );
}
