import { Card } from '../../../shared/components/Card';

type NoticeProps = {
  isSuccess?: boolean;
  isWarning?: boolean;
  isDanger?: boolean;
  title: string;
  children: string;
};

function Notice({ isSuccess, isWarning, isDanger, title, children }: NoticeProps) {
  const tone = isDanger ? 'danger' : isWarning ? 'warning' : isSuccess ? 'success' : 'info';
  const className = isDanger ? 'badge-red' : isWarning ? 'badge-yellow' : isSuccess ? 'badge-green' : 'badge-blue';

  return (
    <div className="list-item">
      <div>
        <strong>{title}</strong>
        <span>{children}</span>
      </div>
      <span className={`badge ${className}`}>{tone}</span>
    </div>
  );
}

export default function BooleanPropsExplosionBadCase() {
  return (
    <Card title="boolean props 폭발" eyebrow="안티패턴 / 나쁜 예">
      <p>상태를 boolean 여러 개로 나누면 의미 없는 조합이 열리고 우선순위 규칙이 컴포넌트 안에 숨어버립니다.</p>

      <div className="demo-box">
        <Notice isSuccess title="초대 완료">정상 케이스처럼 보입니다.</Notice>
        <Notice isWarning isDanger title="검토 필요 + 실패">두 상태가 동시에 켜져 danger가 warning을 덮습니다.</Notice>
        <Notice isSuccess isWarning isDanger title="성공 + 경고 + 실패">호출부가 만들 수 없어야 하는 조합입니다.</Notice>
      </div>

      <p className="mt-12">
        boolean이 늘어날수록 `2^n`개의 조합이 생깁니다. 대부분은 제품 요구사항에 없는 상태이고 테스트하기도
        어렵습니다.
      </p>
    </Card>
  );
}
