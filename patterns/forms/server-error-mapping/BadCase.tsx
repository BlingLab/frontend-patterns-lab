import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';

export default function ServerErrorMappingBadCase() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function submit() {
    setToastMessage('입력값을 다시 확인해 주세요.');
  }

  function clear() {
    setToastMessage(null);
  }

  return (
    <Card title="서버 오류 매핑" eyebrow="폼과 검증 / 나쁜 예">
      <p>서버 오류를 한 문장 toast로만 처리하면 사용자는 어떤 필드를 고쳐야 하는지 알 수 없습니다.</p>

      <div className="demo-box">
        {toastMessage ? <p className="field-error">{toastMessage}</p> : null}

        <div className="field">
          <label htmlFor="bad-email">이메일</label>
          <input id="bad-email" defaultValue="seoyeon@example.com" />
        </div>

        <div className="field">
          <label htmlFor="bad-teamName">팀 이름</label>
          <input id="bad-teamName" defaultValue="A" />
        </div>

        <div className="demo-row">
          <Button onClick={submit}>서버 오류 표시</Button>
          <Button className="button secondary" onClick={clear}>초기화</Button>
        </div>
      </div>

      <p className="mt-12">
        이메일 중복과 팀 이름 길이 오류가 각각 어디에 연결되는지 사라졌습니다. 복구 위치가 명확한 오류는 필드
        가까이에 보여줘야 합니다.
      </p>
    </Card>
  );
}
