import { Card } from '../../../shared/components/Card';

export default function InlineObjectPropsExample() {
  return (
    <Card title="인라인 객체 props" eyebrow="안티패턴 / 문제 예">
      <p>매 렌더마다 새 객체 prop을 내려 memoization을 깨뜨립니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>인라인 객체 {}와 배열 []은 매 렌더마다 새 참조다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>memo 밖에 상수로 꺼내거나 useMemo로 캐시한다</span>
        </div>
      </div>
    </Card>
  );
}
