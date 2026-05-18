import { Card } from '../../../shared/components/Card';

export default function SkeletonVsSpinnerExample() {
  return (
    <Card title="스켈레톤 vs 스피너" eyebrow="UI 상태 표현 / 좋은 예">
      <p>레이아웃을 예측할 수 있는 목록은 skeleton으로, 화면 전환처럼 구조가 불확실한 작업은 spinner로 분리합니다.</p>
      <div className="compare-grid">
        <div className="compare-panel good" aria-label="목록 skeleton 예시">
          <span className="compare-label good">예측 가능한 목록</span>
          <div className="skeleton" />
          <div className="skeleton mt-8" style={{ width: '82%' }} />
          <div className="skeleton mt-8" style={{ width: '64%' }} />
        </div>
        <div className="compare-panel good" aria-label="전환 spinner 예시">
          <span className="compare-label good">구조가 불확실한 전환</span>
          <p role="status" aria-live="polite">
            결제 화면을 준비하는 중...
          </p>
        </div>
      </div>
      <div className="example-surface">
        <div>
          <strong>레이아웃 예측</strong>
          <span>카드, 목록, 표처럼 자리와 크기가 정해진 영역은 skeleton이 적합합니다.</span>
        </div>
        <div>
          <strong>전환 대기</strong>
          <span>다음 화면 구조가 아직 정해지지 않은 작업은 짧은 status 문구가 더 낫습니다.</span>
        </div>
      </div>
    </Card>
  );
}
