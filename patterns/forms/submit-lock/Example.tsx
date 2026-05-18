import { Card } from '../../../shared/components/Card';

export default function SubmitLockExample() {
  return (
    <Card title="제출 잠금" eyebrow="폼과 검증 / 좋은 예">
      <p>중복 제출을 막고 제출 중 상태를 표현합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>제출 시작 시 isSubmitting=true, 완료/실패 시 false로 되돌린다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>버튼을 disabled 처리하고 loading 표시를 보여준다</span>
        </div>
      </div>
    </Card>
  );
}
