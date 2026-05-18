import { Card } from '../../../shared/components/Card';

export default function OptimisticUpdateBadCase() {
  return (
    <Card title="낙관적 업데이트" eyebrow="비동기와 API 상태 / 나쁜 예">
      <p>캐시를 먼저 갱신하고 실패 시 롤백합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>onMutate에서 캐시를 먼저 업데이트하고 이전 값을 저장한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>할 일 완료 체크처럼 빠른 피드백이 중요한 UI에서 서버 응답을 기다리면 인터랙션이 느리게 느껴집니다.</span>
        </div>
      </div>
    </Card>
  );
}
