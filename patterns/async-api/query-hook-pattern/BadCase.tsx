import { Card } from '../../../shared/components/Card';

export default function QueryHookPatternBadCase() {
  return (
    <Card title="조회 훅 패턴" eyebrow="비동기와 API 상태 / 나쁜 예">
      <p>조회 요청을 전용 훅으로 분리합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>컴포넌트는 "어떻게 가져오는지" 몰라도 된다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>컴포넌트 안에 fetch URL, 파라미터, 에러 처리가 직접 있으면 API가 바뀔 때 모든 컴포넌트를 수정해야 합니다.</span>
        </div>
      </div>
    </Card>
  );
}
