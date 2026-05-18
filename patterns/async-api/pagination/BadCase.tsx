import { Card } from '../../../shared/components/Card';

export default function PaginationBadCase() {
  return (
    <Card title="페이지네이션" eyebrow="비동기와 API 상태 / 나쁜 예">
      <p>페이지 기반 목록 조회의 상태와 요청을 분리합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>현재 page와 pageSize를 상태로 관리한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>모든 데이터를 한 번에 가져오면 초기 로딩이 오래 걸리고 서버 부하가 큽니다.</span>
        </div>
      </div>
    </Card>
  );
}
