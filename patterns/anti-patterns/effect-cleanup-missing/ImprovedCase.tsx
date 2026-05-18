import { Card } from '../../../shared/components/Card';

export default function EffectCleanupMissingImprovedCase() {
  return (
    <Card title="effect cleanup 누락" eyebrow="안티패턴 / 개선 예">
      <p>구독, 타이머, 요청 정리를 누락합니다.</p>
      <div className="example-surface">
        <div>
          <strong>개선 방향</strong>
          <span>구독, 타이머, 외부 연결을 cleanup하지 않는 문제를 피합니다.</span>
        </div>
        <div>
          <strong>유지 기준</strong>
          <span>clearInterval, removeEventListener, ws.close()가 cleanup에 들어간다</span>
        </div>
      </div>
    </Card>
  );
}
