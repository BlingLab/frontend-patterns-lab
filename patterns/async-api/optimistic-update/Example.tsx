import { Card } from '../../../shared/components/Card';

export default function OptimisticUpdateExample() {
  return (
    <Card title="낙관적 업데이트" eyebrow="비동기와 API 상태 / 좋은 예">
      <p>캐시를 먼저 갱신하고 실패 시 롤백합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>onMutate에서 캐시를 먼저 업데이트하고 이전 값을 저장한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>onError에서 이전 값으로 캐시를 복원한다</span>
        </div>
      </div>
    </Card>
  );
}
