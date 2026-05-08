import { Card } from '../../../shared/components/Card';
import { PolymorphicButton } from './PolymorphicButton';

export default function PolymorphicComponentExample() {
  return (
    <Card title="Polymorphic Component" eyebrow="컴포넌트 조합 / Example">
      <p>같은 버튼 스타일을 유지하되, 액션은 button으로 이동은 anchor로 렌더링합니다.</p>
      <div className="example-surface">
        <div>
          <strong>Action</strong>
          <PolymorphicButton onClick={() => window.alert('저장했습니다.')}>저장</PolymorphicButton>
        </div>
        <div>
          <strong>Navigation</strong>
          <PolymorphicButton as="a" href="/settings">
            설정으로 이동
          </PolymorphicButton>
        </div>
      </div>
    </Card>
  );
}
