import { useEffect, useState } from 'react';
import { Card } from '../../../shared/components/Card';

const initialProducts = [
  { id: 'p1', name: '키보드', stock: 4 },
  { id: 'p2', name: '마우스', stock: 0 },
  { id: 'p3', name: '모니터', stock: 2 },
];

export default function UseEffectForDerivedStateBadCase() {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState('');
  const [availableOnly, setAvailableOnly] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(initialProducts.filter((product) => product.stock > 0));

  useEffect(() => {
    setVisibleProducts(
      products.filter((product) => {
        const matchesQuery = product.name.includes(query);
        const matchesStock = !availableOnly || product.stock > 0;
        return matchesQuery && matchesStock;
      }),
    );
  }, [query]);

  function restockMouse() {
    setProducts((current) =>
      current.map((product) => (product.id === 'p2' ? { ...product, stock: product.stock + 1 } : product)),
    );
  }

  return (
    <Card title="파생 상태를 effect로 만들기" eyebrow="안티패턴 / 나쁜 예">
      <p>필터 결과를 state로 따로 저장하면 원본 목록과 조건을 모두 effect deps에 맞춰야 합니다.</p>
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
        <div className="demo-label">저장된 결과 {visibleProducts.length}개</div>
        {visibleProducts.map((product) => (
          <div className="list-item" key={product.id}>
            <span>{product.name}</span>
            <span className={product.stock > 0 ? 'badge badge-green' : 'badge badge-gray'}>재고 {product.stock}</span>
          </div>
        ))}
      </div>
      <div className="example-surface">
        <div>
          <strong>재현 방법</strong>
          <span>품절 포함이나 마우스 입고를 눌러도 검색어를 바꾸기 전까지 저장된 결과가 갱신되지 않습니다.</span>
        </div>
        <div>
          <strong>문제 지점</strong>
          <span>계산 가능한 결과를 별도 state로 두면서 deps 누락과 한 렌더 늦은 동기화가 생깁니다.</span>
        </div>
      </div>
    </Card>
  );
}
