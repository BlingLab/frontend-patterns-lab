import { Card } from '../../../shared/components/Card';

export default function ApiResponseLeakingToUiImprovedCase() {
  return (
    <Card title="API 응답 UI 누수" eyebrow="안티패턴 / 개선 예">
      <p>서버 응답 구조가 UI 컴포넌트까지 새어 나옵니다.</p>
      <div className="example-surface">
        <div>
          <strong>개선 방향</strong>
          <span>서버 응답 구조가 UI 컴포넌트까지 새는 문제를 피합니다.</span>
        </div>
        <div>
          <strong>유지 기준</strong>
          <span>adapter/transform 함수로 서버 타입을 UI 타입으로 변환한다</span>
        </div>
      </div>
    </Card>
  );
}
