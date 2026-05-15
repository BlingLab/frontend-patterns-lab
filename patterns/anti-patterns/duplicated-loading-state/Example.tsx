import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

export default function DuplicatedLoadingStateExample() {
  const [request, setRequest] = useState<RequestState>({ status: 'idle' });

  return (
    <Card title="중복 로딩 상태" eyebrow="안티패턴 / 좋은 예">
      <p>요청 상태를 하나의 union으로 표현하면 화면은 항상 한 상태만 말합니다.</p>
      <div className="demo-box">
        <div className="demo-row">
          <button className="button small secondary" type="button" onClick={() => setRequest({ status: 'idle' })}>
            초기화
          </button>
          <button className="button small secondary" type="button" onClick={() => setRequest({ status: 'loading' })}>
            요청 시작
          </button>
          <button
            className="button small"
            type="button"
            onClick={() => setRequest({ status: 'success', message: '저장이 완료되었습니다.' })}
          >
            성공
          </button>
          <button
            className="button danger small"
            type="button"
            onClick={() => setRequest({ status: 'error', message: '서버 저장에 실패했습니다.' })}
          >
            실패
          </button>
        </div>
        <div className="demo-row">
          <span className="state-chip">status: {request.status}</span>
        </div>
        {request.status === 'idle' && <p>아직 요청하지 않았습니다.</p>}
        {request.status === 'loading' && <p role="status">저장 중입니다...</p>}
        {request.status === 'success' && <p className="badge badge-green">{request.message}</p>}
        {request.status === 'error' && <p role="alert" className="badge badge-red">{request.message}</p>}
      </div>
      <div className="example-surface">
        <div>
          <strong>불가능한 조합 차단</strong>
          <span>loading과 success가 동시에 true인 상태를 만들 수 없습니다.</span>
        </div>
        <div>
          <strong>상태별 데이터</strong>
          <span>성공/실패 메시지는 해당 상태 안에만 존재해 화면 분기가 단순해집니다.</span>
        </div>
      </div>
    </Card>
  );
}
