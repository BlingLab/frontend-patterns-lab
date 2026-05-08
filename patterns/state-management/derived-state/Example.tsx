import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

type Item = { id: string; name: string; price: number; qty: number };

export default function DerivedStateExample() {
  const [items, setItems] = useState<Item[]>([
    { id: '1', name: '키보드', price: 89000, qty: 1 },
    { id: '2', name: '마우스', price: 45000, qty: 2 },
    { id: '3', name: '모니터', price: 350000, qty: 1 },
  ]);

  // ✅ 파생값 — 저장하지 않고 렌더 중에 계산
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  function changeQty(id: string, delta: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item,
      ).filter((item) => item.qty > 0),
    );
  }

  return (
    <Card title="파생 상태" eyebrow="상태 관리 / 좋은 예">
      <p>
        합계(<code>total</code>)와 수량(<code>itemCount</code>)은
        <strong> items에서 계산</strong>됩니다. state로 저장하지 않으므로
        동기화 effect가 전혀 필요 없습니다.
      </p>
      <div style={{ marginTop: 16 }}>
        {items.map((item) => (
          <div key={item.id} className="list-item">
            <span>{item.name} — {item.price.toLocaleString()}원</span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button className="button small" onClick={() => changeQty(item.id, -1)}>-</button>
              <strong>{item.qty}</strong>
              <button className="button small" onClick={() => changeQty(item.id, 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: '12px 16px', background: '#f0fff4', border: '1px solid #bbf7d0', borderRadius: 8 }}>
        <span className="compare-label good">파생값 (계산됨)</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <span>총 수량: <strong>{itemCount}개</strong></span>
          <span>합계: <strong>{total.toLocaleString()}원</strong></span>
        </div>
      </div>
    </Card>
  );
}
