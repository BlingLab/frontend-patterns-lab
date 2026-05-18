import { Card } from '../../../shared/components/Card';

export default function QueryCommandHookExample() {
  return (
    <Card title="조회/명령 훅 분리" eyebrow="훅과 로직 재사용 / 좋은 예">
      <p>조회 훅과 명령 훅을 분리합니다.</p>
      <div className="example-surface">
        <div>
          <strong>적용 기준</strong>
          <span>useUsers()는 조회만, useDeleteUser()는 명령만 담당한다</span>
        </div>
        <div>
          <strong>구성 방식</strong>
          <span>읽기 전용 컴포넌트에 mutation 훅을 넣지 않아도 된다</span>
        </div>
      </div>
    </Card>
  );
}
