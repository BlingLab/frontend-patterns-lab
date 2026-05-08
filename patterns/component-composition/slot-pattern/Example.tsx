import { ReactNode } from 'react';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';

type PageHeaderProps = {
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
};

function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <Card title={title} eyebrow="컴포넌트 조합 / 좋은 예">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' }}>
        <div>
          {description ? <div>{description}</div> : null}
        </div>
        {actions ? <div style={{ display: 'flex', gap: 8 }}>{actions}</div> : null}
      </div>
    </Card>
  );
}

function MemberCount({ count }: { count: number }) {
  return <p>활성 멤버 {count}명을 관리하고 있습니다.</p>;
}

export default function SlotPatternExample() {
  return (
    <PageHeader
      title="멤버 관리"
      description={<MemberCount count={24} />}
      actions={
        <>
          <Button>내보내기</Button>
          <Button>초대</Button>
        </>
      }
    />
  );
}
