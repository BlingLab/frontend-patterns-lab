import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

function ToggleSummary() {
  const [on, setOn] = useState(false);

  return (
    <div>
      <strong>상태 표시</strong>
      <span>{on ? '기능이 활성화되어 있습니다.' : '기능이 비활성화되어 있습니다.'}</span>
      <button className="button" onClick={() => setOn((value) => !value)}>
        변경
      </button>
    </div>
  );
}

function ToggleAction() {
  const [on, setOn] = useState(false);

  return (
    <div>
      <strong>액션</strong>
      <button className="button" onClick={() => setOn((value) => !value)}>
        {on ? '끄기' : '켜기'}
      </button>
    </div>
  );
}

export default function RenderPropsBadCase() {
  return (
    <Card title="Render Props" eyebrow="컴포넌트 조합 / Bad Case">
      <p>서로 다른 UI가 같은 토글 로직을 각자 복사하고, 상태도 서로 독립적으로 어긋납니다.</p>
      <div className="example-surface">
        <ToggleSummary />
        <ToggleAction />
      </div>
    </Card>
  );
}
