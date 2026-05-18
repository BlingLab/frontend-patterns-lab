import { Card } from '../../../shared/components/Card';

export default function ListRenderingExample() {
  return (
    <Card title="목록 렌더링" eyebrow="렌더링 성능 / 좋은 예">
      <p>큰 목록 렌더링 비용을 줄입니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>1000개 이상 목록에는 가상화(react-window, TanStack Virtual)를 검토한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>각 항목의 고유 id를 key로 쓴다</span>
        </div>
      </div>
    </Card>
  );
}
