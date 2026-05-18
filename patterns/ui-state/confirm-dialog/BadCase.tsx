import { Card } from '../../../shared/components/Card';

export default function ConfirmDialogBadCase() {
  return (
    <Card title="확인 다이얼로그" eyebrow="UI 상태 표현 / 나쁜 예">
      <p>삭제 버튼이 즉시 실행되면 클릭 실수와 의도 확인을 구분할 수 없습니다.</p>
      <div className="demo-box">
        <strong>2026 Q2 캠페인</strong>
        <p>확인 단계 없이 같은 위치에서 바로 삭제 요청을 보냅니다.</p>
        <button className="button danger small" type="button">
          즉시 삭제
        </button>
      </div>
      <div className="example-surface">
        <div>
          <strong>되묻지 않음</strong>
          <span>대상과 결과를 확인하지 않아 잘못 누른 클릭도 그대로 실행됩니다.</span>
        </div>
        <div>
          <strong>복구 비용</strong>
          <span>삭제 후 되돌리기나 문의 절차가 필요해 사용자의 부담이 커집니다.</span>
        </div>
      </div>
    </Card>
  );
}
