import { Card } from '../../../shared/components/Card';

export default function UsememoUsecallbackBadCase() {
  return (
    <Card title="useMemo/useCallback 기준" eyebrow="렌더링 성능 / 나쁜 예">
      <p>값과 콜백 안정성이 실제로 필요한 지점에만 memoization을 적용합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>useCallback: memo된 자식에 넘기는 함수나 useEffect deps</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>useMemo와 useCallback은 비용을 줄이는 것처럼 보이지만 캐시 관리와 deps 비교 비용이 있습니다.</span>
        </div>
      </div>
    </Card>
  );
}
