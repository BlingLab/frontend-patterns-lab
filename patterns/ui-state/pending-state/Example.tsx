import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

export default function PendingStateExample() {
  const [pending, setPending] = useState(false);
  const [savedAt, setSavedAt] = useState('아직 저장 전');

  function save() {
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      setSavedAt('방금 저장됨');
    }, 600);
  }

  return (
    <Card title="처리 중 상태" eyebrow="UI 상태 표현 / 좋은 예">
      <p>처리 중인 액션의 피드백을 버튼과 결과 영역에 함께 표시합니다.</p>
      <div className="demo-box" aria-live="polite">
        <div className="demo-row">
          <button className="button small" type="button" disabled={pending} onClick={save}>
            {pending ? '저장 중...' : '변경사항 저장'}
          </button>
          <span className={pending ? 'badge badge-yellow' : 'badge badge-green'}>
            {pending ? '요청 처리 중' : savedAt}
          </span>
        </div>
        <p>중복 제출을 막으면서 현재 작업이 진행 중임을 같은 위치에서 알려줍니다.</p>
      </div>
      <div className="example-surface">
        <div>
          <strong>중복 방지</strong>
          <span>pending 동안 제출 버튼을 잠가 같은 요청이 여러 번 나가지 않게 합니다.</span>
        </div>
        <div>
          <strong>상태 공유</strong>
          <span>버튼 라벨과 상태 배지가 같은 pending 값을 바라봅니다.</span>
        </div>
      </div>
    </Card>
  );
}
