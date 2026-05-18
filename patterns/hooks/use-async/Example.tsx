import { Card } from '../../../shared/components/Card';

export default function UseAsyncExample() {
  return (
    <Card title="비동기 상태 훅" eyebrow="훅과 로직 재사용 / 좋은 예">
      <p>비동기 요청 상태를 loading/error/data로 모델링합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>idle → loading → success/error 상태 머신을 내장한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>언마운트 후 setState를 막아 경고를 방지한다</span>
        </div>
      </div>
    </Card>
  );
}
