import { Card } from '../../../shared/components/Card';

export default function ErrorBoundaryExample() {
  return (
    <Card title="에러 경계" eyebrow="비동기와 API 상태 / 좋은 예">
      <p>렌더링 실패를 화면 경계에서 복구합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>class 컴포넌트로만 구현 가능하지만 래퍼로 쉽게 쓸 수 있다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>에러를 잡는 범위를 granular하게 나눌 수 있다</span>
        </div>
      </div>
    </Card>
  );
}
