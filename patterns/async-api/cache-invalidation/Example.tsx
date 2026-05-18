import { Card } from '../../../shared/components/Card';

export default function CacheInvalidationExample() {
  return (
    <Card title="캐시 무효화" eyebrow="비동기와 API 상태 / 좋은 예">
      <p>쓰기 이후 어떤 조회 캐시를 무효화할지 명시합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>mutation onSuccess에서 관련 queryKey를 invalidate한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>무효화된 쿼리는 다음 마운트/포커스 시 자동으로 재요청된다</span>
        </div>
      </div>
    </Card>
  );
}
