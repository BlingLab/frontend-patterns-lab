import { Card } from '../../../shared/components/Card';

export default function InlineObjectPropsImprovedCase() {
  return (
    <Card title="인라인 객체 props" eyebrow="안티패턴 / 개선 예">
      <p>매 렌더마다 새 객체 prop을 내려 memoization을 깨뜨립니다.</p>
      <div className="example-surface">
        <div>
          <strong>개선 방향</strong>
          <span>매 렌더마다 새 객체 prop을 내려 memoization을 깨는 문제를 피합니다.</span>
        </div>
        <div>
          <strong>유지 기준</strong>
          <span>memo 밖에 상수로 꺼내거나 useMemo로 캐시한다</span>
        </div>
      </div>
    </Card>
  );
}
