import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

// ❌ 모달마다 isOpen 상태를 따로 선언
export default function UseDisclosureBadCase() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Card title="열림/닫힘 훅" eyebrow="훅과 로직 재사용 / 나쁜 예">
      <p>
        열림/닫힘이 필요한 UI마다 <code>isOpen + setIsOpen</code>을 직접 선언합니다.
        Modal이 3개면 state가 3개, 함수도 3쌍씩 늘어납니다.
        <code>useDisclosure</code>로 인터페이스를 표준화하면 반복을 없앨 수 있습니다.
      </p>
      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
        <button className="button" onClick={() => setIsSettingsOpen(true)}>설정 모달</button>
        <button className="button secondary" onClick={() => setIsHelpOpen(true)}>도움말 모달</button>
        <button className="button secondary" onClick={() => setIsDrawerOpen((v) => !v)}>드로어 {isDrawerOpen ? '닫기' : '열기'}</button>
      </div>

      {isDrawerOpen && (
        <div style={{ marginTop: 12, padding: '12px 16px', background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 8 }}>
          <strong>드로어 내용</strong>
          <button className="button small secondary" style={{ marginLeft: 8 }} onClick={() => setIsDrawerOpen(false)}>닫기</button>
        </div>
      )}

      {isSettingsOpen && (
        <div style={{ marginTop: 12, padding: '12px 16px', background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 8 }}>
          <strong>설정 모달</strong>
          <button className="button small secondary" style={{ marginLeft: 8 }} onClick={() => setIsSettingsOpen(false)}>닫기</button>
        </div>
      )}

      {isHelpOpen && (
        <div style={{ marginTop: 12, padding: '12px 16px', background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 8 }}>
          <strong>도움말 모달</strong>
          <button className="button small secondary" style={{ marginLeft: 8 }} onClick={() => setIsHelpOpen(false)}>닫기</button>
        </div>
      )}

      <p style={{ marginTop: 12, fontSize: 13, color: '#dc2626' }}>
        ⚠ isSettingsOpen, isHelpOpen, isDrawerOpen — 3개의 분리된 state. UI 요소가 늘면 계속 추가됩니다.
      </p>
    </Card>
  );
}
