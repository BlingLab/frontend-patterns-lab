import { Card } from '../../../shared/components/Card';

const members = [
  { id: 'u1', name: '김하나', role: 'owner', lastSeenDaysAgo: 0 },
  { id: 'u2', name: '이도윤', role: 'member', lastSeenDaysAgo: 3 },
];

export default function ContainerPresenterBadCase() {
  return (
    <Card title="Container Presenter" eyebrow="컴포넌트 조합 / Bad Case">
      <p>데이터 가공, 이벤트 처리, 화면 표현이 한 컴포넌트에 섞여 있습니다.</p>
      <div className="example-surface">
        {members.map((member) => (
          <div key={member.id}>
            <strong>{member.name}</strong>
            <span>
              {member.role === 'owner' ? '관리자' : '멤버'} /{' '}
              {member.lastSeenDaysAgo === 0 ? '오늘 접속' : `${member.lastSeenDaysAgo}일 전 접속`}
            </span>
            <button className="button" onClick={() => console.log(`select member: ${member.id}`)}>
              선택
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
