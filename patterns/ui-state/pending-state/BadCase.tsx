import { Card } from '../../../shared/components/Card';

export default function PendingStateBadCase() {
  return (
    <Card title="처리 중 상태" eyebrow="UI 상태 표현 / 나쁜 예">
      <p>요청 중에도 버튼과 화면이 그대로면 중복 제출과 불신이 동시에 생깁니다.</p>
      <div className="demo-box">
        <div className="demo-row">
          <button className="button small" type="button">
            변경사항 저장
          </button>
          <span className="badge badge-gray">상태 표시 없음</span>
        </div>
        <p>클릭 후 아무 변화가 없어 사용자가 버튼을 반복해서 누를 수 있습니다.</p>
      </div>
      <div className="example-surface">
        <div>
          <strong>중복 제출</strong>
          <span>요청이 진행 중인지 알 수 없어 같은 액션을 여러 번 실행할 수 있습니다.</span>
        </div>
        <div>
          <strong>피드백 없음</strong>
          <span>버튼, 상태 배지, live region 어디에도 진행 상태가 드러나지 않습니다.</span>
        </div>
      </div>
    </Card>
  );
}
