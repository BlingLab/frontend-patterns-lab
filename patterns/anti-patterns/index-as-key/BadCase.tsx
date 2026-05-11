import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';

const initialParticipants = [
  { name: '김서연', role: 'PM' },
  { name: '이도윤', role: 'Frontend' },
  { name: '박하린', role: 'Design' },
];

export default function IndexAsKeyBadCase() {
  const [participants, setParticipants] = useState(initialParticipants);

  function removeFirstParticipant() {
    setParticipants((current) => current.slice(1));
  }

  function resetParticipants() {
    setParticipants(initialParticipants);
  }

  return (
    <Card title="index를 key로 사용" eyebrow="안티패턴 / 나쁜 예">
      <p>배열 index를 key로 쓰면 삭제, 정렬, 삽입 때 React가 다른 항목의 DOM state를 재사용할 수 있습니다.</p>

      <div className="demo-box">
        <div className="demo-label">참가자 메모</div>
        {participants.map((participant, index) => (
          <div className="list-item" key={index}>
            <div>
              <strong>{participant.name}</strong>
              <span className="badge badge-red">{participant.role}</span>
            </div>
            <input aria-label={`${participant.name} 메모`} defaultValue={`${participant.name} 담당 메모`} />
          </div>
        ))}

        <div className="demo-row">
          <Button onClick={removeFirstParticipant}>첫 참가자 제거</Button>
          <Button className="button secondary" onClick={resetParticipants}>초기화</Button>
        </div>
      </div>

      <p className="mt-12">
        첫 항목을 제거하면 두 번째 참가자가 첫 번째 DOM 자리를 이어받습니다. 입력값, focus, animation state가
        항목이 아니라 위치에 붙는 것이 문제입니다.
      </p>
    </Card>
  );
}
