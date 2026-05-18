import { Card } from '../../../shared/components/Card';

export default function MultiStepFormBadCase() {
  return (
    <Card title="단계형 폼" eyebrow="폼과 검증 / 나쁜 예">
      <p>긴 폼을 단계별 상태와 검증으로 나눕니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>현재 step 인덱스로 어떤 화면을 보여줄지 결정한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>회원가입처럼 입력 항목이 많은 폼을 한 페이지에 모으면 사용자가 부담을 느낍니다.</span>
        </div>
      </div>
    </Card>
  );
}
