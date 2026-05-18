import { Card } from '../../../shared/components/Card';

export default function LargeComponentExample() {
  return (
    <Card title="거대한 컴포넌트" eyebrow="안티패턴 / 문제 예">
      <p>하나의 컴포넌트가 데이터, 상태, 표현을 모두 떠안습니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>단일 책임: 한 컴포넌트는 한 가지 이유로만 바뀌어야 한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>데이터 로딩과 렌더링을 분리하면 재사용이 쉬워진다</span>
        </div>
      </div>
    </Card>
  );
}
