import { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { chooseErrorSurface } from './errorPolicy';

export default function ToastVsInlineErrorExample() {
  const [email, setEmail] = useState('');
  const [networkFails, setNetworkFails] = useState(false);
  const [fieldError, setFieldError] = useState('');
  const [toast, setToast] = useState('');

  function submit() {
    setFieldError('');
    setToast('');

    if (!email.includes('@')) {
      if (chooseErrorSurface(true) === 'inline') {
        setFieldError('이메일 형식을 확인해 주세요.');
      }
      return;
    }

    if (networkFails && chooseErrorSurface(false) === 'toast') {
      setToast('서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.');
      return;
    }

    setToast('저장되었습니다.');
  }

  return (
    <Card title="토스트 vs 인라인 오류" eyebrow="UI 상태 표현 / 좋은 예">
      <p>고칠 위치가 있는 오류는 inline으로, 전역 실패는 toast 성격의 알림으로 분리합니다.</p>
      <div className="demo-box">
        <label className="field">
          <span>이메일</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(fieldError)}
            aria-describedby={fieldError ? 'email-error' : undefined}
            placeholder="user@company.com"
          />
          {fieldError ? <span id="email-error" className="field-error">{fieldError}</span> : null}
        </label>
        <label className="demo-row">
          <input
            type="checkbox"
            checked={networkFails}
            onChange={(event) => setNetworkFails(event.target.checked)}
          />
          <span>네트워크 오류 시뮬레이션</span>
        </label>
        <button className="button small" type="button" onClick={submit}>
          저장
        </button>
        {toast ? <p role="status" className="badge badge-blue">{toast}</p> : null}
      </div>
      <div className="example-surface">
        <div>
          <strong>수정 위치</strong>
          <span>필드에서 바로 고칠 수 있는 오류는 입력 근처에 고정합니다.</span>
        </div>
        <div>
          <strong>전역 실패</strong>
          <span>네트워크처럼 특정 필드에 귀속되지 않는 실패만 알림 영역으로 보냅니다.</span>
        </div>
      </div>
    </Card>
  );
}
