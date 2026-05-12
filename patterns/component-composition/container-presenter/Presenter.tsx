export type MemberViewModel = {
  id: string;
  name: string;
  roleLabel: string;
  activityLabel: string;
  projectLabel: string;
  statusTone: 'blue' | 'green' | 'red';
  isSelected: boolean;
};

const badgeClassName: Record<MemberViewModel['statusTone'], string> = {
  blue: 'badge-blue',
  green: 'badge-green',
  red: 'badge-red',
};

export default function Presenter({
  members,
  selectedMemberName,
  onSelectMember,
}: {
  members: MemberViewModel[];
  selectedMemberName: string;
  onSelectMember: (memberId: string) => void;
}) {
  return (
    <div className="demo-box">
      <div className="demo-label">선택된 멤버: {selectedMemberName}</div>
      <div className="example-surface">
        {members.map((member) => (
          <div key={member.id}>
            <strong>{member.name}</strong>
            <span>
              {member.roleLabel} / {member.activityLabel} / {member.projectLabel}
            </span>
            <div className="demo-row">
              <span className={`badge ${badgeClassName[member.statusTone]}`}>
                {member.isSelected ? '선택됨' : member.roleLabel}
              </span>
              <button className="button small" onClick={() => onSelectMember(member.id)}>
                선택
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
