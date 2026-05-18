import { Card } from '../../../shared/components/Card';

export default function MixedServerClientStateBadCase() {
  return (
    <Card title="서버/클라이언트 상태 혼합" eyebrow="안티패턴 / 나쁜 예">
      <p>서버 상태와 클라이언트 상태의 소유권을 섞습니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>서버 상태는 TanStack Query, SWR처럼 캐시를 전담하는 도구에 맡긴다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>서버 데이터(users 배열)와 UI 상태(selectedUserId)를 같은 Zustand store에 넣으면, users를 refetch할 때 selectedUs...</span>
        </div>
      </div>
    </Card>
  );
}
