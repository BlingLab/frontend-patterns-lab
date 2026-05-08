import { Card } from '../../../shared/components/Card';

export default function ErrorBoundaryExample() {
  return (
    <Card title="에러 경계" eyebrow="비동기와 API 상태 / 좋은 예">
      <p>렌더링 실패를 화면 경계에서 복구합니다.</p>
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
