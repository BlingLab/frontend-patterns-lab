import { Card } from '../../../shared/components/Card';

export default function FormLevelValidationBadCase() {
  return (
    <Card title="폼 단위 검증" eyebrow="폼과 검증 / 나쁜 예">
      <p>여러 필드 간 규칙을 폼 단위에서 검증합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>교차 필드 규칙(비밀번호 일치, 날짜 범위)을 처리한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>"비밀번호 확인"처럼 두 필드를 비교하는 규칙은 필드 레벨에서 처리하기 어렵습니다.</span>
        </div>
      </div>
    </Card>
  );
}
