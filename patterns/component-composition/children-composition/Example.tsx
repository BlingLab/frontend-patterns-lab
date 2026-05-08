import { ReactNode } from 'react';
import { Card } from '../../../shared/components/Card';

type DashboardSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function DashboardSection({ title, description, children }: DashboardSectionProps) {
  return (
    <Card title={title} eyebrow="컴포넌트 조합 / 좋은 예">
      <p>{description}</p>
      <div className="example-surface">{children}</div>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  );
}

function NoticeList({ notices }: { notices: string[] }) {
  return (
    <div>
      <strong>이번 주 알림</strong>
      <span>{notices.join(' / ')}</span>
    </div>
  );
}

export default function ChildrenCompositionExample() {
  return (
    <DashboardSection
      title="운영 현황"
      description="section은 공통 껍데기만 담당하고, 내부 콘텐츠는 호출부가 children으로 조합합니다."
    >
      <Metric label="활성 사용자" value="12,430명" />
      <Metric label="전환율" value="8.4%" />
      <NoticeList notices={['배포 완료', '결제 오류 2건 확인']} />
    </DashboardSection>
  );
}
