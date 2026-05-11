import { Card } from '../../../shared/components/Card';

type NoticeTone = 'info' | 'success' | 'warning' | 'danger';

type NoticeProps = {
  tone: NoticeTone;
  title: string;
  children: string;
};

const toneClassName: Record<NoticeTone, string> = {
  info: 'badge-blue',
  success: 'badge-green',
  warning: 'badge-yellow',
  danger: 'badge-red',
};

function Notice({ tone, title, children }: NoticeProps) {
  return (
    <div className="list-item">
      <div>
        <strong>{title}</strong>
        <span>{children}</span>
      </div>
      <span className={`badge ${toneClassName[tone]}`}>{tone}</span>
    </div>
  );
}

export default function BooleanPropsExplosionExample() {
  return (
    <Card title="boolean props 폭발" eyebrow="안티패턴 / 좋은 예">
      <p>서로 배타적인 상태는 여러 boolean이 아니라 하나의 union 값으로 표현합니다.</p>

      <div className="demo-box">
        <Notice tone="success" title="초대 완료">멤버에게 초대 메일을 보냈습니다.</Notice>
        <Notice tone="warning" title="검토 필요">결제 수단 만료일이 7일 남았습니다.</Notice>
        <Notice tone="danger" title="저장 실패">네트워크 오류로 변경사항을 저장하지 못했습니다.</Notice>
      </div>

      <p className="mt-12">
        `tone`은 한 번에 하나의 값만 가질 수 있어서 `success`와 `danger`가 동시에 켜지는 불가능한 조합을 타입
        수준에서 막습니다.
      </p>
    </Card>
  );
}
