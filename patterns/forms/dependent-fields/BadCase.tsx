import { Card } from '../../../shared/components/Card';

export default function DependentFieldsBadCase() {
  return (
    <Card title="의존 필드" eyebrow="폼과 검증 / 나쁜 예">
      <p>한 필드 값이 다른 필드 선택지를 결정합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>부모 필드 값이 바뀌면 자식 필드를 리셋한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>"국가"를 선택하면 "도시" 목록이 바뀌는 종속 관계를 구현할 때, 두 필드가 독립적이면 국가 변경 시 도시 선택이 유효하지 않은 값을 유지할 수 있습니다.</span>
        </div>
      </div>
    </Card>
  );
}
