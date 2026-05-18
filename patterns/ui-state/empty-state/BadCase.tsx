import { Card } from '../../../shared/components/Card';

export default function EmptyStateBadCase() {
  return (
    <Card title="빈 상태" eyebrow="UI 상태 표현 / 나쁜 예">
      <p>모든 빈 결과를 같은 문구로 처리하면 사용자가 원인과 다음 행동을 알 수 없습니다.</p>
      <div className="demo-box">
        <strong>데이터가 없습니다.</strong>
        <p>다시 시도해 주세요.</p>
      </div>
      <div className="example-surface">
        <div>
          <strong>원인 불명</strong>
          <span>처음부터 없는지, 필터 때문인지, 권한 문제인지 구분할 수 없습니다.</span>
        </div>
        <div>
          <strong>행동 부재</strong>
          <span>생성, 필터 초기화, 권한 요청 중 무엇을 해야 하는지 알려주지 않습니다.</span>
        </div>
      </div>
    </Card>
  );
}
