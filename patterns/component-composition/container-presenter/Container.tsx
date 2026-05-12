import { useMemo, useState } from 'react';
import Presenter, { MemberViewModel } from './Presenter';

const members = [
  { id: 'u1', name: '김하나', role: 'owner', lastSeenDaysAgo: 0, projects: 8 },
  { id: 'u2', name: '이도윤', role: 'member', lastSeenDaysAgo: 3, projects: 5 },
  { id: 'u3', name: '박서준', role: 'guest', lastSeenDaysAgo: 14, projects: 1 },
];

function toViewModel(member: (typeof members)[number], selectedMemberId: string): MemberViewModel {
  const inactive = member.lastSeenDaysAgo > 7;

  return {
    id: member.id,
    name: member.name,
    roleLabel: member.role === 'owner' ? '관리자' : member.role === 'guest' ? '게스트' : '멤버',
    activityLabel: member.lastSeenDaysAgo === 0 ? '오늘 접속' : `${member.lastSeenDaysAgo}일 전 접속`,
    projectLabel: `${member.projects}개 프로젝트`,
    statusTone: inactive ? 'red' : member.role === 'owner' ? 'blue' : 'green',
    isSelected: member.id === selectedMemberId,
  };
}

export default function Container() {
  const [selectedMemberId, setSelectedMemberId] = useState(members[0].id);
  const viewModels = useMemo(
    () => members.map((member) => toViewModel(member, selectedMemberId)),
    [selectedMemberId],
  );

  return (
    <Presenter
      members={viewModels}
      selectedMemberName={viewModels.find((member) => member.isSelected)?.name ?? '없음'}
      onSelectMember={setSelectedMemberId}
    />
  );
}
