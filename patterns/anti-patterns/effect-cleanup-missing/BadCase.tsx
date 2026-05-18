import { Card } from '../../../shared/components/Card';

export default function EffectCleanupMissingBadCase() {
  return (
    <Card title="effect cleanup 누락" eyebrow="안티패턴 / 나쁜 예">
      <p>구독, 타이머, 요청 정리를 누락합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>effect return 함수에서 반드시 cleanup한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>setInterval, addEventListener, WebSocket처럼 외부 리소스를 점유하는 코드를 useEffect에서 정리하지 않으면 컴포넌트가 unmou...</span>
        </div>
      </div>
    </Card>
  );
}
