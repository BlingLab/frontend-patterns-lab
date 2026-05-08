import { useState, useEffect } from 'react';
import { Card } from '../../../shared/components/Card';

type Item = { id: string; name: string; price: number; qty: number };

export default function DerivedStateBadCase() {
  const [items, setItems] = useState<Item[]>([
    { id: '1', name: '키보드', price: 89000, qty: 1 },
    { id: '2', name: '마우스', price: 45000, qty: 2 },
    { id: '3', name: '모니터', price: 350000, qty: 1 },
  ]);

  // ❌ 계산 가능한 값을 state로 저장 + effect로 동기화
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setTotal(items.reduce((sum, i) => sum + i.price * i.qty, 0));
    setItemCount(items.reduce((sum, i) => sum + i.qty, 0));
  }, [items]);

  function changeQty(id: string, delta: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item,
      ).filter((item) => item.qty > 0),
    );
  }

  return (
    <Card title="파생 상태" eyebrow="상태 관리 / 나쁜 예">
      <p>
        <code>total</code>과 <code>itemCount</code>를 별도 state로 저장하고
        <strong> useEffect로 동기화</strong>합니다. items가 바뀐 뒤 effect가 실행되기 전까지
        한 프레임 동안 값이 틀립니다. effect가 전혀 필요 없는 계산입니다.
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
      <div style={{ marginTop: 16, padding: '12px 16px', background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 8 }}>
        <span className="compare-label bad">불필요한 state + useEffect</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <span>총 수량: <strong>{itemCount}개</strong></span>
          <span>합계: <strong>{total.toLocaleString()}원</strong></span>
        </div>
      </div>
      <p style={{ marginTop: 12, fontSize: 13, color: '#dc2626' }}>
        ⚠ useEffect로 동기화하면 items 업데이트 직후 한 렌더 동안 total이 stale합니다.
      </p>
    </Card>
  );
}
