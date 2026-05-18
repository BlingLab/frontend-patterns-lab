import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

export default function ToastVsInlineErrorBadCase() {
  const [toast, setToast] = useState('');

  return (
    <Card title="토스트 vs 인라인 오류" eyebrow="UI 상태 표현 / 나쁜 예">
      <p>필드 오류까지 toast로 보내면 사용자가 수정 위치를 찾기 어렵습니다.</p>
      <div className="demo-box">
        <label className="field">
          <span>이메일</span>
          <input placeholder="user@company.com" />
        </label>
        <button
          className="button small"
          type="button"
          onClick={() => setToast('이메일 형식이 올바르지 않습니다.')}
        >
          저장
        </button>
        {toast ? <p role="alert" className="badge badge-red">{toast}</p> : null}
      </div>
      <div className="example-surface">
        <div>
          <strong>맥락 이탈</strong>
          <span>오류 메시지가 입력 필드와 떨어져 수정 대상을 다시 찾아야 합니다.</span>
        </div>
        <div>
          <strong>사라질 위험</strong>
          <span>toast가 사라지면 어떤 값을 고쳐야 하는지도 함께 사라집니다.</span>
        </div>
      </div>
    </Card>
  );
}
