import { Card } from '../../../shared/components/Card';

export default function InfiniteQueryBadCase() {
  return (
    <Card title="무한 조회" eyebrow="비동기와 API 상태 / 나쁜 예">
      <p>무한 스크롤 데이터를 페이지 묶음으로 관리합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>페이지 데이터를 배열로 누적 관리한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>SNS 피드처럼 "더 보기"나 무한 스크롤을 구현할 때 이전 데이터를 유지하면서 새 페이지를 누적해야 합니다.</span>
        </div>
      </div>
    </Card>
  );
}
