import { Card } from '../../../shared/components/Card';

export default function UnnecessaryGlobalStateBadCase() {
  return (
    <Card title="불필요한 전역 상태" eyebrow="안티패턴 / 나쁜 예">
      <p>지역 상태로 충분한 값을 전역 store에 올립니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>전역 store에 올리기 전에 "다른 화면에서도 쓰나?"를 묻는다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>모달 open 여부, 입력 폼 값처럼 한 화면에서만 쓰이는 상태를 Zustand store에 넣으면, store가 비대해지고 컴포넌트 간 의존성이 늘어납니다.</span>
        </div>
      </div>
    </Card>
  );
}
