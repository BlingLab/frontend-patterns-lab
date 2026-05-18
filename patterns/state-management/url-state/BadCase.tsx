import { Card } from '../../../shared/components/Card';

export default function UrlStateBadCase() {
  return (
    <Card title="URL 상태" eyebrow="상태 관리 / 나쁜 예">
      <p>공유되어야 하는 필터와 페이지 정보를 URL에 둡니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>새로고침해도 상태가 유지된다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>검색 필터를 useState에 두면 페이지를 새로고침하거나 링크를 공유할 때 필터 상태가 사라집니다.</span>
        </div>
      </div>
    </Card>
  );
}
