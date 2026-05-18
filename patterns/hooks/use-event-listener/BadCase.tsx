import { Card } from '../../../shared/components/Card';

export default function UseEventListenerBadCase() {
  return (
    <Card title="이벤트 구독 훅" eyebrow="훅과 로직 재사용 / 나쁜 예">
      <p>이벤트 구독과 정리를 훅 경계 안에 둡니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>effect 안에서 add/remove를 한 쌍으로 처리한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>useEffect로 addEventListener를 하면 cleanup에서 removeEventListener를 빠뜨리기 쉽습니다.</span>
        </div>
      </div>
    </Card>
  );
}
