import { Card } from '../../../shared/components/Card';

export default function SuspenseBoundaryBadCase() {
  return (
    <Card title="Suspense 경계" eyebrow="비동기와 API 상태 / 나쁜 예">
      <p>Suspense로 비동기 로딩 경계를 선언합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>로딩 상태 분기를 JSX가 아닌 Suspense 경계로 처리한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>isLoading을 모든 컴포넌트에서 직접 처리하면 로딩 분기가 JSX 곳곳에 흩어집니다.</span>
        </div>
      </div>
    </Card>
  );
}
