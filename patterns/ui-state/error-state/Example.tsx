import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

export default function ErrorStateExample() {
  const [status, setStatus] = useState<'error' | 'retrying' | 'recovered'>('error');

  function retry() {
    setStatus('retrying');
    window.setTimeout(() => setStatus('recovered'), 500);
  }

  return (
    <Card title="에러 상태" eyebrow="UI 상태 표현 / 좋은 예">
      <p>오류 원인, 영향 범위, 복구 액션을 같은 영역에서 보여줍니다.</p>
      <div className="demo-box" role={status === 'error' ? 'alert' : 'status'} aria-live="polite">
        {status === 'error' && (
          <>
            <strong>청구서 목록을 불러오지 못했습니다.</strong>
            <p>네트워크 상태를 확인한 뒤 다시 시도해 주세요. 이미 불러온 요약 정보는 유지됩니다.</p>
            <button className="button small" type="button" onClick={retry}>
              다시 시도
            </button>
          </>
        )}
        {status === 'retrying' && <p>다시 불러오는 중입니다...</p>}
        {status === 'recovered' && (
          <>
            <strong>복구되었습니다.</strong>
            <p>청구서 3건을 다시 불러왔습니다.</p>
          </>
        )}
      </div>
      <div className="example-surface">
        <div>
          <strong>복구 경로</strong>
          <span>사용자가 할 수 있는 retry 액션과 pending 상태를 함께 제공합니다.</span>
        </div>
        <div>
          <strong>영향 범위</strong>
          <span>전체 앱이 아니라 실패한 목록 영역만 에러 상태로 바꿉니다.</span>
        </div>
      </div>
    </Card>
  );
}
