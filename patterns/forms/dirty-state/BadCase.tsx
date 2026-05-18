import { Card } from '../../../shared/components/Card';

export default function DirtyStateBadCase() {
  return (
    <Card title="변경 여부 상태" eyebrow="폼과 검증 / 나쁜 예">
      <p>초기값 대비 변경 여부를 추적합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>초기값(defaultValues)을 별도로 보관한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>"저장되지 않은 변경사항이 있습니다" 경고나 저장 버튼 활성화를 위해 폼이 변경됐는지 알아야 합니다.</span>
        </div>
      </div>
    </Card>
  );
}
