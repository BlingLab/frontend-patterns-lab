import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];

function ColorPicker({ selected, onChange }: { selected: string; onChange: (c: string) => void }) {
  return (
    <div>
      <p style={{ fontWeight: 600, marginBottom: 8 }}>색상 선택</p>
      <div style={{ display: 'flex', gap: 8 }}>
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            style={{
              width: 32, height: 32, borderRadius: '50%', background: c, border: selected === c ? '3px solid #1f2933' : '2px solid transparent', cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Preview({ color }: { color: string }) {
  return (
    <div style={{ marginTop: 16 }}>
      <p style={{ fontWeight: 600, marginBottom: 8 }}>미리보기</p>
      <div style={{ width: '100%', height: 80, borderRadius: 8, background: color, transition: 'background 0.2s' }} />
      <p style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>선택된 색상: {color}</p>
    </div>
  );
}

export default function LiftingStateUpExample() {
  const [color, setColor] = useState('#3b82f6');

  return (
    <Card title="상태 끌어올리기" eyebrow="상태 관리 / 좋은 예">
      <p>
        ColorPicker와 Preview가 같은 <code>color</code> 값을 필요로 합니다.
        두 컴포넌트의 <strong>공통 부모</strong>가 state를 소유하고 각자에게 내려줍니다.
      </p>
      <ColorPicker selected={color} onChange={setColor} />
      <Preview color={color} />
    </Card>
  );
}
