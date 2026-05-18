import { Card } from '../../../shared/components/Card';

export default function LazyLoadingBadCase() {
  return (
    <Card title="지연 로딩" eyebrow="렌더링 성능 / 나쁜 예">
      <p>초기 화면에 필요 없는 코드를 늦게 불러옵니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>React.lazy + Suspense로 컴포넌트 수준에서 분리한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>모달, 관리자 패널, 세부 화면처럼 첫 화면에서 보이지 않는 컴포넌트가 초기 번들에 포함되면 LCP가 늦어집니다.</span>
        </div>
      </div>
    </Card>
  );
}
