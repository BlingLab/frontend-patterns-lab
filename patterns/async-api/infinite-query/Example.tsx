import { Card } from '../../../shared/components/Card';

export default function InfiniteQueryExample() {
  return (
    <Card title="무한 조회" eyebrow="비동기와 API 상태 / 좋은 예">
      <p>무한 스크롤 데이터를 페이지 묶음으로 관리합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>페이지 데이터를 배열로 누적 관리한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>마지막 페이지의 커서로 다음 요청을 보낸다</span>
        </div>
      </div>
    </Card>
  );
}
