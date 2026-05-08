import { Card } from '../../../shared/components/Card';

export default function DuplicatedLoadingStateImprovedCase() {
  return (
    <Card title="중복 로딩 상태" eyebrow="안티패턴 / 개선 예">
      <p>같은 요청 상태를 여러 불리언으로 중복 관리합니다.</p>
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
