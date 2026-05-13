import { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { createFieldItem } from './fieldArray';
import type { FieldItem } from './fieldArray';

const initialMembers = [
  createFieldItem('minji@company.com'),
  createFieldItem('juno@company.com'),
  createFieldItem('sora@company.com'),
];

export default function DynamicFieldsExample() {
  const [members, setMembers] = useState<FieldItem[]>(initialMembers);

  function updateMember(id: string, label: string) {
    setMembers((current) => current.map((member) => (member.id === id ? { ...member, label } : member)));
  }

  function addMember() {
    setMembers((current) => [...current, createFieldItem('')]);
  }

  function removeMember(id: string) {
    setMembers((current) => current.filter((member) => member.id !== id));
  }

  return (
    <Card title="동적 필드" eyebrow="폼과 검증 / 좋은 예">
      <p>각 행이 안정적인 id를 갖고, 값 변경과 삭제도 id 기준으로 처리합니다.</p>
      <div className="demo-box">
        {members.map((member, index) => (
          <div className="demo-row" key={member.id}>
            <label className="field" style={{ flex: 1, marginBottom: 0 }}>
              <span>멤버 {index + 1}</span>
              <input
                value={member.label}
                onChange={(event) => updateMember(member.id, event.target.value)}
                placeholder="email@company.com"
              />
            </label>
            <button className="button secondary small" type="button" onClick={() => removeMember(member.id)}>
              삭제
            </button>
          </div>
        ))}
        <div className="demo-row">
          <button className="button small" type="button" onClick={addMember}>
            멤버 추가
          </button>
          <span className="state-chip">{members.length}명</span>
        </div>
      </div>
      <div className="example-surface">
        <div>
          <strong>안정적인 key</strong>
          <span>삭제 후에도 각 입력값은 같은 id를 가진 행에 남습니다.</span>
        </div>
        <div>
          <strong>오류 매핑 기준</strong>
          <span>서버 오류도 index가 아니라 id 또는 field path로 되돌릴 수 있습니다.</span>
        </div>
      </div>
    </Card>
  );
}
