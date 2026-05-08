import { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { delay } from '../../../shared/utils/delay';

export default function StateMachineBadCase() {
  // ❌ 여러 boolean이 동시에 true가 되는 불가능한 상태 조합 가능
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handlePay() {
    setIsLoading(true);
    setIsError(false);
    // 버그: isSuccess를 false로 초기화 안 함 → 이전 성공이 남아 있을 수 있음

    try {
      await delay(1200);
      if (Math.random() < 0.3) throw new Error('카드 한도 초과');
      setIsSuccess(true);
    } catch (e) {
      setIsError(true);
      setErrorMsg((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
    setErrorMsg('');
  }

  // isLoading && isSuccess가 동시에 true가 될 수 있는 코드
  const impossible = isLoading && isSuccess;

  return (
    <Card title="상태 머신" eyebrow="상태 관리 / 나쁜 예">
      <p>
        <code>isLoading</code>, <code>isSuccess</code>, <code>isError</code> 3개 boolean이 각각 존재합니다.
        이론적으로 <strong>모두 동시에 true</strong>가 되는 불가능한 상태가 생길 수 있습니다.
      </p>
      <div style={{ marginTop: 16, padding: '12px 16px', background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 8, fontSize: 13, fontFamily: 'monospace' }}>
        isLoading: <strong style={{ color: isLoading ? '#dc2626' : '#6b7280' }}>{String(isLoading)}</strong>{'  '}
        isSuccess: <strong style={{ color: isSuccess ? '#16a34a' : '#6b7280' }}>{String(isSuccess)}</strong>{'  '}
        isError: <strong style={{ color: isError ? '#dc2626' : '#6b7280' }}>{String(isError)}</strong>
        {impossible && <span style={{ color: '#dc2626', marginLeft: 8 }}>⚠ 불가능한 상태!</span>}
      </div>
      {errorMsg && <p style={{ fontSize: 13, color: '#dc2626', marginTop: 8 }}>{errorMsg}</p>}
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        {!isLoading && !isSuccess && (
          <button className="button" onClick={handlePay}>{isError ? '다시 시도' : '결제하기'}</button>
        )}
        {isLoading && <button className="button" disabled>처리 중...</button>}
        {(isSuccess || isError) && <button className="button secondary" onClick={handleReset}>처음으로</button>}
      </div>
      {isSuccess && <p style={{ color: '#16a34a', marginTop: 8 }}>결제 완료!</p>}
      <p style={{ marginTop: 12, fontSize: 13, color: '#dc2626' }}>
        ⚠ 3개 boolean의 조합으로 8가지 상태가 생기지만, 실제로 유효한 상태는 4개뿐입니다.
      </p>
    </Card>
  );
}
