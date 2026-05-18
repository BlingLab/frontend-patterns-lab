import { Card } from '../../../shared/components/Card';

export default function ApiResponseLeakingToUiBadCase() {
  return (
    <Card title="API 응답 UI 누수" eyebrow="안티패턴 / 나쁜 예">
      <p>서버 응답 구조가 UI 컴포넌트까지 새어 나옵니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>서버 타입을 직접 컴포넌트 props에 쓰지 않는다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>user_name, created_at 같은 서버 snake_case를 컴포넌트 props로 직접 받으면, 서버 API가 바뀔 때 UI 컴포넌트 파일들을 모두 수정해...</span>
        </div>
      </div>
    </Card>
  );
}
