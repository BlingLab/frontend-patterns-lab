import { Card } from '../../../shared/components/Card';
import { WorkspaceProvider, useWorkspace } from './context';

function WorkspaceSummary() {
  const workspace = useWorkspace();

  return (
    <div>
      <strong>{workspace.workspaceName}</strong>
      <span>역할: {workspace.role}</span>
    </div>
  );
}

function InviteAction() {
  const workspace = useWorkspace();

  return (
    <div>
      <strong>초대 권한</strong>
      <span>{workspace.canInvite ? '멤버 초대 가능' : '초대 권한 없음'}</span>
    </div>
  );
}

export default function ProviderPatternExample() {
  return (
    <WorkspaceProvider>
      <Card title="Provider Pattern" eyebrow="컴포넌트 조합 / Example">
        <p>Provider가 workspace 관심사를 공급하고 필요한 하위 컴포넌트만 값을 읽습니다.</p>
        <div className="example-surface">
          <WorkspaceSummary />
          <InviteAction />
        </div>
      </Card>
    </WorkspaceProvider>
  );
}
