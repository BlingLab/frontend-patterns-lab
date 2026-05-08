export type MemberViewModel = {
  id: string;
  name: string;
  roleLabel: string;
  activityLabel: string;
};

export default function Presenter({
  members,
  onSelectMember,
}: {
  members: MemberViewModel[];
  onSelectMember: (memberId: string) => void;
}) {
  return (
    <div className="example-surface">
      {members.map((member) => (
        <div key={member.id}>
          <strong>{member.name}</strong>
          <span>
            {member.roleLabel} / {member.activityLabel}
          </span>
          <button className="button" onClick={() => onSelectMember(member.id)}>
            선택
          </button>
        </div>
      ))}
    </div>
  );
}
