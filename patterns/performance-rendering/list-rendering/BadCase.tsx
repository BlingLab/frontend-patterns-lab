import { Card } from '../../../shared/components/Card';

export default function ListRenderingBadCase() {
  return (
    <Card title="목록 렌더링" eyebrow="렌더링 성능 / 나쁜 예">
      <p>큰 목록 렌더링 비용을 줄입니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>1000개 이상 목록에는 가상화(react-window, TanStack Virtual)를 검토한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>10,000개 항목을 한 번에 렌더하면 초기 렌더가 수초 걸립니다.</span>
        </div>
      </div>
    </Card>
  );
}
