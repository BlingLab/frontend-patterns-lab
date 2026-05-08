import { useReducer } from 'react';
import { Card } from '../../../shared/components/Card';

type Item = { id: string; text: string; done: boolean };
type Action =
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: string }
  | { type: 'remove'; id: string }
  | { type: 'clear_done' };

function reducer(items: Item[], action: Action): Item[] {
  switch (action.type) {
    case 'add':
      return [...items, { id: crypto.randomUUID(), text: action.text, done: false }];
    case 'toggle':
      return items.map((i) => i.id === action.id ? { ...i, done: !i.done } : i);
    case 'remove':
      return items.filter((i) => i.id !== action.id);
    case 'clear_done':
      return items.filter((i) => !i.done);
  }
}

export default function ReducerPatternExample() {
  const [items, dispatch] = useReducer(reducer, [
    { id: '1', text: 'API 문서 작성', done: false },
    { id: '2', text: '코드 리뷰 완료', done: true },
  ]);

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('task') as HTMLInputElement;
    if (input.value.trim()) {
      dispatch({ type: 'add', text: input.value.trim() });
      input.value = '';
    }
  }

  const doneCount = items.filter((i) => i.done).length;

  return (
    <Card title="reducer 패턴" eyebrow="상태 관리 / 좋은 예">
      <p>
        add, toggle, remove, clear_done — 4가지 이벤트가 <strong>reducer 한 곳</strong>에서 처리됩니다.
        컴포넌트는 dispatch만 호출하고 상태 전이 로직은 모릅니다.
      </p>
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <input name="task" placeholder="새 할 일..." style={{ flex: 1, padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 6 }} />
        <button type="submit" className="button">추가</button>
      </form>
      <div style={{ marginTop: 12 }}>
        {items.map((item) => (
          <div key={item.id} className="list-item">
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', textDecoration: item.done ? 'line-through' : 'none', color: item.done ? '#9ca3af' : 'inherit' }}>
              <input type="checkbox" checked={item.done} onChange={() => dispatch({ type: 'toggle', id: item.id })} />
              {item.text}
            </label>
            <button className="button small danger" onClick={() => dispatch({ type: 'remove', id: item.id })}>삭제</button>
          </div>
        ))}
      </div>
      {doneCount > 0 && (
        <button className="button secondary" style={{ marginTop: 12 }} onClick={() => dispatch({ type: 'clear_done' })}>
          완료 항목 {doneCount}개 삭제
        </button>
      )}
    </Card>
  );
}
