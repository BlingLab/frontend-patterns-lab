import { Card } from '../../../shared/components/Card';

export default function ComponentSplittingBadCase() {
  return (
    <Card title="컴포넌트 분리" eyebrow="렌더링 성능 / 나쁜 예">
      <p>변경 빈도가 다른 영역을 컴포넌트로 분리합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>변경 빈도가 다른 UI를 별도 컴포넌트로 추출한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>타이머처럼 자주 바뀌는 부분과 정적인 콘텐츠가 같은 컴포넌트에 있으면, 타이머가 바뀔 때마다 정적 콘텐츠도 리렌더됩니다.</span>
        </div>
      </div>
    </Card>
  );
}
