import { Card } from '../../../shared/components/Card';

export default function QueryCommandHookBadCase() {
  return (
    <Card title="조회/명령 훅 분리" eyebrow="훅과 로직 재사용 / 나쁜 예">
      <p>조회 훅과 명령 훅을 분리합니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>useUsers()는 조회만, useDeleteUser()는 명령만 담당한다</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>읽기(query)와 쓰기(mutation)를 한 훅에 모으면 컴포넌트가 이 훅 하나만 있어도 데이터를 바꿀 권한을 갖습니다.</span>
        </div>
      </div>
    </Card>
  );
}
