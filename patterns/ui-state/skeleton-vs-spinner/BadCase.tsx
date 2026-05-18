import { Card } from '../../../shared/components/Card';

export default function SkeletonVsSpinnerBadCase() {
  return (
    <Card title="스켈레톤 vs 스피너" eyebrow="UI 상태 표현 / 나쁜 예">
      <p>모든 대기를 하나의 spinner로 처리하면 사용자가 무엇을 기다리는지 알 수 없습니다.</p>
      <div className="demo-box" role="status" aria-live="polite">
        <strong>로딩 중...</strong>
        <p>목록인지, 전체 화면 전환인지, 저장 요청인지 구분되지 않습니다.</p>
      </div>
      <div className="example-surface">
        <div>
          <strong>정보 부족</strong>
          <span>예상 레이아웃을 줄 수 있는 화면에서도 단순 대기만 노출합니다.</span>
        </div>
        <div>
          <strong>시프트 위험</strong>
          <span>콘텐츠가 도착한 뒤 실제 높이가 달라져 화면이 갑자기 움직일 수 있습니다.</span>
        </div>
      </div>
    </Card>
  );
}
