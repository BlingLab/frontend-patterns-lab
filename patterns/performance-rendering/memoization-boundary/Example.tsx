import { Card } from '../../../shared/components/Card';

export default function MemoizationBoundaryExample() {
  return (
    <Card title="메모이제이션 경계" eyebrow="렌더링 성능 / 좋은 예">
      <p>memo의 경계를 비용이 큰 하위 트리에 둡니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>비용이 큰 자식에만 적용하고 기본 컴포넌트에는 불필요하다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>props에 인라인 객체/함수가 있으면 memo가 효과없다</span>
        </div>
      </div>
    </Card>
  );
}
