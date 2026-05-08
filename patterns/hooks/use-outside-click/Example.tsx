import { useState, useRef, useEffect } from 'react';
import { Card } from '../../../shared/components/Card';

function useOutsideClick(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    function listener(e: PointerEvent) {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    }
    document.addEventListener('pointerdown', listener);
    return () => document.removeEventListener('pointerdown', listener);
  }, [ref, handler]);
}

export default function UseOutsideClickExample() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setOpen(false));

  return (
    <Card title="바깥 클릭 감지 훅" eyebrow="훅과 로직 재사용 / 좋은 예">
      <p>
        Dropdown 바깥을 클릭하면 자동으로 닫힙니다.
        <code>useOutsideClick</code>이 이벤트 구독/해제를 관리하므로
        컴포넌트는 <strong>닫힘 동작만 정의</strong>하면 됩니다.
      </p>
      <div style={{ marginTop: 16, position: 'relative', display: 'inline-block' }}>
        <button className="button" onClick={() => setOpen((v) => !v)}>
          메뉴 {open ? '▲' : '▼'}
        </button>
        {open && (
          <div ref={ref} style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: 'white', border: '1px solid #d1d5db', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minWidth: 160, zIndex: 10 }}>
            {['프로필', '설정', '로그아웃'].map((item) => (
              <button key={item} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', border: 0, background: 'transparent', cursor: 'pointer' }}
                onClick={() => setOpen(false)}>
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
      <p style={{ marginTop: 16, fontSize: 13, color: '#6b7280' }}>
        메뉴를 열고 바깥 영역을 클릭해보세요 — 자동으로 닫힙니다.
      </p>
    </Card>
  );
}
