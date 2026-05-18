import { Card } from '../../../shared/components/Card';

export default function UseEventListenerExample() {
  return (
    <Card title="이벤트 구독 훅" eyebrow="훅과 로직 재사용 / 좋은 예">
      <p>이벤트 구독과 정리를 훅 경계 안에 둡니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>effect 안에서 add/remove를 한 쌍으로 처리한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>target이 바뀌면 이전 구독을 자동 해제하고 새로 구독한다</span>
        </div>
      </div>
    </Card>
  );
}
