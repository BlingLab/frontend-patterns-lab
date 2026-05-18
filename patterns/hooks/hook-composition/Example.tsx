import { Card } from '../../../shared/components/Card';

export default function HookCompositionExample() {
  return (
    <Card title="훅 조합" eyebrow="훅과 로직 재사용 / 좋은 예">
      <p>작은 훅을 조합해 더 큰 도메인 훅을 만듭니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>useDebounce + useAsync + useUrlState → useProductSearch</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>각 훅은 단일 책임을 갖고 독립적으로 테스트 가능하다</span>
        </div>
      </div>
    </Card>
  );
}
