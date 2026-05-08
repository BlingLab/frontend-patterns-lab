import { Card } from '../../../shared/components/Card';

export default function PaginationBadCase() {
  return (
    <Card title="페이지네이션" eyebrow="비동기와 API 상태 / 나쁜 예">
      <p>페이지 기반 목록 조회의 상태와 요청을 분리합니다.</p>
      <div className="example-surface">
        <div>
          <strong>상황</strong>
          <span>요구사항이 커질 때 책임 경계를 명확히 해야 합니다.</span>
        </div>
        <div>
          <strong>판단</strong>
          <span>변경 이유, 재사용 범위, 테스트 단위를 기준으로 적용합니다.</span>
        </div>
      </div>
    </Card>
  );
}
