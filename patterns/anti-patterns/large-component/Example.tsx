import { Card } from '../../../shared/components/Card';

export default function LargeComponentExample() {
  return (
    <Card title="거대한 컴포넌트" eyebrow="안티패턴 / 문제 예">
      <p>하나의 컴포넌트가 데이터, 상태, 표현을 모두 떠안습니다.</p>
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
