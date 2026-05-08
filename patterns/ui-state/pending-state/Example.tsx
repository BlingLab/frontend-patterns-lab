import { Card } from '../../../shared/components/Card';

export default function PendingStateExample() {
  return (
    <Card title="처리 중 상태" eyebrow="UI 상태 표현 / 좋은 예">
      <p>처리 중인 액션의 피드백을 버튼과 영역에 표시합니다.</p>
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
