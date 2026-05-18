import { Card } from '../../../shared/components/Card';

export default function ErrorBoundaryBadCase() {
  return (
    <Card title="에러 경계" eyebrow="비동기와 API 상태 / 나쁜 예">
      <p>렌더링 실패를 화면 경계에서 복구합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>class 컴포넌트로만 구현 가능하지만 래퍼로 쉽게 쓸 수 있다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>컴포넌트에서 throw된 에러가 잡히지 않으면 앱 전체가 빈 화면이 됩니다.</span>
        </div>
      </div>
    </Card>
  );
}
