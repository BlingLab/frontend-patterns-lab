import { Card } from '../../../shared/components/Card';

type DashboardCardProps =
  | {
      variant: 'metric';
      title: string;
      label: string;
      value: string;
    }
  | {
      variant: 'notice';
      title: string;
      notices: string[];
    };

function DashboardCard(props: DashboardCardProps) {
  return (
    <Card title={props.title} eyebrow="Children Composition / Bad Case">
      <p>카드가 공통 껍데기뿐 아니라 카드 안의 도메인 콘텐츠까지 직접 알고 있습니다.</p>
      <div className="example-surface">
        {props.variant === 'metric' ? (
          <div>
            <strong>{props.label}</strong>
            <span>{props.value}</span>
          </div>
        ) : (
          <div>
            <strong>이번 주 알림</strong>
            <span>{props.notices.join(' / ')}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

export default function ChildrenCompositionBadCase() {
  return (
    <DashboardCard
      variant="metric"
      title="운영 현황"
      label="활성 사용자"
      value="12,430명"
    />
  );
}
