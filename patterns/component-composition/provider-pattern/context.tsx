import { ReactNode, createContext, useContext } from 'react';

type WorkspaceContextValue = {
  workspaceName: string;
  role: 'owner' | 'member';
  canInvite: boolean;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  return (
    <WorkspaceContext.Provider value={{ workspaceName: 'Frontend Lab', role: 'owner', canInvite: true }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const value = useContext(WorkspaceContext);
  if (!value) {
    throw new Error('useWorkspace must be used inside WorkspaceProvider');
  }
  return value;
}
