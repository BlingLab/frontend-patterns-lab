import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

// ✅ 공통 인터페이스로 추상화
function useDisclosure(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);
  return {
    isOpen,
    open:   () => setIsOpen(true),
    close:  () => setIsOpen(false),
    toggle: () => setIsOpen((v) => !v),
  };
}

function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
      <div style={{ background: 'white', borderRadius: 10, padding: 24, minWidth: 320 }}>
        <h3 style={{ margin: '0 0 12px' }}>{title}</h3>
        {children}
        <button className="button secondary" style={{ marginTop: 16 }} onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default function UseDisclosureExample() {
  const settingsModal = useDisclosure();
  const helpModal = useDisclosure();
  const drawer = useDisclosure();

  return (
    <Card title="열림/닫힘 훅" eyebrow="훅과 로직 재사용 / 좋은 예">
      <p>
        Modal, Drawer, Dropdown 모두 <code>isOpen, open, close, toggle</code> 인터페이스를 공유합니다.
        각각 <strong>독립적인 useDisclosure 인스턴스</strong>를 가집니다.
      </p>
      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
        <button className="button" onClick={settingsModal.open}>설정 모달</button>
        <button className="button secondary" onClick={helpModal.open}>도움말 모달</button>
        <button className="button secondary" onClick={drawer.toggle}>드로어 {drawer.isOpen ? '닫기' : '열기'}</button>
      </div>

      {drawer.isOpen && (
        <div style={{ marginTop: 12, padding: '12px 16px', background: '#f0f4ff', border: '1px solid #bfdbfe', borderRadius: 8 }}>
          <strong>드로어 내용</strong> — <code>drawer.isOpen: true</code>
          <button className="button small secondary" style={{ marginLeft: 8 }} onClick={drawer.close}>닫기</button>
        </div>
      )}

      <Modal isOpen={settingsModal.isOpen} onClose={settingsModal.close} title="설정">
        <p style={{ fontSize: 14, color: '#374151' }}>알림, 테마, 언어 설정을 변경합니다.</p>
      </Modal>
      <Modal isOpen={helpModal.isOpen} onClose={helpModal.close} title="도움말">
        <p style={{ fontSize: 14, color: '#374151' }}>사용 방법과 FAQ를 확인합니다.</p>
      </Modal>
    </Card>
  );
}
