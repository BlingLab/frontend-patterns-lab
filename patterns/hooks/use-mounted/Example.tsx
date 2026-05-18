import { Card } from '../../../shared/components/Card';

export default function UseMountedExample() {
  return (
    <Card title="마운트 여부 훅" eyebrow="훅과 로직 재사용 / 좋은 예">
      <p>컴포넌트 마운트 여부를 비동기 흐름에서 확인합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>useRef로 마운트 여부를 추적한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>비동기 콜백 실행 전 isMounted()를 확인한다</span>
        </div>
      </div>
    </Card>
  );
}
