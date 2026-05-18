import { Card } from '../../../shared/components/Card';

export default function QueryHookPatternExample() {
  return (
    <Card title="조회 훅 패턴" eyebrow="비동기와 API 상태 / 좋은 예">
      <p>조회 요청을 전용 훅으로 분리합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>컴포넌트는 "어떻게 가져오는지" 몰라도 된다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>loading/error/data를 훅이 반환한다</span>
        </div>
      </div>
    </Card>
  );
}
