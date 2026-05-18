import { Card } from '../../../shared/components/Card';

export default function RenderTrackingExample() {
  return (
    <Card title="렌더 추적" eyebrow="렌더링 성능 / 좋은 예">
      <p>렌더 횟수를 관찰해 병목을 찾습니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>useRef로 렌더 횟수를 세는 useRenderCount 훅을 만든다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>React DevTools Profiler로 렌더 원인을 분석한다</span>
        </div>
      </div>
    </Card>
  );
}
