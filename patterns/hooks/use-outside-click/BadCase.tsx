import { useState, useRef, useEffect } from 'react';
import { Card } from '../../../shared/components/Card';

// ❌ 이벤트 리스너를 컴포넌트에 직접 작성 + 버그 포함
export default function UseOutsideClickBadCase() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ❌ 버그 1: open이 deps에 없어 stale closure 가능
    // ❌ 버그 2: mousedown 대신 click을 쓰면 버블링 순서 문제가 생길 수 있음
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    // ❌ 버그 3: deps 배열 없음 → 렌더마다 구독 중복
    return () => document.removeEventListener('click', handleClick);
  });

  return (
    <Card title="바깥 클릭 감지 훅" eyebrow="훅과 로직 재사용 / 나쁜 예">
      <p>
        바깥 클릭 감지 로직을 <strong>컴포넌트 안에 직접</strong> 작성했습니다.
        deps 배열 누락으로 렌더마다 구독이 반복되고, 다른 드롭다운에서 재사용하려면 코드를 복사해야 합니다.
      </p>
      <div style={{ marginTop: 16, position: 'relative', display: 'inline-block' }}>
        <button className="button" style={{ borderColor: '#fca5a5' }} onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}>
          메뉴 {open ? '▲' : '▼'}
        </button>
        {open && (
          <div ref={ref} style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: 'white', border: '1px solid #fca5a5', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minWidth: 160, zIndex: 10 }}>
            {['프로필', '설정', '로그아웃'].map((item) => (
              <button key={item} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', border: 0, background: 'transparent', cursor: 'pointer' }}
                onClick={() => setOpen(false)}>
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
      <p style={{ marginTop: 16, fontSize: 13, color: '#dc2626' }}>
        ⚠ deps 배열이 없어 렌더마다 이벤트 리스너가 추가/제거됩니다. useOutsideClick 훅으로 추출하면 이 문제들이 해결됩니다.
      </p>
    </Card>
  );
}
