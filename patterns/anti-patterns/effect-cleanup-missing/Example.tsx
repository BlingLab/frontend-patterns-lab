import { Card } from '../../../shared/components/Card';

export default function EffectCleanupMissingExample() {
  return (
    <Card title="effect cleanup 누락" eyebrow="안티패턴 / 문제 예">
      <p>구독, 타이머, 요청 정리를 누락합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>effect return 함수에서 반드시 cleanup한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>clearInterval, removeEventListener, ws.close()가 cleanup에 들어간다</span>
        </div>
      </div>
    </Card>
  );
}
