import { Card } from '../../../shared/components/Card';

export default function ErrorStateBadCase() {
  return (
    <Card title="에러 상태" eyebrow="UI 상태 표현 / 나쁜 예">
      <p>오류를 막연한 문구로만 보여주면 사용자가 무엇을 해야 할지 알 수 없습니다.</p>
      <div className="demo-box">
        <strong>오류가 발생했습니다.</strong>
        <p>잠시 후 다시 시도해 주세요.</p>
      </div>
      <div className="example-surface">
        <div>
          <strong>복구 없음</strong>
          <span>retry, 문의, 이전 화면 이동 같은 다음 행동이 없습니다.</span>
        </div>
        <div>
          <strong>영향 범위 불명</strong>
          <span>어떤 데이터가 실패했고 무엇은 유지되는지 알 수 없습니다.</span>
        </div>
      </div>
    </Card>
  );
}
