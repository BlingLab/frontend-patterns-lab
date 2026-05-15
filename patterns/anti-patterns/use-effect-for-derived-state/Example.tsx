import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

const initialProducts = [
  { id: 'p1', name: '키보드', stock: 4 },
  { id: 'p2', name: '마우스', stock: 0 },
  { id: 'p3', name: '모니터', stock: 2 },
];

export default function UseEffectForDerivedStateExample() {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState('');
  const [availableOnly, setAvailableOnly] = useState(true);

  const visibleProducts = products.filter((product) => {
    const matchesQuery = product.name.includes(query);
    const matchesStock = !availableOnly || product.stock > 0;
    return matchesQuery && matchesStock;
  });

  function restockMouse() {
    setProducts((current) =>
      current.map((product) => (product.id === 'p2' ? { ...product, stock: product.stock + 1 } : product)),
    );
  }

  return (
    <Card title="파생 상태를 effect로 만들기" eyebrow="안티패턴 / 좋은 예">
      <p>필터 결과는 원본 목록, 검색어, 재고 조건에서 렌더 중 바로 계산합니다.</p>
      <div className="demo-box">
        <div className="demo-row">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="상품 검색" />
          <button className="button small secondary" type="button" onClick={() => setAvailableOnly((value) => !value)}>
            {availableOnly ? '품절 포함' : '재고만 보기'}
          </button>
          <button className="button small" type="button" onClick={restockMouse}>
            마우스 입고
          </button>
        </div>
        <div className="demo-label">결과 {visibleProducts.length}개</div>
        {visibleProducts.map((product) => (
          <div className="list-item" key={product.id}>
            <span>{product.name}</span>
            <span className={product.stock > 0 ? 'badge badge-green' : 'badge badge-gray'}>재고 {product.stock}</span>
          </div>
        ))}
      </div>
      <div className="example-surface">
        <div>
          <strong>단일 출처</strong>
          <span>저장되는 값은 원본 목록과 사용자 조건뿐입니다.</span>
        </div>
        <div>
          <strong>동기 계산</strong>
          <span>재고나 필터 조건이 바뀌면 추가 effect 없이 같은 렌더에서 결과가 맞춰집니다.</span>
        </div>
      </div>
    </Card>
  );
}
