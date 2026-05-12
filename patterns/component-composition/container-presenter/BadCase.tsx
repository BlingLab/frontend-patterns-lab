import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

const members = [
  { id: 'u1', name: '김하나', role: 'owner', lastSeenDaysAgo: 0, projects: 8 },
  { id: 'u2', name: '이도윤', role: 'member', lastSeenDaysAgo: 3, projects: 5 },
  { id: 'u3', name: '박서준', role: 'guest', lastSeenDaysAgo: 14, projects: 1 },
];

export default function ContainerPresenterBadCase() {
  const [selectedMemberId, setSelectedMemberId] = useState(members[0].id);
  const selectedMember = members.find((member) => member.id === selectedMemberId);

  return (
    <Card title="컨테이너/프리젠터" eyebrow="컴포넌트 조합 / 나쁜 예">
      <p>데이터 가공, 이벤트 처리, 화면 표현이 한 컴포넌트에 섞여 있습니다.</p>

      <div className="demo-box">
        <div className="demo-label">선택된 멤버: {selectedMember?.name ?? '없음'}</div>
        <div className="example-surface">
          {members.map((member) => {
            const inactive = member.lastSeenDaysAgo > 7;
            const roleLabel = member.role === 'owner' ? '관리자' : member.role === 'guest' ? '게스트' : '멤버';
            const activityLabel = member.lastSeenDaysAgo === 0 ? '오늘 접속' : `${member.lastSeenDaysAgo}일 전 접속`;
            const badgeClassName = inactive ? 'badge-red' : member.role === 'owner' ? 'badge-blue' : 'badge-green';
            const isSelected = member.id === selectedMemberId;

            return (
              <div key={member.id}>
                <strong>{member.name}</strong>
                <span>
                  {roleLabel} / {activityLabel} / {member.projects}개 프로젝트
                </span>
                <div className="demo-row">
                  <span className={`badge ${badgeClassName}`}>{isSelected ? '선택됨' : roleLabel}</span>
                  <button className="button small" onClick={() => setSelectedMemberId(member.id)}>
                    선택
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-12">
        API 응답 가공, 선택 상태, badge 정책, JSX가 한 파일에 있어 서버 필드나 표시 정책이 바뀔 때 화면 컴포넌트 전체를
        다시 읽어야 합니다.
      </p>
    </Card>
  );
}
