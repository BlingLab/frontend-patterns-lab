import { Card } from '../../../shared/components/Card';

type WorkspaceProps = {
  workspaceName: string;
  role: 'owner' | 'member';
  canInvite: boolean;
};

function WorkspacePanel(props: WorkspaceProps) {
  return <WorkspaceContent {...props} />;
}

function WorkspaceContent(props: WorkspaceProps) {
  return (
    <div className="example-surface">
      <div>
        <strong>{props.workspaceName}</strong>
        <span>역할: {props.role}</span>
      </div>
      <div>
        <strong>초대 권한</strong>
        <span>{props.canInvite ? '멤버 초대 가능' : '초대 권한 없음'}</span>
      </div>
    </div>
  );
}

export default function ProviderPatternBadCase() {
  return (
    <Card title="Provider Pattern" eyebrow="컴포넌트 조합 / Bad Case">
      <p>중간 컴포넌트가 쓰지 않는 workspace props를 계속 전달합니다.</p>
      <WorkspacePanel workspaceName="Frontend Lab" role="owner" canInvite />
    </Card>
  );
}
