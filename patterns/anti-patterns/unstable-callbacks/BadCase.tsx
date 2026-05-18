import { Card } from '../../../shared/components/Card';

export default function UnstableCallbacksBadCase() {
  return (
    <Card title="불안정한 콜백" eyebrow="안티패턴 / 나쁜 예">
      <p>불안정한 콜백이 하위 컴포넌트 렌더를 유발합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>memo된 자식에 넘기는 함수는 useCallback으로 감싼다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>memo된 자식에 매 렌더마다 새로 만들어진 함수를 prop으로 내리면 memo가 의미없어집니다.</span>
        </div>
      </div>
    </Card>
  );
}
