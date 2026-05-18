import { Card } from '../../../shared/components/Card';

export default function UncontrolledFormBadCase() {
  return (
    <Card title="비제어 폼" eyebrow="폼과 검증 / 나쁜 예">
      <p>DOM의 입력 값을 필요 시점에 읽습니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>ref.current.value로 제출 시점에만 값을 읽는다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>단순한 로그인 폼처럼 제출 시점에만 값이 필요하고 중간에 값을 읽을 필요가 없다면, 불필요한 리렌더를 피하기 위해 uncontrolled form이 더 적합합니다.</span>
        </div>
      </div>
    </Card>
  );
}
