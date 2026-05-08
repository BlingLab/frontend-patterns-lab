import { useState, useEffect } from 'react';
import { Card } from '../../../shared/components/Card';

// React 외부 스토어 (Concurrent Mode에서 tearing 위험)
type Theme = 'light' | 'dark' | 'system';
let externalTheme: Theme = 'light';

function setExternalTheme(theme: Theme) {
  externalTheme = theme;
  window.dispatchEvent(new Event('themechange'));
}

// ❌ useEffect + useState로 외부 store 구독 — Concurrent Mode에서 불안전
function useThemeBad() {
  const [theme, setTheme] = useState<Theme>(externalTheme);

  useEffect(() => {
    function handler() { setTheme(externalTheme); }
    window.addEventListener('themechange', handler);
    return () => window.removeEventListener('themechange', handler);
  }, []);

  return theme;
}

function ThemeDisplayBad() {
  const theme = useThemeBad();
  return (
    <div style={{ padding: '12px 16px', background: theme === 'dark' ? '#1f2937' : '#ffffff', color: theme === 'dark' ? '#f9fafb' : '#1f2933', borderRadius: 8, border: '1px solid #fca5a5', transition: 'all 0.2s' }}>
      현재 테마: <strong>{theme}</strong> (useEffect 구독)
    </div>
  );
}

export default function ExternalStoreBadCase() {
  return (
    <Card title="외부 store 연결" eyebrow="상태 관리 / 나쁜 예">
      <p>
        <code>useEffect + useState</code>로 외부 store를 구독합니다.
        이벤트 핸들러가 실행되기 전 렌더 사이에 <strong>값이 찢어질(tearing) 위험</strong>이 있습니다.
        <code>useSyncExternalStore</code>가 이 문제를 해결합니다.
      </p>
      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {(['light', 'dark', 'system'] as Theme[]).map((t) => (
            <button key={t} className="button secondary" style={{ padding: '6px 12px', borderColor: '#fca5a5' }} onClick={() => setExternalTheme(t)}>{t}</button>
          ))}
        </div>
        <ThemeDisplayBad />
      </div>
      <p style={{ marginTop: 12, fontSize: 13, color: '#dc2626' }}>
        ⚠ useEffect는 렌더 완료 후 실행되므로 Concurrent 렌더 중 store가 바뀌면 일시적으로 불일치 상태가 됩니다.
      </p>
    </Card>
  );
}
