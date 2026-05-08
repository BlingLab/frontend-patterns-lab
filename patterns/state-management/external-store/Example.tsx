import { useSyncExternalStore } from 'react';
import { Card } from '../../../shared/components/Card';

// React 외부 스토어 (Zustand 같은 라이브러리가 이 방식으로 동작)
type Theme = 'light' | 'dark' | 'system';
let themeStore = { theme: 'light' as Theme };
const listeners = new Set<() => void>();

function setTheme(theme: Theme) {
  themeStore = { theme };
  listeners.forEach((l) => l());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return themeStore.theme;
}

// React 컴포넌트에서 외부 store를 안전하게 구독
function useTheme() {
  return useSyncExternalStore(subscribe, getSnapshot);
}

function ThemeDisplay() {
  const theme = useTheme();
  return (
    <div style={{ padding: '12px 16px', background: theme === 'dark' ? '#1f2937' : theme === 'system' ? '#f3f4f6' : '#ffffff', color: theme === 'dark' ? '#f9fafb' : '#1f2933', borderRadius: 8, border: '1px solid #e5e7eb', transition: 'all 0.2s' }}>
      현재 테마: <strong>{theme}</strong>
    </div>
  );
}

function ThemeCounter() {
  const theme = useTheme();
  return <span className={`badge ${theme === 'dark' ? 'badge-blue' : 'badge-gray'}`}>{theme}</span>;
}

export default function ExternalStoreExample() {
  return (
    <Card title="외부 store 연결" eyebrow="상태 관리 / 좋은 예">
      <p>
        React 외부의 theme store를 <code>useSyncExternalStore</code>로 연결합니다.
        Concurrent Mode에서도 tearing 없이 안전하게 동작합니다.
        두 컴포넌트가 동일한 외부 스토어를 구독합니다.
      </p>
      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {(['light', 'dark', 'system'] as Theme[]).map((t) => (
            <button key={t} className="button secondary" style={{ padding: '6px 12px' }} onClick={() => setTheme(t)}>{t}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
          <strong>ThemeCounter:</strong> <ThemeCounter />
        </div>
        <ThemeDisplay />
      </div>
      <p style={{ marginTop: 12, fontSize: 13, color: '#6b7280' }}>
        버튼을 클릭하면 외부 store가 바뀌고 두 컴포넌트가 동시에 업데이트됩니다.
      </p>
    </Card>
  );
}
