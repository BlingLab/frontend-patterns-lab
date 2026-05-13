import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

const initialMembers = ['minji@company.com', 'juno@company.com', 'sora@company.com'];

export default function DynamicFieldsBadCase() {
  const [members, setMembers] = useState(initialMembers);

  function addMember() {
    setMembers((current) => [...current, '']);
  }

  function removeMember(indexToRemove: number) {
    setMembers((current) => current.filter((_, index) => index !== indexToRemove));
  }

  return (
    <Card title="동적 필드" eyebrow="폼과 검증 / 나쁜 예">
      <p>index를 key와 삭제 기준으로 쓰면 중간 행 삭제 후 DOM 상태가 다른 데이터에 붙을 수 있습니다.</p>
      <div className="demo-box">
        {members.map((member, index) => (
          <div className="demo-row" key={index}>
            <label className="field" style={{ flex: 1, marginBottom: 0 }}>
              <span>멤버 {index + 1}</span>
              <input defaultValue={member} placeholder="email@company.com" />
            </label>
            <button className="button secondary small" type="button" onClick={() => removeMember(index)}>
              삭제
            </button>
          </div>
        ))}
        <div className="demo-row">
          <button className="button small" type="button" onClick={addMember}>
            멤버 추가
          </button>
          <span className="state-chip">key=index</span>
        </div>
      </div>
      <div className="example-surface">
        <div>
          <strong>재현 방법</strong>
          <span>두 번째 입력값을 수정한 뒤 첫 번째 행을 삭제하면 수정한 DOM 값이 다른 행에 남을 수 있습니다.</span>
        </div>
        <div>
          <strong>문제 지점</strong>
          <span>배열 순서가 바뀌는데 React가 같은 index key를 같은 컴포넌트로 재사용합니다.</span>
        </div>
      </div>
    </Card>
  );
}
