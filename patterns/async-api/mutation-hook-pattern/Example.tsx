import { Card } from '../../../shared/components/Card';

export default function MutationHookPatternExample() {
  return (
    <Card title="mutation 훅 패턴" eyebrow="비동기와 API 상태 / 좋은 예">
      <p>쓰기 요청을 명령형 mutation 훅으로 제공합니다.</p>
      <div className="example-surface">
        <div>
          <strong>상황</strong>
          <span>요구사항이 커질 때 책임 경계를 명확히 해야 합니다.</span>
        </div>
        <div>
          <strong>판단</strong>
          <span>변경 이유, 재사용 범위, 테스트 단위를 기준으로 적용합니다.</span>
        </div>
      </div>
    </Card>
  );
}
