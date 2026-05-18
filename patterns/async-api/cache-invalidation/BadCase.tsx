import { Card } from '../../../shared/components/Card';

export default function CacheInvalidationBadCase() {
  return (
    <Card title="캐시 무효화" eyebrow="비동기와 API 상태 / 나쁜 예">
      <p>쓰기 이후 어떤 조회 캐시를 무효화할지 명시합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>mutation onSuccess에서 관련 queryKey를 invalidate한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>상품을 삭제했는데 목록 화면이 여전히 삭제된 상품을 보여주면 사용자가 혼란스럽습니다.</span>
        </div>
      </div>
    </Card>
  );
}
