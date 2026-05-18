import { Card } from '../../../shared/components/Card';

export default function RenderTrackingBadCase() {
  return (
    <Card title="렌더 추적" eyebrow="렌더링 성능 / 나쁜 예">
      <p>렌더 횟수를 관찰해 병목을 찾습니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>useRef로 렌더 횟수를 세는 useRenderCount 훅을 만든다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>"느리다"는 느낌만으로 useCallback을 추가하는 것은 측정 없는 최적화입니다.</span>
        </div>
      </div>
    </Card>
  );
}
