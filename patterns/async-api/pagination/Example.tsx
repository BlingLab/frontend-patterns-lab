import { Card } from '../../../shared/components/Card';

export default function PaginationExample() {
  return (
    <Card title="페이지네이션" eyebrow="비동기와 API 상태 / 좋은 예">
      <p>페이지 기반 목록 조회의 상태와 요청을 분리합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>현재 page와 pageSize를 상태로 관리한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>page가 바뀔 때 새 데이터를 요청한다</span>
        </div>
      </div>
    </Card>
  );
}
