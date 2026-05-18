import { Card } from '../../../shared/components/Card';

export default function DisabledStateBadCase() {
  return (
    <Card title="비활성 상태" eyebrow="UI 상태 표현 / 나쁜 예">
      <p>버튼만 흐리게 만들면 조건 부족, 권한 없음, 처리 중을 구분할 수 없습니다.</p>
      <div className="demo-box">
        <button className="button danger small" type="button" disabled>
          선택 항목 삭제
        </button>
      </div>
      <div className="example-surface">
        <div>
          <strong>이유 없음</strong>
          <span>사용자는 무엇을 선택하거나 고쳐야 활성화되는지 알 수 없습니다.</span>
        </div>
        <div>
          <strong>접근성 누락</strong>
          <span>도움말 id나 aria-describedby 연결이 없어 보조 기술에도 이유가 전달되지 않습니다.</span>
        </div>
      </div>
    </Card>
  );
}
