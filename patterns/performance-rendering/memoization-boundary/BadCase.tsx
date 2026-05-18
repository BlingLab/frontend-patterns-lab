import { Card } from '../../../shared/components/Card';

export default function MemoizationBoundaryBadCase() {
  return (
    <Card title="메모이제이션 경계" eyebrow="렌더링 성능 / 나쁜 예">
      <p>memo의 경계를 비용이 큰 하위 트리에 둡니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>비용이 큰 자식에만 적용하고 기본 컴포넌트에는 불필요하다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>부모가 리렌더될 때마다 자식도 리렌더됩니다.</span>
        </div>
      </div>
    </Card>
  );
}
