import { Card } from '../../../shared/components/Card';

export default function InlineObjectPropsBadCase() {
  return (
    <Card title="인라인 객체 props" eyebrow="안티패턴 / 나쁜 예">
      <p>매 렌더마다 새 객체 prop을 내려 memoization을 깨뜨립니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>인라인 객체 {}와 배열 []은 매 렌더마다 새 참조다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>{'<Child style={{ color: "red" }} />'}는 매 렌더마다 새 객체가 만들어집니다.</span>
        </div>
      </div>
    </Card>
  );
}
