import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];

// 두 컴포넌트가 각자 독립적인 color state를 갖는다
function ColorPickerBad() {
  const [color, setColor] = useState('#3b82f6');
  return (
    <div>
      <p style={{ fontWeight: 600, marginBottom: 8 }}>색상 선택</p>
      <div style={{ display: 'flex', gap: 8 }}>
        {COLORS.map((c) => (
          <button key={c} onClick={() => setColor(c)} style={{ width: 32, height: 32, borderRadius: '50%', background: c, border: color === c ? '3px solid #1f2933' : '2px solid transparent', cursor: 'pointer' }} />
        ))}
      </div>
    </div>
  );
}

// Preview는 ColorPicker가 선택한 값을 전혀 모른다
function PreviewBad() {
  const [color] = useState('#3b82f6');
  return (
    <div style={{ marginTop: 16 }}>
      <p style={{ fontWeight: 600, marginBottom: 8 }}>미리보기</p>
      <div style={{ width: '100%', height: 80, borderRadius: 8, background: color }} />
      <p style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>항상 초기값 {color} 고정</p>
    </div>
  );
}

export default function LiftingStateUpBadCase() {
  return (
    <Card title="상태 끌어올리기" eyebrow="상태 관리 / 나쁜 예">
      <p>
        ColorPicker와 Preview가 <strong>각자 별도의 color state</strong>를 갖습니다.
        ColorPicker에서 색을 바꿔도 Preview는 업데이트되지 않습니다.
        공유 상태는 공통 부모에 올려야 합니다.
      </p>
      <ColorPickerBad />
      <PreviewBad />
      <p style={{ marginTop: 12, fontSize: 13, color: '#dc2626' }}>
        ⚠ 색상을 클릭해도 미리보기가 바뀌지 않습니다 — 각자 다른 state를 갖고 있기 때문입니다.
      </p>
    </Card>
  );
}
