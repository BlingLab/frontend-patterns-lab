import { Card } from '../../../shared/components/Card';

export default function MutationHookPatternBadCase() {
  return (
    <Card title="mutation 훅 패턴" eyebrow="비동기와 API 상태 / 나쁜 예">
      <p>쓰기 요청을 명령형 mutation 훅으로 제공합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>mutate() 함수를 컴포넌트에 제공한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>폼 제출 핸들러에 fetch 로직, 에러 처리, 상태 업데이트가 모두 들어 있으면 컴포넌트가 비대해지고 재사용이 어렵습니다.</span>
        </div>
      </div>
    </Card>
  );
}
