import { Card } from '../../../shared/components/Card';

export default function MutationHookPatternExample() {
  return (
    <Card title="mutation 훅 패턴" eyebrow="비동기와 API 상태 / 좋은 예">
      <p>쓰기 요청을 명령형 mutation 훅으로 제공합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>mutate() 함수를 컴포넌트에 제공한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>isPending, isError, isSuccess 상태를 반환한다</span>
        </div>
      </div>
    </Card>
  );
}
