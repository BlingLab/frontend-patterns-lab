import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import type { RequestState } from './requestState';

type Report = {
  title: string;
  updatedAt: string;
};

export default function RequestStatusModelExample() {
  const [state, setState] = useState<RequestState<Report>>({ status: 'idle' });

  function loadReport() {
    setState({ status: 'loading' });
    window.setTimeout(() => {
      setState({ status: 'success', data: { title: '5월 매출 리포트', updatedAt: '2026-05-11 09:30' } });
    }, 500);
  }

  function failReport() {
    setState({ status: 'loading' });
    window.setTimeout(() => {
      setState({ status: 'error', error: new Error('리포트 서버가 응답하지 않습니다.') });
    }, 500);
  }

  return (
    <Card title="요청 상태 모델" eyebrow="비동기와 API 상태 / 좋은 예">
      <p>요청 상태를 하나의 discriminated union으로 모델링해 불가능한 조합을 제거합니다.</p>

      <div className="demo-box">
        <span className="state-chip">status: {state.status}</span>
        {state.status === 'idle' && <p>아직 리포트를 불러오지 않았습니다.</p>}
        {state.status === 'loading' && <p>리포트를 불러오는 중입니다.</p>}
        {state.status === 'success' && (
          <p><strong>{state.data.title}</strong> · 마지막 업데이트 {state.data.updatedAt}</p>
        )}
        {state.status === 'error' && <p className="field-error">{state.error.message}</p>}

        <div className="demo-row">
          <Button onClick={loadReport}>성공 요청</Button>
          <Button className="button secondary" onClick={failReport}>실패 요청</Button>
        </div>
      </div>
    </Card>
  );
}
