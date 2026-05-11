import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';

type Participant = {
  id: string;
  name: string;
  role: string;
};

const initialParticipants: Participant[] = [
  { id: 'user-1', name: '김서연', role: 'PM' },
  { id: 'user-2', name: '이도윤', role: 'Frontend' },
  { id: 'user-3', name: '박하린', role: 'Design' },
];

export default function IndexAsKeyExample() {
  const [participants, setParticipants] = useState(initialParticipants);

  function removeFirstParticipant() {
    setParticipants((current) => current.slice(1));
  }

  function resetParticipants() {
    setParticipants(initialParticipants);
  }

  return (
    <Card title="index를 key로 사용" eyebrow="안티패턴 / 좋은 예">
      <p>동적으로 바뀌는 목록은 화면 위치가 아니라 항목의 안정적인 id를 key로 사용합니다.</p>

      <div className="demo-box">
        <div className="demo-label">참가자 메모</div>
        {participants.map((participant) => (
          <div className="list-item" key={participant.id}>
            <div>
              <strong>{participant.name}</strong>
              <span className="badge badge-blue">{participant.role}</span>
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
        첫 항목을 제거해도 각 입력의 DOM state는 같은 참가자 id에 남습니다. 서버 id가 없다면 생성 시점에 uuid를
        만들어 항목 identity를 고정합니다.
      </p>
    </Card>
  );
}
