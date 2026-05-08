import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

type Item = { id: string; text: string; done: boolean };

export default function ReducerPatternBadCase() {
  const [items, setItems] = useState<Item[]>([
    { id: '1', text: 'API 문서 작성', done: false },
    { id: '2', text: '코드 리뷰 완료', done: true },
  ]);

  // ❌ 이벤트마다 setItems 로직이 흩어진다
  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('task') as HTMLInputElement;
    if (input.value.trim()) {
      setItems((prev) => [...prev, { id: Date.now().toString(), text: input.value.trim(), done: false }]);
      input.value = '';
    }
  }

  function handleToggle(id: string) {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, done: !i.done } : i));
  }

  function handleRemove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function handleClearDone() {
    setItems((prev) => prev.filter((i) => !i.done));
  }

  const doneCount = items.filter((i) => i.done).length;

  return (
    <Card title="reducer 패턴" eyebrow="상태 관리 / 나쁜 예">
      <p>
        add, toggle, remove, clearDone 로직이 <strong>컴포넌트 안에 흩어져</strong> 있습니다.
        상태 전이 규칙이 늘어날수록 어떤 이벤트가 어떤 상태를 만드는지 추적이 어렵습니다.
        reducer로 모으면 순수함수로 테스트할 수 있습니다.
      </p>
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <input name="task" placeholder="새 할 일..." style={{ flex: 1, padding: '8px 10px', border: '1px solid #fca5a5', borderRadius: 6 }} />
        <button type="submit" className="button">추가</button>
      </form>
      <div style={{ marginTop: 12 }}>
        {items.map((item) => (
          <div key={item.id} className="list-item">
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', textDecoration: item.done ? 'line-through' : 'none', color: item.done ? '#9ca3af' : 'inherit' }}>
              <input type="checkbox" checked={item.done} onChange={() => handleToggle(item.id)} />
              {item.text}
            </label>
            <button className="button small danger" onClick={() => handleRemove(item.id)}>삭제</button>
          </div>
        ))}
      </div>
      {doneCount > 0 && (
        <button className="button secondary" style={{ marginTop: 12 }} onClick={handleClearDone}>
          완료 {doneCount}개 삭제
        </button>
      )}
      <p style={{ marginTop: 12, fontSize: 13, color: '#dc2626' }}>
        ⚠ handleAdd, handleToggle, handleRemove, handleClearDone — 4개 함수가 컴포넌트 안에 흩어져 있습니다.
      </p>
    </Card>
  );
}
