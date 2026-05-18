import { Card } from '../../../shared/components/Card';

export default function DirtyStateExample() {
  return (
    <Card title="변경 여부 상태" eyebrow="폼과 검증 / 좋은 예">
      <p>초기값 대비 변경 여부를 추적합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>초기값(defaultValues)을 별도로 보관한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>현재값과 깊은 비교(deep equal)로 dirty 여부를 계산한다</span>
        </div>
      </div>
    </Card>
  );
}
