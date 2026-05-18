import { Card } from '../../../shared/components/Card';

export default function UseMountedBadCase() {
  return (
    <Card title="마운트 여부 훅" eyebrow="훅과 로직 재사용 / 나쁜 예">
      <p>컴포넌트 마운트 여부를 비동기 흐름에서 확인합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>useRef로 마운트 여부를 추적한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>비동기 요청이 완료됐을 때 컴포넌트가 이미 언마운트됐다면 setState를 해도 아무것도 없고 React 경고가 납니다.</span>
        </div>
      </div>
    </Card>
  );
}
