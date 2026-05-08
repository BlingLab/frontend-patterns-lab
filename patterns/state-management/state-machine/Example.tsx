import { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { delay } from '../../../shared/utils/delay';

type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

export default function StateMachineExample() {
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handlePay() {
    if (status !== 'idle' && status !== 'error') return; // 허용된 전이만
    setStatus('processing');
    setErrorMsg('');

    try {
      await delay(1200);
      if (Math.random() < 0.3) throw new Error('카드 한도 초과');
      setStatus('success');
    } catch (e) {
      setErrorMsg((e as Error).message);
      setStatus('error');
    }
  }

  function handleReset() {
    setStatus('idle');
    setErrorMsg('');
  }

  const statusConfig: Record<PaymentStatus, { label: string; color: string; bg: string }> = {
    idle:       { label: '결제 대기', color: '#374151', bg: '#f3f4f6' },
    processing: { label: '결제 처리 중...', color: '#1d4ed8', bg: '#dbeafe' },
    success:    { label: '결제 완료 ✓', color: '#065f46', bg: '#d1fae5' },
    error:      { label: '결제 실패 ✗', color: '#991b1b', bg: '#fee2e2' },
  };

  const cfg = statusConfig[status];

  return (
    <Card title="상태 머신" eyebrow="상태 관리 / 좋은 예">
      <p>
        결제 흐름은 <code>idle → processing → success/error</code> 경로만 허용됩니다.
        <strong> 불가능한 상태 조합</strong>(processing + success 동시)이 타입 수준에서 차단됩니다.
      </p>
      <div style={{ marginTop: 16, padding: 20, background: cfg.bg, borderRadius: 8, textAlign: 'center', transition: 'all 0.3s' }}>
        <div className="state-chip" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}40`, marginBottom: 16, fontSize: 14 }}>
          현재 상태: {status}
        </div>
        <p style={{ fontSize: 18, fontWeight: 700, color: cfg.color, margin: '0 0 16px' }}>{cfg.label}</p>
        {errorMsg && <p style={{ fontSize: 13, color: '#dc2626', marginBottom: 12 }}>{errorMsg}</p>}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {(status === 'idle' || status === 'error') && (
            <button className="button" onClick={handlePay}>
              {status === 'error' ? '다시 시도' : '결제하기 (99,000원)'}
            </button>
          )}
          {status === 'processing' && (
            <button className="button" disabled>처리 중...</button>
          )}
          {(status === 'success' || status === 'error') && (
            <button className="button secondary" onClick={handleReset}>처음으로</button>
          )}
        </div>
      </div>

      <div style={{ marginTop: 16, fontSize: 13, color: '#6b7280' }}>
        <strong>허용된 전이:</strong> idle→processing, processing→success, processing→error, error→processing
        <br /><em>30% 확률로 실패를 시뮬레이션합니다.</em>
      </div>
    </Card>
  );
}
