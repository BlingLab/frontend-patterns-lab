import { Card } from '../../../shared/components/Card';

export default function UsememoUsecallbackExample() {
  return (
    <Card title="useMemo/useCallback 기준" eyebrow="렌더링 성능 / 좋은 예">
      <p>값과 콜백 안정성이 실제로 필요한 지점에만 memoization을 적용합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>useCallback: memo된 자식에 넘기는 함수나 useEffect deps</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>useMemo: 렌더마다 새로 계산하기 비싼 값</span>
        </div>
      </div>
    </Card>
  );
}
