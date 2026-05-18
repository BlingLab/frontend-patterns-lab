import { Card } from '../../../shared/components/Card';

export default function SuspenseBoundaryExample() {
  return (
    <Card title="Suspense 경계" eyebrow="비동기와 API 상태 / 좋은 예">
      <p>Suspense로 비동기 로딩 경계를 선언합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>로딩 상태 분기를 JSX가 아닌 Suspense 경계로 처리한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>ErrorBoundary와 함께 로딩/에러 경계를 선언한다</span>
        </div>
      </div>
    </Card>
  );
}
