import { Card } from '../../../shared/components/Card';

export default function MixedServerClientStateImprovedCase() {
  return (
    <Card title="서버/클라이언트 상태 혼합" eyebrow="안티패턴 / 개선 예">
      <p>서버 상태와 클라이언트 상태의 소유권을 섞습니다.</p>
      <div className="example-surface">
        <div>
          <strong>개선 방향</strong>
          <span>서버 상태와 클라이언트 UI 상태의 소유권을 섞는 문제를 피합니다.</span>
        </div>
        <div>
          <strong>유지 기준</strong>
          <span>UI 상태(선택, 열림/닫힘)는 local state나 store에서 별도로 관리한다</span>
        </div>
      </div>
    </Card>
  );
}
