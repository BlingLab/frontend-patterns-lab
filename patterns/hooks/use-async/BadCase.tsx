import { Card } from '../../../shared/components/Card';

export default function UseAsyncBadCase() {
  return (
    <Card title="비동기 상태 훅" eyebrow="훅과 로직 재사용 / 나쁜 예">
      <p>비동기 요청 상태를 loading/error/data로 모델링합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>idle → loading → success/error 상태 머신을 내장한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>컴포넌트마다 isLoading, error, data를 따로 선언하면 같은 패턴이 반복되고 각 경우 처리를 빠뜨리기 쉽습니다.</span>
        </div>
      </div>
    </Card>
  );
}
