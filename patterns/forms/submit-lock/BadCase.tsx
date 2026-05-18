import { Card } from '../../../shared/components/Card';

export default function SubmitLockBadCase() {
  return (
    <Card title="제출 잠금" eyebrow="폼과 검증 / 나쁜 예">
      <p>중복 제출을 막고 제출 중 상태를 표현합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>제출 시작 시 isSubmitting=true, 완료/실패 시 false로 되돌린다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>결제 버튼을 빠르게 두 번 누르면 중복 결제가 발생할 수 있습니다.</span>
        </div>
      </div>
    </Card>
  );
}
