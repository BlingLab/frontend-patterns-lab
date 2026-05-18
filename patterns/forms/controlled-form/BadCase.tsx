import { Card } from '../../../shared/components/Card';

export default function ControlledFormBadCase() {
  return (
    <Card title="제어 폼" eyebrow="폼과 검증 / 나쁜 예">
      <p>입력 값을 React 상태로 직접 제어합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>value + onChange로 입력을 완전히 제어한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>입력 값이 state에 있으면 실시간 유효성 검사, 조건부 필드 표시, 입력 포맷팅을 자연스럽게 할 수 있습니다.</span>
        </div>
      </div>
    </Card>
  );
}
