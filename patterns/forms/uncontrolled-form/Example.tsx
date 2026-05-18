import { Card } from '../../../shared/components/Card';

export default function UncontrolledFormExample() {
  return (
    <Card title="비제어 폼" eyebrow="폼과 검증 / 좋은 예">
      <p>DOM의 입력 값을 필요 시점에 읽습니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>ref.current.value로 제출 시점에만 값을 읽는다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>타이핑 중에 리렌더가 발생하지 않는다</span>
        </div>
      </div>
    </Card>
  );
}
