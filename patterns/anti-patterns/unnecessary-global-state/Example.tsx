import { Card } from '../../../shared/components/Card';

export default function UnnecessaryGlobalStateExample() {
  return (
    <Card title="불필요한 전역 상태" eyebrow="안티패턴 / 문제 예">
      <p>지역 상태로 충분한 값을 전역 store에 올립니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>전역 store에 올리기 전에 "다른 화면에서도 쓰나?"를 묻는다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>지역 상태는 컴포넌트가 unmount되면 자동으로 정리된다</span>
        </div>
      </div>
    </Card>
  );
}
