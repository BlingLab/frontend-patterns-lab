import { Card } from '../../../shared/components/Card';

export default function UnstableCallbacksExample() {
  return (
    <Card title="불안정한 콜백" eyebrow="안티패턴 / 문제 예">
      <p>불안정한 콜백이 하위 컴포넌트 렌더를 유발합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>memo된 자식에 넘기는 함수는 useCallback으로 감싼다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>함수가 매 렌더마다 새로 만들어지면 === 비교에서 false다</span>
        </div>
      </div>
    </Card>
  );
}
