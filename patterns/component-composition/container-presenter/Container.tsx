import Presenter, { MemberViewModel } from './Presenter';

const members = [
  { id: 'u1', name: '김하나', role: 'owner', lastSeenDaysAgo: 0 },
  { id: 'u2', name: '이도윤', role: 'member', lastSeenDaysAgo: 3 },
];

function toViewModel(member: (typeof members)[number]): MemberViewModel {
  return {
    id: member.id,
    name: member.name,
    roleLabel: member.role === 'owner' ? '관리자' : '멤버',
    activityLabel: member.lastSeenDaysAgo === 0 ? '오늘 접속' : `${member.lastSeenDaysAgo}일 전 접속`,
  };
}

export default function Container() {
  return (
    <Presenter
      members={members.map(toViewModel)}
      onSelectMember={(memberId) => console.log(`select member: ${memberId}`)}
    />
  );
}
