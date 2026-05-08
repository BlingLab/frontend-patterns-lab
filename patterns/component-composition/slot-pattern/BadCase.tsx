import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';

type PageHeaderProps = {
  title: string;
  memberCount: number;
  showExport?: boolean;
  showInvite?: boolean;
};

function PageHeader({ title, memberCount, showExport, showInvite }: PageHeaderProps) {
  return (
    <Card title={title} eyebrow="Slot Pattern / Bad Case">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' }}>
        <p>활성 멤버 {memberCount}명을 관리하고 있습니다.</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {showExport ? <Button>내보내기</Button> : null}
          {showInvite ? <Button>초대</Button> : null}
        </div>
      </div>
    </Card>
  );
}

export default function SlotPatternBadCase() {
  return <PageHeader title="멤버 관리" memberCount={24} showExport showInvite />;
}
