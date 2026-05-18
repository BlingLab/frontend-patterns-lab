import { Card } from '../../../shared/components/Card';

export default function MixedServerClientStateExample() {
  return (
    <Card title="서버/클라이언트 상태 혼합" eyebrow="안티패턴 / 문제 예">
      <p>서버 상태와 클라이언트 상태의 소유권을 섞습니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>서버 상태는 TanStack Query, SWR처럼 캐시를 전담하는 도구에 맡긴다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>UI 상태(선택, 열림/닫힘)는 local state나 store에서 별도로 관리한다</span>
        </div>
      </div>
    </Card>
  );
}
