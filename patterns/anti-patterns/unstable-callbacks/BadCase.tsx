import { Card } from '../../../shared/components/Card';

export default function UnstableCallbacksBadCase() {
  return (
    <Card title="Unstable Callbacks" eyebrow="Anti Patterns / Bad Case">
      <p>불안정한 콜백이 하위 컴포넌트 렌더를 유발합니다.</p>
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
