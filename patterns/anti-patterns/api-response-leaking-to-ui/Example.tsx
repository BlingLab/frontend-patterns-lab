import { Card } from '../../../shared/components/Card';

export default function ApiResponseLeakingToUiExample() {
  return (
    <Card title="API 응답 UI 누수" eyebrow="안티패턴 / 문제 예">
      <p>서버 응답 구조가 UI 컴포넌트까지 새어 나옵니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>서버 타입을 직접 컴포넌트 props에 쓰지 않는다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>adapter/transform 함수로 서버 타입을 UI 타입으로 변환한다</span>
        </div>
      </div>
    </Card>
  );
}
