import { Card } from '../../../shared/components/Card';

export default function ComponentSplittingExample() {
  return (
    <Card title="컴포넌트 분리" eyebrow="렌더링 성능 / 좋은 예">
      <p>변경 빈도가 다른 영역을 컴포넌트로 분리합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>변경 빈도가 다른 UI를 별도 컴포넌트로 추출한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>memo 없이도 리렌더 범위를 좁힐 수 있다</span>
        </div>
      </div>
    </Card>
  );
}
