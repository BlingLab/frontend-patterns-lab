import { Card } from '../../../shared/components/Card';

export default function InfiniteQueryBadCase() {
  return (
    <Card title="Infinite Query" eyebrow="Async API / Bad Case">
      <p>무한 스크롤 데이터를 페이지 묶음으로 관리합니다.</p>
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
