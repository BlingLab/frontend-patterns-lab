import { Card } from '../../../shared/components/Card';

export default function LazyLoadingExample() {
  return (
    <Card title="지연 로딩" eyebrow="렌더링 성능 / 좋은 예">
      <p>초기 화면에 필요 없는 코드를 늦게 불러옵니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>React.lazy + Suspense로 컴포넌트 수준에서 분리한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>라우트 단위로 적용하면 효과가 크다</span>
        </div>
      </div>
    </Card>
  );
}
