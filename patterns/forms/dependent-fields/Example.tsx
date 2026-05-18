import { Card } from '../../../shared/components/Card';

export default function DependentFieldsExample() {
  return (
    <Card title="의존 필드" eyebrow="폼과 검증 / 좋은 예">
      <p>한 필드 값이 다른 필드 선택지를 결정합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>부모 필드 값이 바뀌면 자식 필드를 리셋한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>자식 필드의 options을 부모 값으로 계산한다</span>
        </div>
      </div>
    </Card>
  );
}
